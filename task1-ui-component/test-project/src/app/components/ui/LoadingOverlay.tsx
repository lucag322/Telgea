import React from "react";

interface LoadingOverlayProps {
  message?: string;
  subMessage?: string;
}

export default function LoadingOverlay({
  message = "Sending confirmation code...",
  subMessage = "Please wait",
}: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center p-8 text-center">
        {/* Spinner animé avec la couleur verte */}
        <div className="relative h-16 w-16 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-[#e0ff4f] border-t-transparent animate-spin"></div>
        </div>

        {/* Message principal */}
        <h3 className="text-xl font-medium text-gray-900 mb-1">{message}</h3>

        {/* Message secondaire */}
        <p className="text-gray-500">{subMessage}</p>
      </div>
    </div>
  );
}
