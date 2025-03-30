"use client";
import { useEffect, useState } from "react";
import TopUpForm from "./components/TopUpForm";
import ErrorOverlay from "./components/ui/ErrorOverlay";
import LoadingOverlay from "./components/ui/LoadingOverlay";
import RequestErrorOverlay from "./components/ui/RequestErrorOverlay";
import TopUpOptions from "./components/TopUpOptions";
import { useUI } from "./context/UIContext";
import { topUpPageData } from "@/data";
import TopUpDateSelection from "./components/TopUpDateSelector";
import CountrySelector from "./components/CountrySelector";
import InternationalDataOptions from "./components/InternationalDataOptions";
import InternationalDataDateSelector from "./components/InternationalDataDateSelector";
import SuccessConfirmation from "./components/SuccessConfirmation";

type Step =
  | "form"
  | "options"
  | "dateSelect"
  | "countrySelect"
  | "internationalDataOptions"
  | "internationalDateSelect"
  | "success";

interface Country {
  code: string;
  name: string;
  flag: string;
}

interface InternationalDataOption {
  id: string;
  title: string;
  countryName: string;
}

export default function Home() {
  const [localStep, setLocalStep] = useState<Step>("form");
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showRequestError, setShowRequestError] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{
    id: string;
    title: string;
    subtitle: string;
  } | null>(null);
  const [activationDate, setActivationDate] = useState<Date | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedDataOption, setSelectedDataOption] =
    useState<InternationalDataOption | null>(null);
  const [previousStep, setPreviousStep] = useState<Step>("form");

  const { setShowHeaderCancel, setOnHeaderCancel, setCurrentStep } = useUI();

  const updateStep = (step: Step) => {
    setLocalStep(step);
    setCurrentStep(step);
  };

  useEffect(() => {
    const handleCancel = () => {
      if (localStep === "options") {
        updateStep("form");
      } else if (localStep === "dateSelect") {
        updateStep("options");
      } else if (localStep === "countrySelect") {
        updateStep("options");
      } else if (localStep === "internationalDataOptions") {
        updateStep("countrySelect");
      } else if (localStep === "internationalDateSelect") {
        updateStep("internationalDataOptions");
      }

      if (localStep === "internationalDateSelect") {
        setSelectedDataOption(null);
      } else if (localStep === "internationalDataOptions") {
        setSelectedCountry(null);
      } else if (localStep === "options") {
        setSelectedOption(null);
      }
    };

    if (
      [
        "options",
        "dateSelect",
        "countrySelect",
        "internationalDataOptions",
        "internationalDateSelect",
      ].includes(localStep)
    ) {
      setShowHeaderCancel(true);
      setOnHeaderCancel(() => handleCancel);
    } else {
      setShowHeaderCancel(false);
      setOnHeaderCancel(null);
    }

    return () => {
      setShowHeaderCancel(false);
      setOnHeaderCancel(null);
    };
  }, [localStep, setShowHeaderCancel, setOnHeaderCancel, setCurrentStep]);

  const handlePhoneSubmit = (success: boolean) => {
    if (success) {
      updateStep("options");
    } else {
      setShowError(true);
    }
  };

  const handleErrorRetry = () => {
    setShowError(false);
  };

  const handleOptionSelect = (optionId: string) => {
    const option = topUpOptions.find((opt) => opt.id === optionId);
    if (option) {
      setSelectedOption(option);

      if (optionId === "data5gb" || optionId === "minutes200") {
        updateStep("dateSelect");
      } else if (optionId === "dataInt") {
        updateStep("countrySelect");
      }
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    updateStep("internationalDataOptions");
  };

  const handleInternationalDataOptionSelect = (
    option: InternationalDataOption
  ) => {
    setSelectedDataOption(option);
    updateStep("internationalDateSelect");
  };

  const handleBack = () => {
    if (localStep === "dateSelect") {
      updateStep("options");
    } else if (localStep === "countrySelect") {
      updateStep("options");
    } else if (localStep === "internationalDataOptions") {
      updateStep("countrySelect");
    } else if (localStep === "internationalDateSelect") {
      updateStep("internationalDataOptions");
    } else {
      updateStep("form");
    }
  };

  const handleRequestTopUp = (date: Date) => {
    setActivationDate(date);
    setIsLoading(true);
    setPreviousStep(localStep);

    setTimeout(() => {
      setIsLoading(false);
      const isSuccess = Math.random() > 0.3;

      if (isSuccess) {
        updateStep("success");
      } else {
        setShowRequestError(true);
      }
    }, 2000);
  };

  const handleRequestRetry = () => {
    setShowRequestError(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      updateStep("success");
    }, 1500);
  };

  const handleContactSupport = () => {
    setShowRequestError(false);
  };

  const handleCloseSuccess = () => {
    updateStep("form");
    setSelectedOption(null);
    setSelectedCountry(null);
    setSelectedDataOption(null);
    setActivationDate(null);
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

      {showRequestError && (
        <RequestErrorOverlay
          onRetry={handleRequestRetry}
          onContactSupport={handleContactSupport}
        />
      )}

      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          {localStep === "form" && <TopUpForm onSubmit={handlePhoneSubmit} />}

          {localStep === "options" && (
            <TopUpOptions
              userName="Name"
              options={topUpOptions}
              onSelect={handleOptionSelect}
            />
          )}

          {localStep === "dateSelect" && selectedOption && (
            <TopUpDateSelection
              selectedOption={selectedOption}
              onBack={handleBack}
              onRequestTopUp={handleRequestTopUp}
            />
          )}

          {localStep === "countrySelect" && (
            <CountrySelector
              onBack={handleBack}
              onSelect={handleCountrySelect}
            />
          )}

          {localStep === "internationalDataOptions" && selectedCountry && (
            <InternationalDataOptions
              selectedCountry={selectedCountry}
              onBack={handleBack}
              onSelectOption={handleInternationalDataOptionSelect}
            />
          )}

          {localStep === "internationalDateSelect" &&
            selectedCountry &&
            selectedDataOption && (
              <InternationalDataDateSelector
                selectedCountry={selectedCountry}
                selectedDataOption={selectedDataOption}
                onBack={handleBack}
                onRequestTopUp={handleRequestTopUp}
              />
            )}

          {localStep === "success" && (
            <SuccessConfirmation
              activationDate={activationDate || undefined}
              onClose={handleCloseSuccess}
            />
          )}
        </div>
      </div>
    </>
  );
}
