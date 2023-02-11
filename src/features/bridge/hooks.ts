import { TOKEN_STANDARD } from '@/features/network/constants';
import {
  useAbi,
  useExplorer,
  useTypedContract,
} from '@/features/network/hooks';
import { ConnectionStatus } from '@/features/network/types';
import { ethers } from 'ethers';
import {
  useContractRead,
  useContractReads,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi';
import { toSentenceCase } from '../../utils';

type TokenTypeProps<S> = {
  standard: S;
};

const standards = Object.values(TOKEN_STANDARD);

type TokenStandard = Uppercase<(typeof standards)[number]['name']>;

export function useTokenManager<T extends TokenStandard>({
  standard,
}: TokenTypeProps<T>) {
  const id = `TOKEN_MANAGER_${standard}` as const;
  return useTypedContract({ id });
}

export function useTokenManagerLinker() {
  return useTypedContract({
    id: 'TOKEN_MANAGER_LINKER' as const,
  });
}

export function useToggleAutodeploy<T extends TokenStandard>({
  standard,
}: TokenTypeProps<T>) {
  const { address, abi, api, contract } = useTokenManager({
    standard: 'ERC20',
  });

  const { data: isEnabled, refetch } = useContractRead({
    address,
    abi,
    functionName: 'automaticDeploy',
  });

  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName: isEnabled
      ? 'disableAutomaticDeploy'
      : 'enableAutomaticDeploy',
    enabled: isEnabled !== undefined,
    onSuccess: () => refetch(),
  });

  const {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    write: toggle,
  } = useContractWrite(config);

  return {
    isEnabled,
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
  const { address, abi, api } = useTypedContract({
    id: 'TOKEN_MANAGER_LINKER',
  });

  const { chain: originChain, chains } = useNetwork();

  const targetChain = chains.find((chain) => chain.name === chainName);

  const { data, isLoading } = useContractReads({
    enabled: !!(targetChain && originChain),
    contracts: [
      {
        address,
        abi: abi,
        functionName: 'hasSchain',
        args: [targetChain?.name],
      },
      {
        address,
        abi: abi,
        functionName: 'hasSchain',
        args: [originChain?.name],
        chainId: targetChain?.id,
      },
    ],
  });

  const originConnected = data?.[0];
  const targetConnected = data?.[1];

  const { config: connectConfig } = usePrepareContractWrite({
    address,
    abi,
    functionName: 'connectSchain',
    args: [chainName],
    overrides: {
      gasPrice: ethers.BigNumber.from(100000000000),
      gasLimit: ethers.BigNumber.from(8000000),
    },
  });

  const connect = useContractWrite(connectConfig);

  const status: ConnectionStatus = isLoading
    ? 'none'
    : originConnected === true && targetConnected === true
    ? 'full'
    : originConnected === true
    ? 'origin'
    : targetConnected === true
    ? 'target'
    : 'none';

  false &&
    console.log(
      originChain?.name,
      targetChain?.name,
      originConnected,
      targetConnected,
    );

  return {
    connect,
    status,
  };
}

export function useHistory() {
  const abi = useAbi({
    id: 'TOKEN_MANAGER_ERC20',
  });
  const iface = abi && new ethers.utils.Interface(abi);

  const { address, api, contract } = useTypedContract({
    id: 'TOKEN_MANAGER_ERC20',
  });

  const explorerLogs = useExplorer({
    module: 'logs',
    action: 'getLogs',
    args: {
      address,
      fromBlock: '0',
      toBlock: 'latest',
    },
  });

  const events =
    iface &&
    explorerLogs?.data?.result &&
    (explorerLogs?.data?.result as [])
      ?.reverse()
      .map(function (
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
      });

  // console.log(
  //   'use history',
  //   CONTRACT.TOKEN_MANAGER_ERC20.address,
  //   response,
  //   events,
  // );

  return {
    events,
  };
}

export function useTokenMapping({}: {}) {}
