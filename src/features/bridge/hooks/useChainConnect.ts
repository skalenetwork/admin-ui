import { useSContractReads, useSContractWrite } from '@/features/network/hooks';
import { ConnectionStatus } from '@/features/network/types';
import { useNetwork } from 'wagmi';

/**
 * Manage chain connectivity and statuses
 * @param param0
 */
export function useChainConnect({ chainName }: { chainName: string }) {
  const { chain: originChain, chains } = useNetwork();
  const targetChain = chains.find((chain) => chain.name === chainName);

  const { data, isLoading, isSuccess, isError, refetch } = useSContractReads(
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
    refetch,
  };
}
