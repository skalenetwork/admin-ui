import { useQueries } from '@tanstack/react-query';
import { useNetwork } from 'wagmi';

const MODULES = [
  'account',
  'stats',
  'transaction',
  'logs',
  'block',
  'token',
  'contract',
] as const;

type ExplorerProps = {
  module: typeof MODULES[number];
  action: 'listaccounts' | 'getLogs' | string;
  args?: {
    [key: string]: string;
  };
};

/**
 * Use API of the block explorer as configured by the chain
 * @param param0
 * @returns
 */
export function useExplorer(
  requests: ExplorerProps[],
  {
    chainId,
    enabled,
  }: {
    enabled?: boolean;
    chainId?: number;
  } = {},
) {
  const { chain: currentChain, chains } = useNetwork();
  const chain = chainId ? chains.find((c) => c.id === chainId) : currentChain;
  const baseUrl = chain?.blockExplorers?.default.url;

  const queries = requests.map((request: ExplorerProps) => {
    const { module, action, args } = request;
    const queryString = new URLSearchParams(args).toString();
    const url =
      baseUrl +
      `api?module=${module}&action=${action}${
        queryString ? '&' + queryString : ''
      }`;
    return {
      enabled,
      queryKey: [chain?.id, module, action, args],
      queryFn: () => fetch(url).then((res) => res.json()),
      refetchOnWindowFocus: false,
    };
  });
  return useQueries({
    queries,
  });
}
