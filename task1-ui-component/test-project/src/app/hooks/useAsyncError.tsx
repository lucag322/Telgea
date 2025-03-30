"use client";
import { useState, useCallback } from "react";

export function useAsyncError() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsyncOperation = useCallback(
    async <T,>(
      operation: () => Promise<T>,
      onSuccess?: (result: T) => void,
      onError?: (error: Error) => void
    ): Promise<T | undefined> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await operation();
        setIsLoading(false);
        onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        setIsLoading(false);
        onError?.(error);
        return undefined;
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    isLoading,
    handleAsyncOperation,
    clearError,
  };
}
