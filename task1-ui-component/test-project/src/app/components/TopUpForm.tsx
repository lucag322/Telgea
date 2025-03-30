"use client";
import { useState } from "react";
import PageTitle from "./ui/PageTitle";
import PhoneInput from "./ui/PhoneInput";
import Button from "./ui/Button";
import StepsList from "./ui/StepList";
import LoadingOverlay from "./ui/LoadingOverlay";

import { topUpPageData } from "@/data";

export default function TopUpForm() {
  const [phoneNumber, setPhoneNumber] = useState("34426798");
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

    // Activer l'overlay de chargement
    setIsLoading(true);

    // Simuler une requête API (3 secondes pour voir l'effet)
    setTimeout(() => {
      console.log("Confirmation code sent to", phoneNumber);
      setIsLoading(false);
      // Ici vous pourriez rediriger vers la page suivante ou afficher un message de succès
    }, 3000);
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}

      <div>
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

        <StepsList title={steps.title} steps={steps.items} />
      </div>
    </>
  );
}
