"use client";
import Image from "next/image";
import Button from "./ui/Button";
import { topUpPageData } from "@/data";

interface SuccessConfirmationProps {
  activationDate?: Date;
  onClose: () => void;
}

export default function SuccessConfirmation({
  activationDate,
  onClose,
}: SuccessConfirmationProps) {
  const { success, button } = topUpPageData;

  const formattedDate = activationDate
    ? activationDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const successMessage = formattedDate
    ? success.withDate.replace("{date}", formattedDate)
    : success.message;

  return (
    <div className="flex flex-col min-h-[calc(100vh-150px)] justify-between">
      <div className="flex-grow flex flex-col items-center justify-center text-center">
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

        <h1 className="text-3xl font-bold mb-6">{success.title}</h1>
        <div className="px-8">
          <p className="mb-4">{success.subtitle}</p>

          <p>{success.description}</p>
        </div>
      </div>

      <div className="p-6 w-full flex justify-center">
        <Button variant="ghost" size="md" onClick={onClose}>
          {button.doneText}
        </Button>
      </div>
    </div>
  );
}
