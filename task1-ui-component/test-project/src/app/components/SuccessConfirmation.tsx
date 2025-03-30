"use client";
import Image from "next/image";
import Button from "./ui/Button";

interface SuccessConfirmationProps {
  activationDate?: Date;
  onClose: () => void;
}

export default function SuccessConfirmation({
  activationDate,
  onClose,
}: SuccessConfirmationProps) {
  const formattedDate = activationDate
    ? activationDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="flex flex-col min-h-[calc(100vh-150px)] justify-between">
      <div className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <div className="mb-8 mt-8">
          <Image
            src="/success.png"
            alt="Success"
            width={64}
            height={64}
            priority
            className="mx-auto"
          />
        </div>

        <h1 className="text-2xl font-bold mb-6">
          That's it! Your top-up request has been sent to your IT team for
          approval.
        </h1>

        <p className="text-gray-600 mb-4">
          You'll be notified by email and SMS when the top-up is active.
        </p>

        <p className="text-gray-600">
          It will be available immediately after approval or at midnight CET on
          your requested activation date.
          {activationDate && ` (${formattedDate})`}
        </p>
      </div>

      <div className="p-6 w-full flex justify-center">
        <Button variant="ghost" size="md" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
