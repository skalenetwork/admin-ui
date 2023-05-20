import { withErrorBoundary as _withErrorBoundary } from 'react-error-boundary';

// @ts-ignore
export default function ErrorScreen({ error, resetErrorBoundary }) {
  return (
    <div
      role="alert"
      className="flex h-full w-full flex-col items-center justify-center gap-4"
    >
      <p>
        <span className="inline-block rotate-90">✈️</span> Something went wrong,
        but it's probably okay..
      </p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary} className="btn btn-outline">
        Try again
      </button>
    </div>
  );
}

export function withErrorBoundary<T>(Component: T) {
  return _withErrorBoundary(Component as React.ComponentType<T>, {
    FallbackComponent: ErrorScreen,
  }) as T;
}
