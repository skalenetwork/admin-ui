import { ContractId } from '@/features/network/contract';
import { getSContractProvider } from '@/features/network/core';
import { useAsyncFn } from 'react-use';
import { useNetwork, useSigner } from 'wagmi';

/**
 * Retrieve provider and signer for the network contract
 * @param param0
 * @returns
 */
export function useSContractProvider<T extends ContractId>({ id }: { id: T }) {
  const { chain, chains } = useNetwork();
  const provider = getSContractProvider(id, {
    chain,
    chains,
  });
  const network = useAsyncFn(async () => {
    return provider?.getNetwork();
  });
  const { data: signer } = useSigner({
    chainId: network[0].value?.chainId,
  });
  return {
    provider,
    signer,
  };
}
