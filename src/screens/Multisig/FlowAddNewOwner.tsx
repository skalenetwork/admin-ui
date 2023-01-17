import Dialog from '@/components/Dialog/Dialog';
import { ErrorMessage } from '@hookform/error-message';
import { useState, useLayoutEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { tw } from 'twind';
import { AlertProps } from '../ChainManager/types';

export function FlowAddNewOwner({
  id = 'add_new_owner',
  alertKey,
  toggleAlert,
}: AlertProps) {
  const [step, setStep] = useState(1);

  useLayoutEffect(() => {
    if (alertKey !== id) {
      window.setTimeout(() => {
        setStep(1);
        // form reset here
      }, 1000);
    }
  }, [alertKey]);

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      ownerName: '',
    },
  });

  const {
    register,
    formState: { errors, isValid },
  } = methods;

  const onSubmit = (data) => {
    console.log('form data', data);
    toggleAlert(id)(false);
  };

  return (
    <FormProvider {...methods}>
      <Dialog
        trigger={
          <p className="cursor-pointer text-[var(--primary)]">
            +{' '}
            <span className="underline underline-offset-4 hover:underline-offset-2">
              Add new owner
            </span>
          </p>
        }
        title={`Add new owner`}
        description={`Step ${step} of 3`}
        open={alertKey === id}
        onOpenChange={toggleAlert(id)}
        onSubmit={methods.handleSubmit(onSubmit)}
        actionElement={({ className }: { className: string }) =>
          step === 3 ? (
            <input type="submit" className={`${className}`} value={'Submit'} />
          ) : (
            <div
              className={`${className}`}
              onClick={(e) => setStep((value) => value + 1)}
            >
              {step === 1 ? 'Next' : 'Review'}
            </div>
          )
        }
        cancelElement={
          step > 1
            ? ({ className }: { className: string }) => (
                <div
                  className={`${className}`}
                  onClick={(e) => setStep((value) => value - 1)}
                >
                  Back
                </div>
              )
            : undefined
        }
      >
        <div
          className={tw`${step !== 1 ? 'invisible h-0 overflow-hidden' : ''}`}
        >
          <p className="font-medium">Add new owner to the active Multisig</p>
          <fieldset>
            <label htmlFor="">Owner name *</label>
            <input
              type="text"
              {...register('ownerName', {
                required: 'Please give a name to the owner',
              })}
              required
              placeholder="Owner Name"
            />
            <ErrorMessage
              errors={errors}
              name="ownerName"
              render={({ message }) => (
                <p className="text-normal mb-3 text-[var(--red6)]">{message}</p>
              )}
            />
          </fieldset>
        </div>
      </Dialog>
    </FormProvider>
  );
}
