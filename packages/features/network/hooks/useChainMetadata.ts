import { NETWORK } from '@/features/network/literals';
import { build } from '@/features/network/manifest';
import { ChainManifestItem, NetworkType } from '@/features/network/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNetwork } from 'wagmi';

const { chainMetadataUrl } = build;

export function useChainMetadata({
  networkType = 'staging',
}: {
  networkType?: NetworkType;
}) {
  const { chain } = useNetwork();
  const query = useQuery({
    enabled: networkType !== undefined && !!chain,
    queryKey: [chain?.id, 'offchain', `metadata:${networkType}`] as const,
    queryFn: (): Promise<{ [key: string]: ChainManifestItem }> | undefined => {
      return !chain
        ? undefined
        : fetch(chainMetadataUrl(networkType))
            .then((res) => res.json())
            .then((data) => {
              return data[chain.name] || null;
            });
    },
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    chain?.network === NETWORK.SKALE && query.refetch();
  }, [chain?.id]);

  return query;
}
