import { ABI, ContractIdWithAbi, getAbi } from '@/features/network/abi/abi';
import { CONTRACT } from '@/features/network/contract';
import { NETWORK } from '@/features/network/literals';
import { getContract, getProvider } from '@wagmi/core';
import { useMemo } from 'react';
import { useContract, useProvider } from 'wagmi';

/**
 * Use wagmi:useContractWrites compatible typed interfaces for any network supported contract by preset ID
 * @description Fetches a list of contracts, for a single, prefer useTypedContract
 * @todo refactor to getSContractProvider() when it's stable
 * @param param0
 * @returns
 */
export function useSContracts<T extends ContractIdWithAbi>({
  id,
}: {
  id: T[];
}): {
  contractId: T;
  address?: typeof CONTRACT[T]['address'];
  abi?: typeof ABI[T];
  contract?: ReturnType<typeof useContract<typeof ABI[T]>>;
}[] {
  const connectedProvider = useProvider();
  const mainnetProvider = getProvider({ chainId: 1 });

  return useMemo(
    () =>
      id
        ? id.map((contractId, index) => {
            const { address, network } = CONTRACT[contractId];

            let abi, contract;

            try {
              abi = getAbi(contractId);
            } catch (e) {
              console.error(e);
            }

            const provider =
              network === NETWORK.SKALE ? connectedProvider : mainnetProvider;

            contract =
              abi &&
              getContract({
                address,
                abi,
                signerOrProvider: provider,
              });

            return {
              contractId,
              address,
              abi,
              contract,
            };
          })
        : [],
    [connectedProvider],
  );
}
