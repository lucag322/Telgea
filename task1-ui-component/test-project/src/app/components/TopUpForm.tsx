"use client";
import { useState } from "react";
import PageTitle from "./ui/PageTitle";
import PhoneInput from "./ui/PhoneInput";
import Button from "./ui/Button";
import StepsList, { StepItemData } from "./ui/StepList";
import LoadingOverlay from "./ui/LoadingOverlay";
import { topUpPageData } from "@/data";

interface TopUpFormProps {
  onSubmit: (success: boolean) => void;
}

export default function TopUpForm({ onSubmit }: TopUpFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const { pageTitle, phoneInput, button, steps } = topUpPageData;

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);

    if (value.length < 8) {
      setPhoneError(phoneInput.validationError);
    } else {
      setPhoneError(undefined);
    }
  };

  const handleGetCode = () => {
    if (!phoneNumber || phoneNumber.length < 8) {
      setPhoneError(phoneInput.submitError);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      console.log("Confirmation code sent to", phoneNumber);
      setIsLoading(false);

      const isSuccess = Math.random() > 0.2;
      onSubmit(isSuccess);
    }, 2000);
  };

  const stepsData: StepItemData[] = steps.items.map(
    (text: string, index: number) => ({
      number: index + 1,
      title: text,
      description: "",
    })
  );

  return (
    <>
      {isLoading && <LoadingOverlay />}

      <div className="md:pb-4">
        <PageTitle
          title={pageTitle.title}
          highlightedText={pageTitle.highlightedText}
          description={pageTitle.description}
        />

        <PhoneInput
          value={phoneNumber}
          onChange={handlePhoneChange}
          error={phoneError}
        />

        <Button
          variant="primary"
          size="md"
          fullWidth
          disabled={!!phoneError}
          onClick={handleGetCode}
        >
          {button.text}
        </Button>

        <StepsList title={steps.title} steps={stepsData} />
      </div>
    </>
  );
}
