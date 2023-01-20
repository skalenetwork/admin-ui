import React from 'react';
import { useFormContext } from 'react-hook-form';
import { withErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  control: () => JSX.Element;
} & Parameters<ReturnType<typeof useFormContext>['register']>['1'];

function Field({ name, label, control, placeholder, ...rest }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <>
      <fieldset className="m-0 w-max">
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
      </fieldset>
    </>
  );
}

export default withErrorBoundary(Field);
