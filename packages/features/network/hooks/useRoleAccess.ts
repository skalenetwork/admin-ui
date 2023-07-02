import { ABI } from '@/features/network/abi/abi';
import { ContractId } from '@/features/network/contract';
import { useRolesAccess } from '@/features/network/hooks';

export function useRoleAccess<
  TContractId extends ContractId,
  TAbi extends typeof ABI[TContractId],
  TRoleName extends Extract<TAbi[number], RoleFragment>['name'],
>(id: TContractId, role: TRoleName) {
  const { data, ...rest } = useRolesAccess(id, [role]);
  return {
    data: data[0],
    ...rest,
  };
}
