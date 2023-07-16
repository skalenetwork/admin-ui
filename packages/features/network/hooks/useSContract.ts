import { ABI, ContractIdWithAbi, getAbi } from '@/features/network/abi/abi';
import { CONTRACT, getSContractDetails } from '@/features/network/contract';
import { useSContractProvider } from '@/features/network/hooks';
import { useContract } from 'wagmi';

/**
 * Use wagmi:useContractWrites compatible typed interfaces for any network supported contract by preset ID
 * @param param0
 * @returns
 */
export function useSContract<
  TContractId extends ContractIdWithAbi,
  TAbi extends typeof ABI[TContractId] = typeof ABI[TContractId],
>({
  id,
}: {
  id: TContractId;
}): {
  address?: typeof CONTRACT[TContractId]['address'];
  abi?: TAbi;
  contract?: ReturnType<typeof useContract<TAbi>>;
} {
  let isError = false;
  let address, abi;
  try {
    address = getSContractDetails(id).address;
    abi = getAbi(id);
  } catch (e) {
    isError = true;
  }
  const { provider, signer } = useSContractProvider({ id });
  const contract = useContract({
    address,
    abi,
    signerOrProvider: signer || provider,
  });
  return {
    isError,
    address,
    abi,
    contract,
  };
}
