/**
 * @description A featured form field around react-hook-form
 */

import { EraserIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
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
  label?: string;
  placeholder?: string;
  control: (props: ControllerRenderProps) => JSX.Element;
  showResetter?: boolean;
}> &
  Parameters<ReturnType<typeof useFormContext>['register']>['1'];

function Field<T extends FieldValues>({
  className = '',
  name,
  label,
  control,
  showResetter,
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
    formState: { errors, defaultValues },
    resetField,
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
        {label && (
          <label className="flex flex-row">
            <span>
              {label} {rest.required && ' *'}
            </span>
            {showResetter && (
              <button
                className="ml-auto text-[var(--gray10)]"
                onClick={(e) => {
                  e.preventDefault();
                  resetField(name, {
                    defaultValue: defaultValues?.[name],
                  });
                }}
              >
                <EraserIcon />
              </button>
            )}
          </label>
        )}
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
          {error ? (
            <>
              {error?.message} <ExclamationTriangleIcon className="w-4" />
            </>
          ) : (
            '-'
          )}
        </div>
        {children}
      </fieldset>
    </>
  );
}

export default withErrorBoundary(Field);
