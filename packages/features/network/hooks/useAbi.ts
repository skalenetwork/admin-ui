import { ContractIdWithAbi, getAbi } from '@/features/network/abi/abi';
import { useQuery } from '@tanstack/react-query';

export function useAbi<T extends ContractIdWithAbi>(id: T) {
  const { data } = useQuery({
    queryKey: ['*', 'abi', id],
    queryFn: () => getAbi(id),
  });
  return data;
}
