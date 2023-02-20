import { CrownIcon } from '@/components/Icons/Icons';
import Field from '@/elements/Field/Field';
import { addresses } from '@/features/network';
import { ContractDetailList, ContractId } from '@/features/network/contract';
import { useSContract } from '@/features/network/hooks';
import { NETWORK } from '@/features/network/literals';
import { build, CONTRACT } from '@/features/network/manifest';
import NotSupported from '@/screens/NotSupported';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Address,
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useQuery,
} from 'wagmi';
import rolesMetadata from '../../metadata/roles.json';

type FormData = {
  contractAddress: ContractDetailList['address'];
  role: string;
  assigneeAddress: string;
};

export default function RoleAssigner() {
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

  const { contract, abi } = useSContract({
    id: selectedContractId,
  });

  const roles = abi
    ? abi
        .filter(
          ({ type, name }) => type === 'function' && name.includes('_ROLE'),
        )
        .map((fragment) => fragment.name)
    : [];

  const { data: roleHash } = useQuery({
    enabled: !!role,
    queryKey: [selectedContractId, 'role', role],
    queryFn: () => {
      return contract?.[role]() as Address;
    },
  });

  useEffect(() => {
    form.setValue('role', roles[0]);
    form.trigger('role');
  }, [contractAddress]);

  const roleDescription = useMemo(() => {
    const foundRole = rolesMetadata.find((item) => item.name === role);
    return foundRole ? foundRole.description : '';
  }, [role, contractAddress]);

  const { config } = usePrepareContractWrite({
    abi,
    address: contractAddress,
    functionName: 'grantRole',
    args: [roleHash, assigneeAddress],
  });
  const { writeAsync } = useContractWrite(config);

  return (
    <div
      className="h-full w-full rounded-lg bg-[var(--white)] p-6 relative"
      data-s="-1"
    >
      {chain?.network !== NETWORK.SKALE ? (
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
            onSubmit={form.handleSubmit((data) => {
              writeAsync?.();
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
                          !(
                            contract.type === 'ima:bridge' &&
                            contract.network === NETWORK.ETHEREUM
                          ) &&
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
                required="Role is required"
                placeholder="Choose a role"
              />
              <div className="pt-4 px-4">
                <small className="text-[var(--gray10)]">
                  {roleDescription}
                </small>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <Field<FormData>
                name="assigneeAddress"
                label="Assignee"
                control={() => <input type="text" />}
                required="Assignee address is required"
                placeholder="0x..."
              />
              <div className="pt-4 px-4">
                <div className="my-2 flex flex-row gap-4">
                  <button
                    className="btn btn-outline py-3"
                    onClick={() => {
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
                    className="btn btn-outline text-sm"
                    onClick={() => {
                      form.setValue('assigneeAddress', address as string);
                      form.trigger('assigneeAddress');
                    }}
                  >
                    Fill my address
                  </button>
                </div>
              </div>
            </div>
            <button type="submit" className="btn mt-4">
              Assign Role
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
