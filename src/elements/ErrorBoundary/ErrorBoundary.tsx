import { withErrorBoundary as _withErrorBoundary } from 'react-error-boundary';

// @ts-ignore
export default function ErrorScreen({ error, resetErrorBoundary }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center w-full h-full gap-4"
    >
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export function withErrorBoundary(Component: ReturnType<typeof _withErrorBoundary> ) {
  return _withErrorBoundary(Component, {
    FallbackComponent: ErrorScreen,
  }) as typeof Component;
};