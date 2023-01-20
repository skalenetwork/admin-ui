import { withErrorBoundary as _withErrorBoundary } from 'react-error-boundary';

// @ts-ignore
export default function ErrorScreen({ error, resetErrorBoundary }) {
  return (
    <div
      role="alert"
      className="flex h-full w-full flex-col items-center justify-center gap-4"
    >
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export function withErrorBoundary<T>(Component: T) {
  return _withErrorBoundary(Component as React.ComponentType<T>, {
    FallbackComponent: ErrorScreen,
  }) as T;
}
