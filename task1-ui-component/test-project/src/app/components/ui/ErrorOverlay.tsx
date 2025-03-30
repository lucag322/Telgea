import React from "react";
import Image from "next/image";
import Button from "./Button";

interface ErrorOverlayProps {
  title?: string;
  message?: string;
  buttonText?: string;
  onRetry: () => void;
}

export default function ErrorOverlay({
  title = "Couldn't verify code",
  message = "Please try again",
  buttonText = "Try again",
  onRetry,
}: ErrorOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
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

        <h3 className="text-xl font-medium text-gray-900 mb-1">{title}</h3>

        <p className="text-gray-500 mb-6">{message}</p>

        <Button variant="outline" size="md" onClick={onRetry} className="w-40">
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
