import { ABI, getAbi } from '@/features/network/abi/abi';
import { CONTRACT, ContractId } from '@/features/network/contract';
import { useSContractReads } from '@/features/network/hooks';
import { RoleFragment } from '@/features/network/types';
import { Address, useAccount } from 'wagmi';

export function useSContractRoles<
  TContractId extends ContractId,
  TAbi extends typeof ABI[TContractId],
  TRoleName extends Extract<TAbi[number], RoleFragment>['name'],
>(id: TContractId, roleList?: TRoleName[]) {
  const { address } = useAccount();
  const abi = getAbi(id) || [];

  const rolesOfContract = abi
    .filter(({ type, name }) => type === 'function' && name.includes('_ROLE'))
    .map((fragment) => fragment.name) as TRoleName[];

  const roles = roleList
    ? roleList.filter((role) => rolesOfContract.includes(role))
    : rolesOfContract;

  const roleHash = useSContractReads(id, {
    reads: roles.map((role: TRoleName) => ({
      name: role,
    })),
  });
  const ofSigner = useSContractReads(id, {
    enabled: roleHash.isSuccess && Boolean(roleHash.data),
    reads: roleHash.data
      ? roleHash.data.map((role) => ({
          name: 'hasRole',
          args: [role, address],
        }))
      : [],
  });
  const ofMarionette = useSContractReads(id, {
    enabled: roleHash.isSuccess && Boolean(roleHash.data),
    reads: roleHash.data
      ? roleHash.data.map((role) => ({
          name: 'hasRole',
          args: [role, CONTRACT.MARIONETTE.address],
        }))
      : [],
  });
  const roleAdmin = useSContractReads(id, {
    enabled: roleHash.isSuccess && Boolean(roleHash.data),
    reads: roleHash.data
      ? roleHash.data.map((role) => ({
          name: 'getRoleAdmin',
          args: [role],
        }))
      : [],
  });

  const data: {
    name: string;
    hash?: Address;
    adminAddress?: Address;
    permissions: {
      marionette?: boolean;
      signer?: boolean;
    };
  }[] = roles.map((role, index) => ({
    name: role,
    hash: roleHash.data?.[index] as Address,
    adminAddress: roleAdmin.data?.[index] as Address,
    permissions: {
      marionette: ofMarionette.data?.[index] as boolean,
      signer: ofSigner.data?.[index] as boolean,
    },
  }));

  return {
    isLoading:
      roleHash.isLoading ||
      ofSigner.isLoading ||
      ofMarionette.isLoading ||
      roleAdmin.isLoading,
    isFetching:
      roleHash.isFetching ||
      ofSigner.isFetching ||
      ofMarionette.isFetching ||
      roleAdmin.isFetching,
    data,
  };
}
