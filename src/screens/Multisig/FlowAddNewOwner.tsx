import Dialog from '@/components/Dialog/Dialog';
import { ErrorMessage } from '@hookform/error-message';
import { isAddress } from 'ethers/lib/utils.js';
import { useState, useLayoutEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { tw } from 'twind';
import { AlertProps } from '../ChainManager/types';

export function FlowAddNewOwner({
  id = 'add_new_owner',
  alertKey,
  toggleAlert,
  owners,
}: AlertProps & { owners: string[] }) {
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

  const form = [
    useForm({
      mode: 'onChange',
      reValidateMode: 'onChange',
      defaultValues: {
        ownerName: '',
        ownerAddress: '',
      },
      shouldUnregister: false,
    }),
    useForm({
      mode: 'all',
      reValidateMode: 'onSubmit',
      defaultValues: {
        confirmationCount: 1,
      },
      shouldUnregister: false,
    }),
  ] as const;

  const handleFinalSubmit = () => {
    const data = {
      ...form[0].getValues(),
      ...form[1].getValues(),
    };
    toggleAlert(id)(false);
  };

  return (
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
      activeStep={step}
      steps={[
        {
          onSubmit: form[0].handleSubmit(
            (data) => {
              console.log(data);
              setStep((step) => step + 1);
              return data;
            },
            (err) => console.error(err),
          ),
          actionElement: ({ className }) => (
            <input type="submit" className={`${className}`} value="Next" />
          ),
          content: (
            <div>
              <p className="font-medium">
                Add new owner to the active Multisig
              </p>
              <fieldset>
                <label htmlFor="">Owner name *</label>
                <input
                  type="text"
                  {...form[0].register('ownerName', {
                    required: 'Please give a name to the owner',
                  })}
                  required
                  placeholder="Owner Name"
                />
                <ErrorMessage
                  errors={form[0].formState.errors}
                  name="ownerName"
                  render={({ message }) => (
                    <p className="text-normal mb-3 text-[var(--red6)]">
                      {message}
                    </p>
                  )}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="">Owner address *</label>
                <input
                  type="text"
                  {...form[0].register('ownerAddress', {
                    required: 'Please provide a valid 0x address',
                    validate: (val) =>
                      isAddress(val) || 'Please provide a valid 0x address',
                  })}
                  required
                  placeholder="Owner Address"
                />
                <ErrorMessage
                  errors={form[0].formState.errors}
                  name="ownerAddress"
                  render={({ message }) => (
                    <p className="text-normal mb-3 text-[var(--red6)]">
                      {message}
                    </p>
                  )}
                />
              </fieldset>
            </div>
          ),
        },
        {
          onSubmit: form[1].handleSubmit(
            (data) => {
              console.log(data);
              setStep((step) => step + 1);
              return data;
            },
            (err) => console.error(err),
          ),
          actionElement: ({ className }) => (
            <input type="submit" className={`${className}`} value="Review" />
          ),
          cancelElement: ({ className }) => (
            <div
              className={`${className}`}
              onClick={(e) => setStep((value) => value - 1)}
            >
              Back
            </div>
          ),
          content: (
            <div>
              <p className="font-medium">
                Set the required owner comfirmations
              </p>
              <fieldset>
                <label htmlFor="">Required confirmations *</label>
                <select
                  {...form[1].register('confirmationCount', {
                    required: 'Confirmation count is required',
                  })}
                  required
                  placeholder="Confirmation count *"
                >
                  {owners.map((o, index) => (
                    <option value={index + 1}>{index + 1}</option>
                  ))}
                </select>
                Out of {owners.length} owner(s)
                <ErrorMessage
                  errors={form[1].formState.errors}
                  name="confirmationCount"
                  render={({ message }) => (
                    <p className="text-normal mb-3 text-[var(--red6)]">
                      {message}
                    </p>
                  )}
                />
              </fieldset>
            </div>
          ),
        },
        {
          actionElement: ({ className }) => (
            <input type="submit" className={`${className}`} value="Submit" />
          ),
          cancelElement: ({ className }) => (
            <div
              className={`${className}`}
              onClick={(e) => setStep((value) => value - 1)}
            >
              Back
            </div>
          ),
          onSubmit: handleFinalSubmit,
          content: (
            <div>
              <div className="grid grid-cols-3 text-sm">
                <div>
                  <p className="text-[var(--primary)]">Details:</p>
                </div>
                <div>
                  <p>
                    Owner Name
                    <br />
                    {form[0].getValues().ownerName}
                  </p>
                </div>
                <div>
                  <p>
                    Confirmation Count
                    <br />
                    {form[1].getValues().confirmationCount}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <h4>Adding new owner</h4>
              </div>
            </div>
          ),
        },
      ]}
    ></Dialog>
  );
}
