import React, { BaseSyntheticEvent, PropsWithChildren } from 'react';
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from 'react-hook-form';

import { withErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

type Props<T extends FieldValues> = PropsWithChildren<{
  className?: string;
  name: keyof T;
  label: string;
  placeholder?: string;
  control: (props: ControllerRenderProps) => JSX.Element;
}> &
  Parameters<ReturnType<typeof useFormContext>['register']>['1'];

function Field<T extends FieldValues>({
  className = '',
  name,
  label,
  control,
  placeholder,
  disabled,
  setValueAs,
  valueAsDate,
  valueAsNumber,
  children,
  ...rest
}: Props<T>) {
  const {
    register,
    control: formControl,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  const transformValue = (value: any) => {
    return valueAsNumber
      ? Number(value)
      : valueAsDate
      ? new Date(value)
      : setValueAs
      ? setValueAs(value)
      : value;
  };

  return (
    <>
      <fieldset className={`m-0 w-full ${className}`}>
        <label>
          {label} {rest.required && ' *'}
        </label>
        <Controller
          name={name}
          rules={{ ...rest }}
          render={({ field, fieldState }) =>
            React.cloneElement(control(field), {
              placeholder,
              onBlur: field.onBlur,
              onChange: (e: string | boolean | number | BaseSyntheticEvent) => {
                field.onChange(
                  transformValue(typeof e === 'object' ? e.target.value : e),
                );
              },
              ref: field.ref,
              value: field.value,
              disabled,
              'data-error': error || undefined,
            })
          }
        />
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
