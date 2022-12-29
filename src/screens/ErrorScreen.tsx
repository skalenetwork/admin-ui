import { useEffect } from 'react';

export default function ErrorScreen({ error, resetErrorBoundary }) {
  useEffect(() => {
    console.log(error);
  }, [error]);
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
