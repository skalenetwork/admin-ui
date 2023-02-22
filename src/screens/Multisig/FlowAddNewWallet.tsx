import Dialog from '@/components/Dialog/Dialog';
import Field from '@/elements/Field/Field';
import { useCallback, useLayoutEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
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

  // reset
  useLayoutEffect(() => {
    if (alertKey !== id) {
      window.setTimeout(() => {
        setStep(1);
        // add forms reset here
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

  const handleFinalSubmit = useCallback(
    (data) => {
      onSubmit(data);
      toggleAlert(id)(false);
    },
    [form],
  );

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
              disabled={!form.formState.isValid}
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
              </div>
            </FormProvider>
          ),
        },
      ]}
    ></Dialog>
  );
}
