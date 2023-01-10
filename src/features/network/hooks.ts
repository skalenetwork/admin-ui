import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider } from 'wagmi';

export function useExplorer() {
  const { chain } = useNetwork();
  const url = chain?.blockExplorers?.default.url;
}

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
