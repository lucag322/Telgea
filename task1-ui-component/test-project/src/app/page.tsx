"use client";
import { useState } from "react";
import TopUpForm from "./components/TopUpForm";
import ErrorOverlay from "./components/ui/ErrorOverlay";
import LoadingOverlay from "./components/ui/LoadingOverlay";
import TopUpOptions from "./components/TopUpOptions";
import Button from "./components/ui/Button";
import { topUpPageData } from "@/data";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<
    "form" | "options" | "success"
  >("form");
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  // Supprimons cette ligne puisqu'elle n'est pas utilisée
  // const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Ou utilisons-la pour stocker l'option sélectionnée
  const [selectedTopUp, setSelectedTopUp] = useState<string | null>(null);

  const handlePhoneSubmit = (success: boolean) => {
    if (success) {
      setCurrentStep("options");
    } else {
      setShowError(true);
    }
  };

  const handleErrorRetry = () => {
    setShowError(false);
  };

  const handleOptionSelect = (optionId: string) => {
    // Utilisons la variable ici
    setSelectedTopUp(optionId);
    setIsLoading(true);

    // Simuler une requête API
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep("success");
    }, 2000);
  };

  const handleCancel = () => {
    setCurrentStep("form");
    setSelectedTopUp(null); // Réinitialisons la variable
  };

  const topUpOptions = [
    {
      id: "data5gb",
      title: "+ 5GB Fast Data",
      subtitle: "Home Zone",
    },
    {
      id: "minutes200",
      title: "+ 200 Minutes",
      subtitle: "Home Zone",
    },
    {
      id: "dataInt",
      title: "Get International Data",
      subtitle: "Outside Homezone",
    },
  ];

  return (
    <>
      {isLoading && <LoadingOverlay />}

      {showError && (
        <ErrorOverlay
          title={topUpPageData.error.title}
          message={topUpPageData.error.message}
          buttonText={topUpPageData.error.buttonText}
          onRetry={handleErrorRetry}
        />
      )}

      <div className="w-full max-w-md">
        {currentStep === "form" && <TopUpForm onSubmit={handlePhoneSubmit} />}

        {currentStep === "options" && (
          <TopUpOptions
            userName="Name"
            options={topUpOptions}
            onSelect={handleOptionSelect}
            onCancel={handleCancel}
          />
        )}

        {currentStep === "success" && (
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-2">
              {topUpPageData.success.title}
            </h2>
            <p className="mb-4">
              {topUpPageData.success.message}
              {selectedTopUp &&
                ` (${
                  topUpOptions.find((opt) => opt.id === selectedTopUp)?.title
                })`}
            </p>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => setCurrentStep("form")}
            >
              Done
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
