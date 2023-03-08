import { CONTRACT, ContractId } from '@/features/network/contract';
import { NETWORK } from '@/features/network/literals';
import { getProvider } from '@wagmi/core';
import { useNetwork } from 'wagmi';

export function getSContractProvider<T extends ContractId>(
  id: T,
  {
    chains,
    chain,
  }: {
    chains: ReturnType<typeof useNetwork>['chains'];
    chain: ReturnType<typeof useNetwork>['chain'];
  },
) {
  if (!chain) return;

  const { network: contractNetwork } = CONTRACT[id] || {};
  let chainId;

  // verbose for intuition
  if (contractNetwork === NETWORK.ETHEREUM) {
    chainId = chains.find((c) => chain.network === NETWORK.ETHEREUM)?.id;
  } else if (chain.network === NETWORK.SKALE) {
    if (contractNetwork === NETWORK.SKALE) {
      chainId = chain.id;
    } else {
      chainId = chains.find((c) => chain.network === c.network)?.id;
    }
  } else if (chain.network === NETWORK.ETHEREUM) {
    chainId = chains.find((c) => chain.network === NETWORK.ETHEREUM)?.id;
  } else {
    return;
  }

  const provider = getProvider({
    chainId,
  });

  return provider;
}
