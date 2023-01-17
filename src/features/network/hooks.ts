import { useQuery } from '@tanstack/react-query';
import { Address, useNetwork, useProvider } from 'wagmi';

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

export function useRoles({ signer }: { signer: Address }) {}

export type NetworkType = 'mainnet' | 'staging';

export const registries = {
  chainlist: {},
  skale: {
    baseUrl: 'https://raw.githubusercontent.com',
    path: 'skalenetwork/skale-network/master',
  },
};

const getChainMetadataUrl = (networkType: NetworkType) => {
  const { path, baseUrl } = registries.skale;
  return `${baseUrl}/${path}/metadata/${networkType}/chains.json`;
};

export function useChainMetadata({
  networkType,
}: {
  networkType: NetworkType;
}) {
  const { data, isError } = useQuery({
    queryKey: [networkType],
    queryFn: () => {
      return fetch(getChainMetadataUrl(networkType)).then((res) => res.json());
    },
  });
  return { data };
}
