import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import {
  useRoleAccess,
  useSContractWrite,
} from '@skalenetwork/feat/network/hooks';
import { useStorageSpace } from '@skalenetwork/feat/storage/hooks';
import Card from '@skalenetwork/ux/components/Card/Card';
import Dialog from '@skalenetwork/ux/components/Dialog/Dialog';
import Progress from '@skalenetwork/ux/components/Progress/Progress';
import { withErrorBoundary } from '@skalenetwork/ux/elements/ErrorBoundary/ErrorBoundary';
import Field from '@skalenetwork/ux/elements/Field/Field';
import { Address } from 'abitype';
import { BigNumber } from 'ethers';
import prettyBytes from 'pretty-bytes';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { tw } from 'twind';

import type { WidgetWithAlertProps } from '../types';

export const FormattedSize = ({ value }: { value: number }) =>
  value !== undefined ? <>{prettyBytes(value || 0)}</> : <></>;

export const StorageStatus = ({
  className = '',
  occupiedSpace,
  reservedSpace,
}: {
  className: string;
  occupiedSpace: number;
  reservedSpace: number;
}) => {
  const usedSpace = useMemo(() => {
    return (occupiedSpace / reservedSpace) * 100 || 0;
  }, [occupiedSpace, reservedSpace]);

  return (
    <div className={className}>
      <p>
        <span className="font-semibold">
          <FormattedSize value={occupiedSpace} />
        </span>{' '}
        used
      </p>
      <p className="text-xs font-medium">
        {usedSpace.toFixed(4)}% used -{' '}
        {prettyBytes(reservedSpace - occupiedSpace || 0)} free
      </p>
      <Progress value={usedSpace} />
    </div>
  );
};

type StorageReserveForm = {
  reserveSpaceAddress: Address;
  reserveSpaceAmount: string;
  reserveSpaceUnit: 'kb' | 'gb' | 'mb';
};

export function FileStorageReserve({
  id,
  alertKey,
  toggleAlert,
}: WidgetWithAlertProps) {
  const { totalReservedSpace = 0, totalStorageSpace = 0 } = useStorageSpace();

  const form = useForm<StorageReserveForm>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      reserveSpaceAddress: '' as Address,
      reserveSpaceAmount: '1',
      reserveSpaceUnit: 'kb',
    },
  });

  const unit = form.watch('reserveSpaceUnit');
  const address = form.watch('reserveSpaceAddress');
  const multiplier =
    unit === 'kb' ? 1 : unit === 'mb' ? 2 : unit === 'gb' ? 3 : 0;
  const amount =
    Number(form.watch('reserveSpaceAmount')) * Math.pow(1024, multiplier);

  const reserveSpace = useSContractWrite('FILESTORAGE', {
    enabled: !!(form.formState.isValid && address),
    name: 'reserveSpace',
    args: [address, BigNumber.from(amount)],
  });

  const {
    data: { allow },
    isLoading,
  } = useRoleAccess('FILESTORAGE', 'ALLOCATOR_ROLE');

  return (
    <Card full heading="Filestorage">
      <div className="flex h-full flex-col justify-between">
        <StorageStatus
          className="flex flex-col gap-1"
          occupiedSpace={totalReservedSpace}
          reservedSpace={totalStorageSpace}
        />
        {isLoading ? (
          <></>
        ) : !(allow.eoa && allow.mnm) ? (
          <small>
            <ExclamationTriangleIcon /> To reserve space, assign{' '}
            <code>ALLOCATOR_ROLE</code> to <code>Marionette</code>
          </small>
        ) : (
          <FormProvider {...form}>
            <Dialog
              title={`Reserve file space`}
              open={alertKey === id}
              onOpenChange={(open) => {
                toggleAlert(`${id}`)(open);
              }}
              trigger={
                <center>
                  <button
                    className={tw(
                      'btn btn-wide w-5/6 m-auto',
                      reserveSpace.isLoading ? 'loading' : '',
                    )}
                    disabled={!(allow.eoa || allow.mnm)}
                  >
                    Reserve file space
                  </button>
                </center>
              }
              description={''}
              activeStep={1}
              steps={[
                {
                  onSubmit: form.handleSubmit(
                    (data) => {
                      reserveSpace.writeAsync &&
                        toast
                          .promise(
                            async () => {
                              const response = await reserveSpace.writeAsync(
                                true,
                              );
                              return response;
                            },
                            {
                              pending: 'Reserving space',
                              success: 'Space reserved',
                              error: 'Failed to reserve space',
                            },
                          )
                          .then(() => {
                            form.reset();
                          });
                      toggleAlert(id)(false);
                    },
                    (err) => {
                      console.error(err);
                    },
                  ),
                  content: (
                    <div className="w-2/3 m-auto">
                      <Field<StorageReserveForm>
                        control={() => <input type="text" />}
                        name="reserveSpaceAddress"
                        label="Address"
                        required="Address is invalid"
                      />
                      <div className="grid grid-cols-2">
                        <Field<StorageReserveForm>
                          control={() => (
                            <input type="text" className="border-r-0" />
                          )}
                          name="reserveSpaceAmount"
                          label="Space to reserve"
                          required="Address is invalid"
                          validate={(val) =>
                            !isNaN(Number(val)) || 'Space amount is invalid'
                          }
                        />
                        <Field<StorageReserveForm>
                          control={() => (
                            <select>
                              <option value="kb">kB</option>
                              <option value="mb">MB</option>
                              <option value="gb">GB</option>
                            </select>
                          )}
                          name="reserveSpaceUnit"
                          label="units"
                        />
                      </div>
                    </div>
                  ),
                  actionElement({ className }) {
                    return (
                      <button
                        className={className}
                        disabled={reserveSpace.isLoading || !reserveSpace.write}
                      >
                        Reserve
                      </button>
                    );
                  },
                },
              ]}
            />
          </FormProvider>
        )}
      </div>
    </Card>
  );
}

export default withErrorBoundary(FileStorageReserve);
