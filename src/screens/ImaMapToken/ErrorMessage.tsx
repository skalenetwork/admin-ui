import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export const ErrorMessage = ({
  errors,
}: {
  errors: (React.ReactNode | string)[];
}) => {
  return !errors?.length || !errors.some((e) => !!e) ? (
    <></>
  ) : (
    <p className="text-sm text-center">
      <span className="text-[var(--red10)]">
        <ExclamationTriangleIcon />
      </span>{' '}
      {errors.map((error) => (
        <>
          {error}
          <br />
        </>
      ))}
    </p>
  );
};
