import React from "react";
import Image from "next/image";
import { topUpPageData } from "@/data";

interface LoadingOverlayProps {
  message?: string;
  subMessage?: string;
}

export default function LoadingOverlay({
  message = topUpPageData.loading.title,
  subMessage = topUpPageData.loading.subtitle,
}: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-6 animate-spin">
          <Image
            src="/mingcute_loading-fill.svg"
            alt="Loading"
            width={52}
            height={52}
            priority
          />
        </div>

        <h3 className="text-xl font-medium text-gray-900 mb-1">{message}</h3>

        <p className="text-gray-500">{subMessage}</p>
      </div>
    </div>
  );
}