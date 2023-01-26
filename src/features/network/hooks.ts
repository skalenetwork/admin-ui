import { useQuery } from '@tanstack/react-query';
import { Address, useNetwork } from 'wagmi';
import { getChainMetadataUrl, NetworkType } from './manifest';

type ExplorerProps = {
  module:
    | 'account'
    | 'stats'
    | 'transaction'
    | 'logs'
    | 'block'
    | 'token'
    | 'contract';
  action: 'listaccounts';
  args?: {
    [key: string]: string;
  };
};

export type ChainManifestItem = {
  alias: string; // branded chain name (required)
  background: string; // background color (required)
  category: 'apps' | 'games'; // category: apps | games (required)
  url?: string; // url for dapp (optional)
  minSfuelWei?: string; // minimum allowed sFUEL (optional)
  faucetUrl?: string; // chain faucet URL (optional)
  description?: string; // description (optional)
};

/**
 * Use API of the block explorer as configured by the chain
 * @param param0
 * @returns
 */
export function useExplorer({ module, action, args }: ExplorerProps) {
  const { chain } = useNetwork();
  const baseUrl = chain?.blockExplorers?.default.url;
  const queryString = new URLSearchParams(args).toString();
  const url =
    baseUrl +
    `api?module=${module}&action=${action}${
      queryString ? '&' + queryString : ''
    }`;
  return useQuery({
    queryKey: [chain?.id, module, action, args],
    queryFn: () => fetch(url).then((res) => res.json()),
  });
}

export function useRoles({ address }: { address: Address }) {}

export function useChainMetadata({
  networkType,
}: {
  networkType: NetworkType;
}) {
  const { data, isError } = useQuery({
    queryKey: ['offchain', `metadata:${networkType}`] as const,
    queryFn: (): Promise<{ [key: string]: ChainManifestItem }> => {
      return fetch(getChainMetadataUrl(networkType)).then((res) => res.json());
    },
  });
  return { data, isError };
}
