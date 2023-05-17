import { CrownIcon } from '@/components/Icons/Icons';
import { withErrorBoundary } from '@/elements/ErrorBoundary/ErrorBoundary';
import Field from '@/elements/Field/Field';
import { SButton } from '@/elements/SButton/SButton';
import { addresses } from '@/features/network';
import { ContractDetailList, ContractId } from '@/features/network/contract';
import {
  useRoleAccess,
  useRolesAccess,
  useSContractRead,
  useSContractWrite,
} from '@/features/network/hooks';
import { NETWORK } from '@/features/network/literals';
import { build, CONTRACT } from '@/features/network/manifest';
import NotSupported from '@/screens/NotSupported';
import { useCallback, useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAccount, useNetwork } from 'wagmi';
import rolesMetadata from '../../metadata/roles.json';

type FormData = {
  contractAddress: ContractDetailList['address'];
  role: string;
  assigneeAddress: string;
};

const ROLE_RELATIVES = {
  CONFIG_CONTROLLER: {
    DEPLOYER_ROLE: {
      parents: ['DEPLOYER_ADMIN_ROLE'],
    },
  },
};

export function RoleAssigner() {
  const form = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      contractAddress: CONTRACT['CONFIG_CONTROLLER'].address,
      role: '',
      assigneeAddress: '',
    } as FormData,
  });
  const { address } = useAccount();
  const { chain } = useNetwork();

  const contractAddress = form.watch('contractAddress');
  const role = form.watch('role');
  const assigneeAddress = form.watch('assigneeAddress');

  const selectedContractId = useMemo(() => {
    return build.contractIdFromAddress(contractAddress);
  }, [contractAddress]);

  const { abi } = build.addressAbiPair(selectedContractId);

  const parentRoleNames = [
    'DEFAULT_ADMIN_ROLE',
    ...(ROLE_RELATIVES[selectedContractId]?.[role]?.parents || []),
  ];

  const parentRoles = useRolesAccess(selectedContractId, parentRoleNames);

  const isAllowed = parentRoles.isLoading
    ? undefined
    : parentRoles.data?.some(
        (parentRole) => parentRole?.allow.eoa || parentRole?.allow.mnm,
      );

  const roles = abi
    .filter(({ type, name }) => type === 'function' && name.includes('_ROLE'))
    .map((fragment) => fragment.name);

  const selectedRoleAccess = useRoleAccess(selectedContractId, role);
  const roleHash = selectedRoleAccess.data?.hash;

  useEffect(() => {
    form.setValue('role', roles[0]);
    form.trigger('role');
  }, [contractAddress, roles[0]]);

  const roleDescription = useMemo(() => {
    const foundRole = rolesMetadata.find((item) => item.name === role);
    return foundRole ? foundRole.description : '';
  }, [role, contractAddress]);

  const assigneeHasRole = useSContractRead(selectedContractId, {
    enabled: !!(roleHash && assigneeAddress),
    name: 'hasRole',
    args: [roleHash, assigneeAddress],
  });

  const roleActionName = !assigneeHasRole.isSuccess
    ? undefined
    : assigneeHasRole.data === true
    ? 'revokeRole'
    : assigneeHasRole.data === false
    ? 'grantRole'
    : undefined;

  const grantOrRevokeRole = useSContractWrite(selectedContractId, {
    enabled: !!(roleHash && assigneeAddress && roleActionName),
    name: roleActionName,
    args: [roleHash, assigneeAddress],
  });

  const isOffnet = chain?.network !== NETWORK.SKALE;

  const isPreparing =
    form.formState.isValid &&
    (assigneeHasRole.isLoading || selectedRoleAccess.isFetching);

  const validateRole = useCallback(
    (val: string) => {
      return !val
        ? 'Role is required'
        : parentRoles.isLoading
        ? 'Assessing access level'
        : !isAllowed
        ? 'Not authorized to administer the role'
        : true;
    },
    [parentRoles.isLoading, isAllowed],
  );

  useEffect(() => {
    form.trigger('role');
  }, [parentRoles.isLoading, isAllowed]);

  return (
    <div
      className="h-full w-full rounded-lg bg-[var(--white)] p-6 relative"
      data-s="-1"
    >
      {isOffnet ? (
        <NotSupported theme="blur">
          <CrownIcon className="mr-4" />
          &emsp;
          <strong>Assign Roles</strong> to users for various SKALE SChain
          operations.
        </NotSupported>
      ) : (
        <></>
      )}
      <div className="py-2">
        <p>Please fill in all inputs to assign role:</p>
      </div>
      <div>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(async (data) => {
              await grantOrRevokeRole.writeAsync?.(true);
              assigneeHasRole.refetch();
            })}
          >
            <div className="grid grid-cols-2">
              <Field<FormData>
                name="contractAddress"
                label="Contract"
                control={() => (
                  <select>
                    {Object.entries(CONTRACT)
                      .filter(([id, contract]) => {
                        return (
                          contract.network === NETWORK.SKALE &&
                          !(['COMMUNITY_POOL'] as ContractId[]).includes(id)
                        );
                      })
                      .map(([id, contract], index) => (
                        <option value={contract.address} key={index}>
                          {contract.name}
                        </option>
                      ))}
                  </select>
                )}
                required="Contract is required"
                placeholder="Choose a contract"
              />
            </div>
            <div className="grid grid-cols-2">
              <Field<FormData>
                name="role"
                label="Role"
                control={() => (
                  <select>
                    {roles.map((role) => (
                      <option value={role}>{role}</option>
                    ))}
                  </select>
                )}
                validate={validateRole}
                placeholder="Choose a role"
              />
              <div className="pt-4 px-4">
                <small className="text-[var(--gray10)]">
                  {roleDescription}
                </small>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <datalist id="contract_list">
                {Object.values(CONTRACT)
                  .filter((c) => c.network === NETWORK.SKALE)
                  .map((contract) => (
                    <option key={contract.key} value={contract.address}>
                      {contract.name}
                    </option>
                  ))}
              </datalist>
              <Field<FormData>
                name="assigneeAddress"
                label="Assignee"
                control={() => (
                  <input type="text" id="contract_list" list="contract_list" />
                )}
                required="Assignee address is required"
                disabled={!isAllowed || !role}
                placeholder="0x..."
                showResetter
              />
              <div className="pt-4 px-4">
                <div className="my-2 flex flex-row gap-4">
                  <button
                    className="btn btn-outline py-3"
                    onClick={(e) => {
                      e.preventDefault();
                      form.setValue(
                        'assigneeAddress',
                        addresses.SCHAIN_MULTISIG_WALLET_ADDRESS as string,
                      );
                      form.trigger('assigneeAddress');
                    }}
                  >
                    Fill pre-deployed Multisig
                  </button>
                  <button
                    className="btn btn-outline py-3"
                    onClick={(e) => {
                      e.preventDefault();
                      form.setValue('assigneeAddress', address as string);
                      form.trigger('assigneeAddress');
                    }}
                  >
                    Fill my address
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-4 gap-4">
              <SButton
                className="btn"
                type="submit"
                writer={grantOrRevokeRole}
                noWrite
                disabled={isPreparing}
              >
                {isPreparing ? (
                  <p className="animate-bounce">. . .</p>
                ) : roleActionName === 'grantRole' ? (
                  'Assign Role'
                ) : roleActionName === 'revokeRole' ? (
                  'Revoke Role'
                ) : (
                  '---'
                )}
              </SButton>
              {(grantOrRevokeRole.isError || grantOrRevokeRole.isSuccess) && (
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    grantOrRevokeRole.reset();
                    grantOrRevokeRole.isSuccess && assigneeHasRole.refetch();
                    form.reset();
                  }}
                >
                  Reset
                </button>
              )}
              <small>
                {parentRoles.isLoading
                  ? 'Retrieving contract access information..'
                  : grantOrRevokeRole.isError ? grantOrRevokeRole.error?.message : ''}
              </small>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default withErrorBoundary(RoleAssigner);
