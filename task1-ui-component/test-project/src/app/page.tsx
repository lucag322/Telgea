"use client";
import { useEffect } from "react";
import TopUpForm from "./components/TopUpForm";
import ErrorOverlay from "./components/ui/ErrorOverlay";
import LoadingOverlay from "./components/ui/LoadingOverlay";
import RequestErrorOverlay from "./components/ui/RequestErrorOverlay";
import TopUpOptions from "./components/TopUpOptions";
import { useNavigation } from "./context/NavigationContext";
import { useLoadingError } from "./context/LoadingErrorContext";
import { topUpPageData } from "@/data";
import TopUpDateSelection from "./components/TopUpDateSelector";
import CountrySelector from "./components/CountrySelector";
import InternationalDataOptions from "./components/InternationalDataOptions";
import InternationalDataDateSelector from "./components/InternationalDataDateSelector";
import SuccessConfirmation from "./components/SuccessConfirmation";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import { api, TopUpRequest } from "./services/api";
import { useDataStore } from "./context/DataStoreContext";
import { useUI } from "./context/UIContext";

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
  const { isLoading, error, clearError, setError, withErrorHandling } =
    useLoadingError();

  const { currentStep, navigateTo, goBack, resetNavigation } = useNavigation();

  const {
    selectedOption,
    setSelectedOption,
    selectedCountry,
    setSelectedCountry,
    selectedDataOption,
    setSelectedDataOption,
    activationDate,
    setActivationDate,
    resetData,
  } = useDataStore();

  useHeaderControl(currentStep);

  const handlePhoneSubmit = (success: boolean) => {
    if (success) {
      navigateTo("options");
    } else {
      setError({
        type: "validation",
        message: topUpPageData.error.message,
      });
    }
  };

  const handleOptionSelect = (optionId: string) => {
    const option = topUpPageData.topUpOptions.options.find(
      (opt) => opt.id === optionId
    );
    if (option) {
      setSelectedOption(option);

      if (optionId === "data5gb" || optionId === "minutes200") {
        navigateTo("dateSelect");
      } else if (optionId === "dataInt") {
        navigateTo("countrySelect");
      }
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    navigateTo("internationalDataOptions");
  };

  const handleInternationalDataOptionSelect = (
    option: InternationalDataOption
  ) => {
    setSelectedDataOption(option);
    navigateTo("internationalDateSelect");
  };

  const handleBack = () => {
    goBack();
  };

  const handleRequestTopUp = (date: Date) => {
    setActivationDate(date);

    const payload: TopUpRequest = {
      option: selectedOption?.id,
      country: selectedCountry?.code,
      dataOption: selectedDataOption?.id,
      date: date,
    };

    withErrorHandling(api.requestTopUp(payload), () => navigateTo("success"));
  };

  const handleRequestRetry = () => {
    const payload: TopUpRequest = {
      option: selectedOption?.id,
      country: selectedCountry?.code,
      dataOption: selectedDataOption?.id,
      date: activationDate || undefined,
    };

    withErrorHandling(api.retryTopUp(payload), () => navigateTo("success"));
  };

  const handleReset = () => {
    resetNavigation();
    resetData();
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}

      {error.isError && error.type === "validation" && (
        <ErrorOverlay
          title={topUpPageData.error.title}
          message={error.message || topUpPageData.error.message}
          buttonText={topUpPageData.error.buttonText}
          onRetry={clearError}
        />
      )}

      {error.isError && (error.type === "api" || error.type === "network") && (
        <RequestErrorOverlay
          onRetry={handleRequestRetry}
          onContactSupport={clearError}
        />
      )}

      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <ErrorBoundary>{renderCurrentStep()}</ErrorBoundary>
        </div>
      </div>
    </>
  );

  function renderCurrentStep() {
    switch (currentStep) {
      case "form":
        return <TopUpForm onSubmit={handlePhoneSubmit} />;

      case "options":
        return (
          <TopUpOptions
            userName={topUpPageData.topUpOptions.greeting.replace(
              "{name}",
              "Name"
            )}
            options={topUpPageData.topUpOptions.options}
            onSelect={handleOptionSelect}
          />
        );

      case "dateSelect":
        return selectedOption ? (
          <TopUpDateSelection
            selectedOption={selectedOption}
            onBack={handleBack}
            onRequestTopUp={handleRequestTopUp}
          />
        ) : null;

      case "countrySelect":
        return (
          <CountrySelector onBack={handleBack} onSelect={handleCountrySelect} />
        );

      case "internationalDataOptions":
        return selectedCountry ? (
          <InternationalDataOptions
            selectedCountry={selectedCountry}
            onBack={handleBack}
            onSelectOption={handleInternationalDataOptionSelect}
          />
        ) : null;

      case "internationalDateSelect":
        return selectedCountry && selectedDataOption ? (
          <InternationalDataDateSelector
            selectedCountry={selectedCountry}
            selectedDataOption={selectedDataOption}
            onBack={handleBack}
            onRequestTopUp={handleRequestTopUp}
          />
        ) : null;

      case "success":
        return (
          <SuccessConfirmation
            activationDate={activationDate || undefined}
            onClose={handleReset}
          />
        );

      default:
        return <TopUpForm onSubmit={handlePhoneSubmit} />;
    }
  }
}

function useHeaderControl(currentStep: unknown) {
  const { setShowHeaderCancel, setOnHeaderCancel } = useUI();
  const { goBack } = useNavigation();

  useEffect(() => {
    const showCancel = [
      "options",
      "dateSelect",
      "countrySelect",
      "internationalDataOptions",
      "internationalDateSelect",
    ].includes(currentStep as string);

    setShowHeaderCancel(showCancel);

    if (showCancel) {
      setOnHeaderCancel(() => goBack);
    } else {
      setOnHeaderCancel(null);
    }

    return () => {
      setShowHeaderCancel(false);
      setOnHeaderCancel(null);
    };
  }, [currentStep, setShowHeaderCancel, setOnHeaderCancel, goBack]);
}
