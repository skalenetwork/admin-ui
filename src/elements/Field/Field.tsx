import React, { PropsWithChildren } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { withErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

type Props<T extends FieldValues> = PropsWithChildren<{
  className?: string;
  name: keyof T;
  label: string;
  placeholder?: string;
  control: () => JSX.Element;
}> &
  Parameters<ReturnType<typeof useFormContext>['register']>['1'];

function Field<T extends FieldValues>({
  className,
  name,
  label,
  control,
  placeholder,
  children,
  ...rest
}: Props<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  return (
    <>
      <fieldset className={`m-0 w-full ${className}`}>
        <label>
          {label} {rest.required && ' *'}
        </label>
        {React.cloneElement(control(), {
          placeholder,
          ...register(name, {
            ...rest,
          }),
        })}
        <div
          className={`p-0.5 text-right text-xs text-[var(--red10)] ${
            !error ? 'opacity-0' : ''
          }`}
        >
          {error ? <>{error?.message}</> : '-'}
        </div>
        {children}
      </fieldset>
    </>
  );
}

export default withErrorBoundary(Field);
