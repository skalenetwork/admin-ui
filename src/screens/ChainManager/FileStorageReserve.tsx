import AlertDialog from '@/components/AlertDialog/AlertDialog';
import Card from '@/components/Card/Card';
import Progress from '@/components/Progress/Progress';
import prettyBytes from 'pretty-bytes';
import { useEffect, useMemo, useState } from 'react';

import type { WidgetWithAlertProps } from './types';

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

export default function FileStorageReserve({
  id,
  alertKey,
  toggleAlert,
}: WidgetWithAlertProps) {
  return (
    <Card full heading="Filestorage">
      <div className="flex h-full flex-col justify-around">
        <StorageStatus className="" occupiedSpace={500} reservedSpace={1000} />
        <center>
          <AlertDialog
            open={alertKey === id}
            onOpenChange={toggleAlert(id)}
            trigger={
              <button className="btn btn-wide w-5/6">Reserve file space</button>
            }
            title={`Reserve file space`}
            description={<p>Please confirm this action</p>}
            onAction={async () => {
              return {
                status: 'success',
              };
            }}
          />
        </center>
      </div>
    </Card>
  );
}
