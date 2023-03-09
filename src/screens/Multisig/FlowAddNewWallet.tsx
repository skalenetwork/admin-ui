import Dialog from '@/components/Dialog/Dialog';
import Field from '@/elements/Field/Field';
import { useCacheWallet } from '@/features/multisig/hooks';
import { getAbi } from '@/features/network/abi/abi';
import {
  ExclamationTriangleIcon,
  MinusCircledIcon,
} from '@radix-ui/react-icons';
import { useCallback, useLayoutEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Address, useAccount, useContractRead } from 'wagmi';
import { AlertProps } from '../types';

export type DataOut = {
  name: string;
  address: string;
};

export function FlowAddNewWallet({
  id = 'add_new_wallet',
  alertKey,
  toggleAlert,
  onSubmit,
}: AlertProps & { onSubmit: (data: DataOut) => void }) {
  const [step, setStep] = useState(1);

  const { address } = useAccount();

  // reset
  useLayoutEffect(() => {
    if (alertKey !== id) {
      window.setTimeout(() => {
        setStep(1);
        // add forms reset here
        form.reset();
      }, 1000);
    }
  }, [alertKey]);

  const form = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      address: '',
    },
    shouldUnregister: false,
  });

  const { add: addWallet } = useCacheWallet();

  const walletAddress = form.watch('address') as Address;

  const handleFinalSubmit = useCallback(
    (data) => {
      addWallet({ name: form.getValues('name'), address: walletAddress });
      toggleAlert(id)(false);
    },
    [form],
  );

  const multisigAbi = getAbi('MULTISIG_WALLET');

  const maybeMultisigOwner = useContractRead({
    enabled: form.formState.isValid,
    address: walletAddress,
    abi: multisigAbi,
    functionName: 'isOwner',
    args: [address],
  });

  return (
    <Dialog
      trigger={
        <button className="btn h-full cursor-pointer rounded-full border border-slate-500">
          Add new wallet
        </button>
      }
      description=""
      title={`Add new Multisig`}
      open={alertKey === id}
      onOpenChange={toggleAlert(id)}
      activeStep={step}
      steps={[
        {
          onSubmit: form.handleSubmit(handleFinalSubmit, (err) =>
            console.error(err),
          ),
          actionElement: ({ className }) => (
            <input
              type="submit"
              className={`${className}`}
              value="Submit"
              disabled={
                !form.formState.isValid || maybeMultisigOwner.data !== true
              }
            />
          ),
          content: (
            <FormProvider {...form}>
              <div>
                <Field
                  control={() => <input type="text" />}
                  name="name"
                  label="Multisig Name"
                  placeholder="Multisig name"
                  required="Please give a name to the new multisig wallet"
                />
                <Field
                  control={() => <input type="text" />}
                  name="address"
                  label="Address"
                  placeholder="address"
                  required="Please provide the address for new multisig wallet"
                  pattern={{
                    value: /^0x[a-fA-F0-9]{40}$/,
                    message: 'Address is invalid',
                  }}
                />
                {maybeMultisigOwner.isLoading && (
                  <p className="text-sm text-center align-middle">
                    <span className="text-[var(--gray11)] align-middle">
                      <MinusCircledIcon className="animate-spin" />
                    </span>{' '}
                    Fetching and validating contract and ownership...
                  </p>
                )}
                {maybeMultisigOwner.isError && (
                  <p className="text-sm text-center">
                    <span className="text-[var(--red10)]">
                      <ExclamationTriangleIcon />
                    </span>{' '}
                    Address does not belong to a multisig contract.
                  </p>
                )}
                {maybeMultisigOwner.data === false && (
                  <p className="text-sm text-center">
                    <span className="text-[var(--red10)]">
                      <ExclamationTriangleIcon />
                    </span>{' '}
                    You do not have ownership to the multisig contract.
                  </p>
                )}
              </div>
            </FormProvider>
          ),
        },
      ]}
    ></Dialog>
  );
}
