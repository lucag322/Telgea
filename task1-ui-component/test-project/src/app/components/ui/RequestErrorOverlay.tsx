"use client";
import Button from "./Button";

interface RequestErrorOverlayProps {
  onRetry: () => void;
  onContactSupport: () => void;
}

export default function RequestErrorOverlay({
  onRetry,
  onContactSupport,
}: RequestErrorOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center p-2 text-center w-8/10">
        <div className="mb-4">
          <div className="w-12 h-12 rounded-full border-2 border-red-500 flex items-center justify-center">
            <span className="text-red-500 text-2xl font-bold">!</span>
          </div>
        </div>

        <h3 className="text-xl font-medium text-gray-900 mb-1">
          Couldn&apos;t send request
        </h3>

        <p className="text-gray-500 mb-8">Please try again</p>

        <div className="flex gap-3 w-full">
          <Button
            variant="outline"
            size="md"
            className="flex-1 w-1/2"
            onClick={onRetry}
          >
            Try again
          </Button>

          <Button
            variant="primary"
            size="md"
            className="flex-1 bg-black hover:bg-gray-800 whitespace-nowrap w-1/2"
            onClick={onContactSupport}
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
