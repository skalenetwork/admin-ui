import Field from '@/elements/Field/Field';
import { FormProvider, useForm } from 'react-hook-form';
import { useAccount, useNetwork } from 'wagmi';

import { CrownIcon } from '@/components/Icons/Icons';
import { addresses } from '@/features/network';
import { NETWORK } from '@/features/network/constants';
import NotSupported from '@/screens/NotSupported';

type FormData = {
  contractAddress: string;
  role: string;
  assigneeAddress: string;
};

export default function RoleAssigner() {
  const form = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      contractAddress: '',
      role: '',
      assigneeAddress: '',
    } as FormData,
  });
  const { address } = useAccount();
  const { chain } = useNetwork();

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
        <small className="text-gray-500">
          @adil: implementation pending clear understanding of role matrix
        </small>
      </div>
      <div className="grid grid-cols-2">
        <div>
          <FormProvider {...form}>
            <Field<FormData>
              name="contractAddress"
              label="Contract"
              control={() => (
                <select>
                  <option value="address">
                    Options from <code>`@features/network`</code>
                  </option>
                </select>
              )}
              required="Contract is required"
              placeholder="Choose a contract"
            />
            <Field<FormData>
              name="role"
              label="Role"
              control={() => (
                <select>
                  <option value="address">
                    Roles within scope of above contract
                  </option>
                </select>
              )}
              required="Contract is required"
              placeholder="Choose a role"
            />
            <Field<FormData>
              name="assigneeAddress"
              label="Assignee"
              control={() => <input type="text" />}
              required="Assignee address is required"
              placeholder="0x..."
            >
              <div className="my-2 flex flex-row gap-4">
                <button
                  className="btn slim text-sm"
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
                  className="btn slim text-sm"
                  onClick={() => {
                    form.setValue('assigneeAddress', address as string);
                    form.trigger('assigneeAddress');
                  }}
                >
                  Fill my address
                </button>
              </div>
            </Field>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
