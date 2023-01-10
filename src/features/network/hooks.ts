import { useNetwork, useProvider, useQuery } from 'wagmi';

export function useExplorer() {
  const { chain } = useNetwork();
  const url = chain?.blockExplorers?.default.url;
}
