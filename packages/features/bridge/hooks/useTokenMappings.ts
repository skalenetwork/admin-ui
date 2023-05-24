import { useSContractApi } from '@/features/network/hooks';
import { useQuery } from '@tanstack/react-query';

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
