import { useChainMetadata } from '@/features/network/hooks';
import { useNetwork } from 'wagmi';

export function useNetworkInfo() {
  const { chain } = useNetwork();
  const { data } = useChainMetadata({
    networkType: chain?.testnet ? 'staging' : 'mainnet',
  });

  return {
    chainInfo: chain && data && data[chain.name],
  };
}
