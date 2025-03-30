"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";
import Button from "./Button";
import Image from "next/image";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error);
    console.error("Component stack:", errorInfo.componentStack);
  }

  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
          <div className="flex flex-col items-center justify-center p-8 text-center max-w-md">
            <div className="mb-6">
              <Image
                src="/error_icon.svg"
                alt="Error"
                width={56}
                height={56}
                priority
              />
            </div>

            <h3 className="text-xl font-medium text-gray-900 mb-1">
              Something went wrong
            </h3>

            <p className="text-gray-500 mb-2">
              We&apos;re sorry, but we encountered an unexpected error.
            </p>

            <p className="text-sm text-gray-400 mb-6 max-w-xs overflow-hidden">
              {this.state.error?.message || "Unknown error"}
            </p>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={this.resetErrorBoundary}
              >
                Try again
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={() => window.location.reload()}
              >
                Reload page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
