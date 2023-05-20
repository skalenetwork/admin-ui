import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import React from 'react';
import { tw } from 'twind';

export const ErrorMessage = ({
  errors,
  className = '',
}: {
  errors: (React.ReactNode | string)[];
  className?: string;
}) => {
  return !errors?.length || !errors.some((e) => !!e) ? (
    <></>
  ) : (
    <p className={tw('text-sm text-center py-2', className)}>
      <span className="text-[var(--red10)]">
        <ExclamationTriangleIcon />
      </span>{' '}
      {errors.map((error, index) =>
        !!error ? (
          <React.Fragment key={index}>
            {error}
            <br />
          </React.Fragment>
        ) : undefined,
      )}
    </p>
  );
};
