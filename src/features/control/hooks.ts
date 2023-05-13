/**
 * @namespace Config
 * @module ConfigHooks
 */
import { STANDARD_CONTRACT } from '@/features/control/lib';
import {
  useSContractApi,
  useSContractRead,
  useSContractReads,
  useSContractWrite,
} from '@/features/network/hooks';
import type { StandardKey, StandardName } from '@/features/network/literals';
import { useMutation } from '@tanstack/react-query';
import { ContractFactory } from 'ethers';
import { useMemo } from 'react';
import { useAccount, useSigner } from 'wagmi';

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

type DeployProps = {
  name: string;
  symbol: string;
  decimals: number;
};

type DeployStandardProps = DeployProps & {
  standard: StandardName;
};

/**
 * Deploy an ERC** standard contract with minting and burning capability
 * @param props
 * @returns
 */
function useDeployStandardContract(props: DeployStandardProps) {
  const { name, symbol, decimals, standard } = props;
  const { data: signer } = useSigner();
  const standardKey = standard && (standard.toUpperCase() as StandardKey);
  return useMutation({
    mutationKey: ['custom', 'ima-deployment', props],
    mutationFn: async () => {
      const { abi, bytecode } = STANDARD_CONTRACT[standardKey];
      if (!abi || !bytecode) {
        return;
      }
      const factory = new ContractFactory(abi, bytecode, signer);
      const contract = await factory.deploy(name, symbol, {
        gasLimit: 1500000,
        gasPrice: 100000,
      });
      await contract.deployed();
      return contract;
    },
  });
}

/**
 * Deploy ERC standard token on SChain with permissioned flow
 * @todo revise with explicit rules
 * @param param0
 */
export function useSTokenDeploy(props: DeployStandardProps) {
  const account = useAccount();
  const deployment = useDeployStandardContract(props);

  const hasParams = !!(props.symbol && props.name && props.decimals);

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
    enabled: !!(account.address && addSelfToWhitelist.isSuccess),
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
        return;
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
