import { ABI } from '@/features/network/abi/abi';
import { CONTRACT, ContractId } from '@/features/network/contract';
import { useSContractRead, useSContractRoles } from '@/features/network/hooks';
import { RoleFragment } from '@/features/network/types';
import { Address, useAccount } from 'wagmi';

export function useRolesAccess<
  TContractId extends ContractId,
  TAbi extends typeof ABI[TContractId],
  TRoleName extends Extract<TAbi[number], RoleFragment>['name'],
>(id: TContractId, roleList?: TRoleName[]) {
  const account = useAccount();

  const accountRole = useSContractRoles(id, roleList);
  const puppeteerRoleHash = useSContractRead('MARIONETTE', {
    name: 'PUPPETEER_ROLE',
  });
  const isMultisigPuppeteer = useSContractRead('MARIONETTE', {
    enabled: puppeteerRoleHash.isSuccess,
    name: 'hasRole',
    args: [puppeteerRoleHash.data as Address, CONTRACT.MULTISIG_WALLET.address],
  });
  const isSignerMultisigOwner = useSContractRead('MULTISIG_WALLET', {
    enabled: !!account.address,
    name: 'isOwner',
    args: [account.address as Address],
  });

  const allReads = [accountRole, isSignerMultisigOwner, isMultisigPuppeteer];

  const data = accountRole.data.map((datum) => {
    const { permissions } = datum;
    const mnmRequirements = [
      permissions.marionette,
      isSignerMultisigOwner.data,
      isMultisigPuppeteer.data,
    ];
    const hasMnm = mnmRequirements.some((v) => v === undefined)
      ? undefined
      : mnmRequirements.reduce((acc, curr) => acc && curr, 1);
    return {
      name: datum.name,
      hash: datum.hash,
      adminAddress: datum.adminAddress,
      isOwnerOfMultisig: isSignerMultisigOwner.data,
      isMultisigPuppeteer: isMultisigPuppeteer.data,
      allow: {
        eoa: permissions.signer,
        mnm: hasMnm,
      },
    };
  });

  return {
    isLoading: allReads.reduce((acc, curr) => ({
      isLoading: acc.isLoading || curr.isLoading,
    }))?.isLoading,
    isFetching: allReads.reduce((acc, curr) => ({
      isFetching: acc.isFetching || curr.isFetching,
    }))?.isFetching,
    data,
  };
}
