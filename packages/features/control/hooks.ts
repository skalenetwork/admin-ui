/**
 * @namespace Config
 * @module ConfigHooks
 */

import { useSContractApi } from '@/features/network/api-hooks';
import {
  useSContractRead,
  useSContractReads,
  useSContractWrite,
} from '@/features/network/hooks';
import { useMemo } from 'react';
import { useAccount, useSigner } from 'wagmi';
import { STANDARD_CONTRACT } from './lib';

export function useConfigController() {
  const {
    connected,
    api: controller,
    signer,
  } = useSContractApi({
    id: 'CONFIG_CONTROLLER',
  });

  const { data, status, refetch } = useSContractReads('CONFIG_CONTROLLER', {
    enabled: !!connected,
    reads: [
      {
        name: 'isMTMEnabled',
      },
      {
        name: 'isFCDEnabled',
      },
    ],
  });

  const flags = (status === 'success' || undefined) &&
    data && {
      mtmEnabled: data[0],
      fcdEnabled: data[1],
    };

  return {
    connected,
    flags,
    controller: (signer || undefined) && controller,
    refetch,
  };
}

/**
 * Use multi-transaction mode status and toggling
 * @returns
 */
export function useMtm() {
  const { flags, connected, refetch } = useConfigController();

  const writer = useSContractWrite('CONFIG_CONTROLLER', {
    enabled: !!connected,
    name: flags?.mtmEnabled ? 'disableMTM' : 'enableMTM',
    onSuccess: () => refetch(),
  });

  return {
    ...writer,
    toggle: writer.write,
    toggleAsync: writer.writeAsync,
    isEnabled: flags?.mtmEnabled,
    refetch,
  };
}

/**
 * Use free contract deployment status and toggling
 * @returns
 */
export function useFcd() {
  const { flags, connected, refetch } = useConfigController();

  const writer = useSContractWrite('CONFIG_CONTROLLER', {
    enabled: !!connected,
    name: flags?.fcdEnabled
      ? 'disableFreeContractDeployment'
      : 'enableFreeContractDeployment',
  });

  return {
    ...writer,
    isEnabled: flags?.fcdEnabled,
    toggle: writer.write,
    toggleAsync: writer.writeAsync,
    refetch,
  };
}

type DeployStandardProps<S extends Exclude<StandardName, 'eth'>> =
  S extends 'erc20'
    ? {
        name: string;
        symbol: string;
        decimals: number;
      }
    : S extends 'erc721'
    ? {
        name: string;
        symbol: string;
      }
    : S extends 'erc1155'
    ? {
        uri: string;
      }
    : never;

/**
 * Deploy an ERC** standard contract with minting and burning capability
 * @param props
 * @returns
 */
function useDeployStandardContract<
  TStandard extends Exclude<StandardName, 'eth'>,
  T extends TStandard,
>(standard: T, props: DeployStandardProps<T>) {
  const { data: signer } = useSigner();
  const standardKey =
    standard && (standard.toUpperCase() as Exclude<StandardKey, 'ETH'>);
  const constructorParams =
    standard === 'erc20'
      ? [props.name, props.symbol, props.decimals]
      : standard === 'erc721'
      ? [props.name, props.symbol]
      : standard === 'erc721_with_metadata'
      ? [props.name, props.symbol, props.uri]
      : standard === 'erc1155'
      ? [props.uri]
      : undefined;

  return {
    constructorParams,
    ...useMutation({
      mutationKey: ['custom', 'ima-deployment', props],
      mutationFn: async () => {
        const { abi, bytecode } = STANDARD_CONTRACT[standardKey];
        if (!abi || !bytecode || !constructorParams) {
          return;
        }
        const factory = new ContractFactory(abi, bytecode, signer);
        const contract = await factory.deploy(...constructorParams, {
          gasPrice: 100000,
        });
        return await contract.deployed();
      },
    }),
  };
}

/**
 * Deploy ERC standard token on SChain with permissioned flow
 * @todo revise with explicit rules
 * @param param0
 */
export function useSTokenDeploy<
  TStandard extends Exclude<StandardName, 'eth'>,
  T extends TStandard,
>(standard: T, props: DeployStandardProps<T>) {
  const account = useAccount();
  const deployment = useDeployStandardContract(standard, props);

  const hasParams = !!deployment.constructorParams?.every(
    (p) => p !== undefined,
  );

  const isMultisigOwner = useSContractRead('MULTISIG_WALLET', {
    enabled: !!account.address,
    name: 'isOwner',
    args: [account.address],
  });
  const msigReqdConfirms = useSContractRead('MULTISIG_WALLET', {
    name: 'required',
    select: (data) => {
      return data.toNumber?.();
    },
  });
  const isEoaWhitelisted = useSContractRead('CONFIG_CONTROLLER', {
    enabled: !!account.address,
    name: 'isAddressWhitelisted',
    args: [account.address],
  });

  const addSelfToWhitelist = useSContractWrite('CONFIG_CONTROLLER', {
    enabled: !!account.address && isEoaWhitelisted.data === false,
    name: 'addToWhitelist',
    args: [account.address],
  });
  const removeSelfFromWhitelist = useSContractWrite('CONFIG_CONTROLLER', {
    enabled: !!(
      account.address &&
      (addSelfToWhitelist.eoa.isSuccess || addSelfToWhitelist.mnm.isSuccess)
    ),
    name: 'removeFromWhitelist',
    args: [account.address],
  });

  const isPreparing: boolean = [
    isMultisigOwner,
    isEoaWhitelisted,
    msigReqdConfirms,
  ].some((one) => one.isLoading);

  // EOA-initiated safest deployment
  // if signer is not whitelisted but can solely self-whitelist: whitelist -> deploy -> unwhitelist

  const shouldWhitelist = !isPreparing && isEoaWhitelisted.data === false;
  const canSelfWhitelist = !!(
    (isMultisigOwner.data && msigReqdConfirms.data === 1) ||
    addSelfToWhitelist.eoa.writeAsync
  );
  const mustWhitelist = shouldWhitelist && canSelfWhitelist;

  const writeAsync = useMemo(() => {
    if (isPreparing || !hasParams || (shouldWhitelist && !canSelfWhitelist)) {
      return;
    }
    return async () => {
      let response;
      if (!mustWhitelist) {
        response = await deployment.mutateAsync();
        return response;
      }
      await addSelfToWhitelist.writeAsync?.(true);
      response = await deployment.mutateAsync().finally(async () => {
        await removeSelfFromWhitelist.writeAsync?.(true);
      });
      return response;
    };
  }, [
    isPreparing,
    shouldWhitelist,
    deployment.mutateAsync,
    addSelfToWhitelist.writeAsync,
    removeSelfFromWhitelist.writeAsync,
  ]);

  return {
    isPreparing,
    isPreWhitelisted: isEoaWhitelisted.data,
    shouldManualDeploy: !shouldWhitelist,
    deploy: writeAsync && {
      ...deployment,
      mutate: undefined,
      mutateAsync: undefined,
      writeAsync,
    },
  };
}
