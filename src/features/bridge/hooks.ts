import {
  useSContractApi,
  useSContractRead,
  useSContractWrite,
} from '@/features/network/hooks';
/**
 * @namespace Bridge
 * @module BridgeHooks
 * @description Hooks for asset bridging, connecting chains, and related configuration
 */

import { ABI } from '@/features/network/abi/abi';
import { CONTRACT } from '@/features/network/contract';
import {
  useExplorer,
  useSContract,
  useSContractReads,
} from '@/features/network/hooks';
import { NETWORK, TOKEN_STANDARD } from '@/features/network/literals';
import { ConnectionStatus } from '@/features/network/types';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useNetwork } from 'wagmi';
import { toSentenceCase } from '../../utils';

type TokenTypeProps<S> = {
  standard: S;
  network: typeof NETWORK.ETHEREUM | typeof NETWORK.SKALE;
};

const standards = Object.values(TOKEN_STANDARD);

type TokenStandard = Uppercase<(typeof standards)[number]['name']>;

export function useTokenManager<T extends TokenStandard>({
  standard,
  network,
}: TokenTypeProps<T>) {
  const prefix = network === NETWORK.SKALE ? 'TOKEN_MANAGER' : 'DEPOSIT_BOX';
  const id = `${prefix}_${standard}` as const;
  return {
    contract: useSContract({ id }),
    api: useSContractApi({ id }),
  };
}

export function useToggleAutodeploy<T extends TokenStandard>({
  standard,
}: TokenTypeProps<T>) {
  const contractId = `TOKEN_MANAGER_${standard}` as 'TOKEN_MANAGER_ERC20';

  const autoDeployRead = useSContractRead(contractId, {
    name: 'automaticDeploy',
  });

  const {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    write: toggle,
  } = useSContractWrite(contractId, {
    enabled: autoDeployRead.isSuccess,
    name: autoDeployRead.data
      ? 'disableAutomaticDeploy'
      : 'enableAutomaticDeploy',
    onSuccess: () => autoDeployRead.refetch(),
  });

  return {
    isEnabled: autoDeployRead.data,
    toggle,
    data,
    isLoading,
    isSuccess,
    isError,
  };
}

/**
 * Manage chain connectivity and statuses
 * @param param0
 */
export function useChainConnect({ chainName }: { chainName: string }) {
  const { chain: originChain, chains } = useNetwork();
  const targetChain = chains.find((chain) => chain.name === chainName);

  const { data, isLoading, isSuccess, isError } = useSContractReads(
    'TOKEN_MANAGER_LINKER',
    {
      enabled: !!(targetChain && originChain && chainName !== 'ethereum'),
      reads: [
        {
          name: 'hasSchain',
          args: [targetChain?.name],
        },
        {
          name: 'hasSchain',
          args: [originChain?.name],
          chainId: targetChain?.id,
        },
      ],
    },
  );
  const originConnected =
    chainName.toLowerCase() === 'ethereum' ? true : data?.[0];
  const targetConnected =
    chainName.toLowerCase() === 'ethereum' ? true : data?.[1];

  const connect = useSContractWrite('TOKEN_MANAGER_LINKER', {
    enabled: !!chainName,
    name: 'connectSchain',
    args: [chainName],
    overrides: {
      gasPrice: 100000,
      gasLimit: 8000000,
    },
  });

  const status: ConnectionStatus =
    originConnected === true && targetConnected === true
      ? 'full'
      : originConnected === true
      ? 'origin'
      : targetConnected === true
      ? 'target'
      : 'none';

  return {
    isLoading,
    isSuccess,
    isError,
    connect,
    status,
  };
}

export function useHistory({
  network = NETWORK.ETHEREUM,
}: {
  network?: typeof NETWORK.ETHEREUM | typeof NETWORK.SKALE;
}) {
  const standards = [
    TOKEN_STANDARD.ERC20,
    TOKEN_STANDARD.ERC721,
    TOKEN_STANDARD.ERC1155,
  ];
  const ifaces = standards.map(
    ({ name }) =>
      new ethers.utils.Interface(ABI[`TOKEN_MANAGER_${name.toUpperCase()}`]),
  );
  const props = standards.map(({ name, label }) => ({
    module: 'logs',
    action: 'getLogs',
    args: {
      address: CONTRACT[`TOKEN_MANAGER_${name.toUpperCase()}`].address,
      fromBlock: '0',
      toBlock: 'latest',
    },
  }));

  const explorerLogs = useExplorer(props);
  const eventTuple = explorerLogs.map((explorerLogs, index) => {
    const iface = ifaces[index];
    return iface && explorerLogs.isSuccess
      ? (explorerLogs?.data?.result as []).map(function (
          log: Omit<ethers.providers.Log, 'blockHash'> & { timeStamp: string },
          index: number,
        ) {
          // filter because rpc fetched logs don't have null members in topic
          log.topics = log.topics.filter((topic) => topic !== null);
          let parsedLog;
          try {
            parsedLog = iface.parseLog(log);
          } catch (e) {
            console.error(index, log, e);
            parsedLog = { name: 'unknown' };
          }
          return {
            timestamp: ethers.BigNumber.from(log.timeStamp).toNumber(),
            name: parsedLog.name,
            label: toSentenceCase(parsedLog.name),
            value: log.data,
            params: parsedLog.args,
          };
        })
      : [];
  });

  const events = [...eventTuple[0], ...eventTuple[1], ...eventTuple[2]].sort(
    (a, b) => b.timestamp - a.timestamp,
  );

  return {
    events,
  };
}

export function useTokenMappings({
  contractId,
  toChainId,
  fromChainName,
}: {
  contractId: `TOKEN_MANAGER_${string}` | `DEPOSIT_BOX_${string}`;
  toChainId: number;
  fromChainName: string;
}) {
  const { api } = useSContractApi({
    enabled: !!toChainId,
    id: contractId as 'TOKEN_MANAGER_ERC20',
    chainId: toChainId,
  });
  return useQuery({
    enabled: !!(api && toChainId && fromChainName),
    queryKey: [
      'custom',
      contractId,
      toChainId,
      'getTokenMappings',
      fromChainName,
    ],
    queryFn: async () => {
      if (!api) return;
      const length = await api.getTokenMappingsLength(fromChainName);
      const mapping = await api.getTokenMappings(fromChainName, 0, length);
      return mapping?.map((address) => ({
        address,
      }));
    },
  });
}
