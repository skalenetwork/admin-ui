import { useEffect } from 'react';

// @ts-ignore
export default function ErrorScreen({ error, resetErrorBoundary }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
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
