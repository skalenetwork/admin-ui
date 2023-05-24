import { Token } from '@/features/bridge/types';
import { useQuery } from '@tanstack/react-query';

const COINGECKO_URL = 'https://tokens.coingecko.com/ethereum/all.json';

/**
 * Fetch token details for contracts on ethereum mainnet
 * @param param0
 * @returns
 */
export function useEthereumTokens({
  enabled,
  count = 50,
}: {
  enabled?: boolean;
  count?: number;
}) {
  return useQuery({
    enabled: enabled !== undefined ? enabled : true,
    queryKey: ['custom', 'ethereumTokens', 'name,address', count],
    initialData: () => [],
    queryFn: async () => {
      return fetch(COINGECKO_URL)
        .then((res) => res.json())
        .then((result: { tokens: Token[] }) => {
          return result.tokens.slice(0, count).map((token) => ({
            name: token.name,
            address: token.address,
          }));
        });
    },
  });
}
