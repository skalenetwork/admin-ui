import { useSContractWrite } from '@skalenetwork/feat/network/hooks';
import Dialog from '@skalenetwork/ux/components/Dialog/Dialog';
import Field from '@skalenetwork/ux/elements/Field/Field';
import {
  FormEventHandler,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AlertProps } from '../types';
import { useMultisigContext } from './context';
import { MultisigOwner } from './MultisigOwner';

export type DataOut = {
  ownerName: string;
  ownerAddress: string;
  confirmationCount: number;
};

export function FlowAddNewOwner({
  id = 'add_new_owner',
  alertKey,
  toggleAlert,
  owners,
  onSubmit,
}: AlertProps & { owners: string[]; onSubmit: (data: DataOut) => void }) {
  const [step, setStep] = useState(1);

  const { walletAddress } = useMultisigContext();

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

  const addOwner = useSContractWrite('MULTISIG_WALLET', {
    multisigAddress: walletAddress,
    name: 'addOwner',
    args: [form[0].watch('ownerAddress') as `0x{string}`],
  });

  const handleFinalSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const data = {
        ...form[0].getValues(),
        ...form[1].getValues(),
      };
      addOwner.writeAsync &&
        toast
          .promise(
            async () => {
              const response = await addOwner.writeAsync?.(true);
              return response;
            },
            {
              pending: `Adding owner - ${data.ownerName}`,
              success: `Added owner - ${data.ownerName}`,
              error: `Failed to add owner - ${data.ownerName}`,
            },
          )
          .then((data) => {
            form[0].reset();
            form[1].reset();
            onSubmit(data);
          });
      toggleAlert(id)(false);
    },
    [form],
  );

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
              setStep((step) => step + 1);
              return data;
            },
            (err) => console.error(err),
          ),
          actionElement: ({ className }) => (
            <input
              type="submit"
              className={`${className}`}
              value="Next"
              disabled={!form[0].formState.isValid}
            />
          ),
          content: (
            <FormProvider {...form[0]}>
              <div>
                <p className="font-medium mb-4">
                  Add new owner to the active Multisig
                </p>
                <Field
                  control={() => <input type="text" />}
                  name="ownerName"
                  label="Owner name"
                  placeholder="Owner Name"
                  required="Please give a name to the owner"
                />
                <Field
                  control={() => <input type="text" />}
                  name="ownerAddress"
                  label="Owner address"
                  placeholder="Owner Address"
                  required="Please provide the address of new owner"
                  pattern={{
                    value: /^0x[a-fA-F0-9]{40}$/,
                    message: 'Address is invalid',
                  }}
                  validate={(val) =>
                    !owners.some(
                      (address) => address.toLowerCase() === val.toLowerCase(),
                    ) || 'Address belongs to an existing owner'
                  }
                />
              </div>
            </FormProvider>
          ),
        },
        {
          onSubmit: form[1].handleSubmit(
            (data) => {
              setStep((step) => step + 1);
              return data;
            },
            (err) => console.error(err),
          ),
          actionElement: ({ className }) => (
            <input
              type="submit"
              className={`${className}`}
              value="Review"
              disabled={!form[1].formState.isValid}
            />
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
            <FormProvider {...form[1]}>
              <div>
                <p className="font-medium">
                  Set the required owner comfirmations
                </p>
                <Field
                  control={() => (
                    <select>
                      {owners.map((o, index) => (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  )}
                  name="confirmationCount"
                  label="Required confirmations"
                  required="Confirmation count is required"
                />
                Out of {owners.length} owner(s)
              </div>
            </FormProvider>
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
              <div className="p-4">
                <h4>Existing owners</h4>
                {owners.map((ownerAddress, index) => (
                  <MultisigOwner key={index} address={ownerAddress} />
                ))}
              </div>
              <div className="p-4">
                <h4>Adding new owner</h4>
                <MultisigOwner address={form[0].getValues().ownerAddress} />
              </div>
              <div className="grid w-full grid-flow-col grid-cols-[min-content_max-content_1fr] grid-rows-2 gap-x-16 text-sm">
                <p className="font-medium text-[var(--primary)]">Details:</p>
                <div></div>
                <div className="font-medium text-[var(--gray10)]">
                  Owner Name
                </div>
                <div>{form[0].getValues().ownerName}</div>
                <div className="font-medium text-[var(--gray10)]">
                  Requires comfirmation transaction number of
                </div>
                <div>
                  {form[1].getValues().confirmationCount} out of {owners.length}{' '}
                  Owner(s)
                </div>
              </div>
            </div>
          ),
        },
      ]}
    ></Dialog>
  );
}
