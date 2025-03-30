"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

export type ErrorType = "validation" | "network" | "api" | "unknown";

interface ErrorDetails {
  name?: string;
  code?: string;
  status?: number;
  message?: string;
}

interface ErrorState {
  isError: boolean;
  type: ErrorType | null;
  message: string | null;
  details?: ErrorDetails;
}

interface LoadingErrorContextType {
  isLoading: boolean;
  error: ErrorState;
  setLoading: (loading: boolean) => void;
  setError: (error: Partial<ErrorState>) => void;
  clearError: () => void;
  withLoading: <T>(promise: Promise<T>) => Promise<T>;
  withErrorHandling: <T>(
    promise: Promise<T>,
    onSuccess?: () => void
  ) => Promise<T | undefined>;
}

const initialErrorState: ErrorState = {
  isError: false,
  type: null,
  message: null,
  details: undefined,
};

const LoadingErrorContext = createContext<LoadingErrorContextType | undefined>(
  undefined
);

export const LoadingErrorProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<ErrorState>(initialErrorState);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const setError = useCallback((newError: Partial<ErrorState>) => {
    setErrorState({
      ...initialErrorState,
      isError: true,
      ...newError,
    });
  }, []);

  const clearError = useCallback(() => {
    setErrorState(initialErrorState);
  }, []);

  const withLoading = useCallback(
    async <T,>(promise: Promise<T>): Promise<T> => {
      setLoading(true);
      try {
        const result = await promise;
        return result;
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const withErrorHandling = useCallback(
    async <T,>(
      promise: Promise<T>,
      onSuccess?: () => void
    ): Promise<T | undefined> => {
      setLoading(true);
      clearError();

      try {
        const result = await promise;
        if (onSuccess) onSuccess();
        return result;
      } catch (err: unknown) {
        const error = err as Error;
        const errorType: ErrorType =
          error.name === "NetworkError" ? "network" : "api";

        const errorDetails: ErrorDetails = {
          name: error.name,
          message: error.message,
        };

        if (typeof err === "object" && err !== null) {
          const errorObj = err as Record<string, unknown>;
          if ("code" in errorObj && typeof errorObj.code === "string") {
            errorDetails.code = errorObj.code;
          }
          if ("status" in errorObj && typeof errorObj.status === "number") {
            errorDetails.status = errorObj.status;
          }
        }

        setError({
          type: errorType,
          message: error.message || "An unexpected error occurred",
          details: errorDetails,
        });
        return undefined;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, clearError, setError]
  );

  return (
    <LoadingErrorContext.Provider
      value={{
        isLoading,
        error: errorState,
        setLoading,
        setError,
        clearError,
        withLoading,
        withErrorHandling,
      }}
    >
      {children}
    </LoadingErrorContext.Provider>
  );
};

export const useLoadingError = () => {
  const context = useContext(LoadingErrorContext);
  if (context === undefined) {
    throw new Error(
      "useLoadingError must be used within a LoadingErrorProvider"
    );
  }
  return context;
};
