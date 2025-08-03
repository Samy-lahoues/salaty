"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="p-4 text-center">
          <h2>Application Error</h2>
          <p>{error.message}</p>
          <button
            onClick={() => reset()}
            className="mt-4 px-4 py-2 bg-red-500 text-white"
          >
            Retry
          </button>
        </div>
      </body>
    </html>
  );
}
