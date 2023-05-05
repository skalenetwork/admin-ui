/**
 * @namespace Config
 * @module ConfigHooks
 */
import ERC20Standard from '@/features/network/abi/erc20-standard.json';
import {
  useSContractApi,
  useSContractRead,
  useSContractReads,
  useSContractRoles,
  useSContractWrite,
} from '@/features/network/hooks';
import { TOKEN_STANDARD } from '@/features/network/literals';
import { useMutation } from '@tanstack/react-query';
import { BigNumber, ContractFactory } from 'ethers';
import { useMemo } from 'react';
import { useAccount, useSigner } from 'wagmi';
const standards = Object.values(TOKEN_STANDARD);
type TokenStandard = Uppercase<(typeof standards)[number]['name']>;

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
  standard: Lowercase<TokenStandard>;
};

const STANDARD_CONTRACT: {
  [key in TokenStandard]: { abi: any; bytecode: string };
} = {
  ERC20: {
    abi: ERC20Standard['abi'],
    bytecode: ERC20Standard['bytecode'],
  },
};

/**
 * Deploy an ERC** standard contract with minting and burning capability
 * @param props
 * @returns
 */
function useDeployStandardContract(props: DeployStandardProps) {
  const { name, symbol, decimals, standard } = props;
  const { data: signer } = useSigner();
  const standardKey = standard && (standard.toUpperCase() as TokenStandard);
  return useMutation({
    mutationKey: ['custom', 'ima-deployment', props],
    mutationFn: async () => {
      const { abi, bytecode } = STANDARD_CONTRACT[standardKey];
      if (!abi || !bytecode) {
        return;
      }
      const factory = new ContractFactory(abi, bytecode, signer);
      const contract = await factory.deploy(
        name,
        symbol,
        BigNumber.from(decimals),
        {
          gasLimit: 1500000,
          gasPrice: 100000,
        },
      );
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

  const isMultisigOwner = useSContractRead('MULTISIG_WALLET', {
    enabled: !!account.address,
    name: 'isOwner',
    args: [account.address],
  });
  const msigReqdConfirms = useSContractRead('MULTISIG_WALLET', {
    name: 'required',
  });

  const roles = useSContractRoles('CONFIG_CONTROLLER', [
    'DEPLOYER_ADMIN_ROLE',
    'DEPLOYER_ROLE',
  ]);
  const {
    data: [deployerAdminRole, deployerRole],
  } = roles;
  const eoaHasDeployerAdminRole = deployerAdminRole.permissions.signer === true;
  const eoaHasDeployerRole = deployerRole.permissions.signer === true;

  const addSelfToWhitelist = useSContractWrite('CONFIG_CONTROLLER', {
    enabled: !!account.address,
    name: 'addToWhitelist',
    args: [account.address],
  });
  const removeSelfFromWhitelist = useSContractWrite('CONFIG_CONTROLLER', {
    enabled: !!account.address,
    name: 'removeFromWhitelist',
    args: [account.address],
  });

  const isLoadingReads = [isMultisigOwner, msigReqdConfirms, roles].some(
    (i) => i.isLoading,
  );

  if (!eoaHasDeployerRole && eoaHasDeployerAdminRole) {
  }

  const sequencedWriters = [
    addSelfToWhitelist,
    {
      ...deployment,
      writeAsync: deployment.mutateAsync && (() => deployment.mutateAsync()),
    },
    removeSelfFromWhitelist,
  ];
  const writeAsync = useMemo(
    () => {
      if (
        isLoadingReads ||
        msigReqdConfirms.data === 1 ||
        sequencedWriters.some((writer) => !writer.writeAsync)
      ) {
        return;
      }
      return async () => {
        for await (const writer of sequencedWriters) {
          await writer.writeAsync?.(true);
        }
      };
    },
    sequencedWriters.map((writer) => writer.writeAsync),
  );

  return {
    isLoading: sequencedWriters.some((w) => w.isLoading),
    isSuccess: sequencedWriters.some((w) => w.isSuccess),
    isError: sequencedWriters.some((w) => w.isError),
    writeAsync,
  };
}
