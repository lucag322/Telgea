"use client";
import { useEffect, useCallback, useMemo, memo } from "react";
import TopUpForm from "./TopUpForm";
import ErrorOverlay from "./ui/ErrorOverlay";
import LoadingOverlay from "./ui/LoadingOverlay";
import RequestErrorOverlay from "./ui/RequestErrorOverlay";
import TopUpOptions from "./TopUpOptions";
import { useNavigation } from "../context/NavigationContext";
import { useLoadingError } from "../context/LoadingErrorContext";
import { topUpPageData } from "@/data";
import TopUpDateSelection from "./TopUpDateSelector";
import CountrySelector from "./CountrySelector";
import InternationalDataOptions from "./InternationalDataOptions";
import InternationalDataDateSelector from "./InternationalDataDateSelector";
import SuccessConfirmation from "./SuccessConfirmation";
import ErrorBoundary from "./ui/ErrorBoundary";
import { api, TopUpRequest } from "../services/api";
import { useDataStore } from "../context/DataStoreContext";
import { useUI } from "../context/UIContext";

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

const MemoTopUpForm = memo(TopUpForm);
const MemoTopUpOptions = memo(TopUpOptions);
const MemoTopUpDateSelection = memo(TopUpDateSelection);
const MemoCountrySelector = memo(CountrySelector);
const MemoInternationalDataOptions = memo(InternationalDataOptions);
const MemoInternationalDataDateSelector = memo(InternationalDataDateSelector);
const MemoSuccessConfirmation = memo(SuccessConfirmation);

function useHeaderControl(currentStep: unknown) {
  const { setShowHeaderCancel, setOnHeaderCancel } = useUI();
  const { goBack } = useNavigation();

  const shouldShowCancel = useMemo(() => {
    return [
      "options",
      "dateSelect",
      "countrySelect",
      "internationalDataOptions",
      "internationalDateSelect",
    ].includes(currentStep as string);
  }, [currentStep]);

  useEffect(() => {
    setShowHeaderCancel(shouldShowCancel);

    if (shouldShowCancel) {
      setOnHeaderCancel(() => goBack);
    } else {
      setOnHeaderCancel(null);
    }

    return () => {
      setShowHeaderCancel(false);
      setOnHeaderCancel(null);
    };
  }, [shouldShowCancel, setShowHeaderCancel, setOnHeaderCancel, goBack]);
}

function FormStep() {
  const { navigateTo } = useNavigation();
  const { setError } = useLoadingError();

  const handlePhoneSubmit = useCallback(
    (success: boolean) => {
      if (success) {
        navigateTo("options");
      } else {
        setError({
          type: "validation",
          message: topUpPageData.error.message,
        });
      }
    },
    [navigateTo, setError]
  );

  return <MemoTopUpForm onSubmit={handlePhoneSubmit} />;
}
FormStep.displayName = "FormStep";
const MemoFormStep = memo(FormStep);

function OptionsStep() {
  const { navigateTo } = useNavigation();
  const { setSelectedOption } = useDataStore();

  const handleOptionSelect = useCallback(
    (optionId: string) => {
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
    },
    [navigateTo, setSelectedOption]
  );

  const userName = useMemo(() => {
    return topUpPageData.topUpOptions.greeting.replace("{name}", "Name");
  }, []);

  return (
    <MemoTopUpOptions
      userName={userName}
      options={topUpPageData.topUpOptions.options}
      onSelect={handleOptionSelect}
    />
  );
}
OptionsStep.displayName = "OptionsStep";
const MemoOptionsStep = memo(OptionsStep);

function DateSelectionStep() {
  const { goBack, navigateTo } = useNavigation();
  const { selectedOption, setActivationDate } = useDataStore();
  const { withErrorHandling } = useLoadingError();

  const handleRequestTopUp = useCallback(
    (date: Date) => {
      setActivationDate(date);

      const payload: TopUpRequest = {
        option: selectedOption?.id,
        date: date,
      };

      withErrorHandling(api.requestTopUp(payload), () => navigateTo("success"));
    },
    [selectedOption, setActivationDate, withErrorHandling, navigateTo]
  );

  if (!selectedOption) return null;

  return (
    <MemoTopUpDateSelection
      selectedOption={selectedOption}
      onBack={goBack}
      onRequestTopUp={handleRequestTopUp}
    />
  );
}
DateSelectionStep.displayName = "DateSelectionStep";
const MemoDateSelectionStep = memo(DateSelectionStep);

function CountrySelectorStep() {
  const { goBack, navigateTo } = useNavigation();
  const { setSelectedCountry } = useDataStore();

  const handleCountrySelect = useCallback(
    (country: Country) => {
      setSelectedCountry(country);
      navigateTo("internationalDataOptions");
    },
    [setSelectedCountry, navigateTo]
  );

  return <MemoCountrySelector onBack={goBack} onSelect={handleCountrySelect} />;
}
CountrySelectorStep.displayName = "CountrySelectorStep";
const MemoCountrySelectorStep = memo(CountrySelectorStep);

function InternationalDataStep() {
  const { goBack, navigateTo } = useNavigation();
  const { selectedCountry, setSelectedDataOption } = useDataStore();

  const handleOptionSelect = useCallback(
    (option: InternationalDataOption) => {
      setSelectedDataOption(option);
      navigateTo("internationalDateSelect");
    },
    [setSelectedDataOption, navigateTo]
  );

  if (!selectedCountry) return null;

  return (
    <MemoInternationalDataOptions
      selectedCountry={selectedCountry}
      onBack={goBack}
      onSelectOption={handleOptionSelect}
    />
  );
}
InternationalDataStep.displayName = "InternationalDataStep";
const MemoInternationalDataStep = memo(InternationalDataStep);

function InternationalDateStep() {
  const { goBack, navigateTo } = useNavigation();
  const { selectedCountry, selectedDataOption, setActivationDate } =
    useDataStore();
  const { withErrorHandling } = useLoadingError();

  const handleRequestTopUp = useCallback(
    (date: Date) => {
      setActivationDate(date);

      const payload: TopUpRequest = {
        country: selectedCountry?.code,
        dataOption: selectedDataOption?.id,
        date: date,
      };

      withErrorHandling(api.requestTopUp(payload), () => navigateTo("success"));
    },
    [
      selectedCountry,
      selectedDataOption,
      setActivationDate,
      withErrorHandling,
      navigateTo,
    ]
  );

  if (!selectedCountry || !selectedDataOption) return null;

  return (
    <MemoInternationalDataDateSelector
      selectedCountry={selectedCountry}
      selectedDataOption={selectedDataOption}
      onBack={goBack}
      onRequestTopUp={handleRequestTopUp}
    />
  );
}
InternationalDateStep.displayName = "InternationalDateStep";
const MemoInternationalDateStep = memo(InternationalDateStep);

function SuccessStep() {
  const { resetNavigation } = useNavigation();
  const { activationDate, resetData } = useDataStore();

  const handleReset = useCallback(() => {
    resetNavigation();
    resetData();
  }, [resetNavigation, resetData]);

  return (
    <MemoSuccessConfirmation
      activationDate={activationDate || undefined}
      onClose={handleReset}
    />
  );
}
SuccessStep.displayName = "SuccessStep";
const MemoSuccessStep = memo(SuccessStep);

function StepRouter({ currentStep }: { currentStep: string }) {
  switch (currentStep) {
    case "form":
      return <MemoFormStep />;
    case "options":
      return <MemoOptionsStep />;
    case "dateSelect":
      return <MemoDateSelectionStep />;
    case "countrySelect":
      return <MemoCountrySelectorStep />;
    case "internationalDataOptions":
      return <MemoInternationalDataStep />;
    case "internationalDateSelect":
      return <MemoInternationalDateStep />;
    case "success":
      return <MemoSuccessStep />;
    default:
      return <MemoFormStep />;
  }
}
StepRouter.displayName = "StepRouter";
const MemoStepRouter = memo(StepRouter);

export default function Home() {
  const { isLoading, error, clearError, withErrorHandling } = useLoadingError();
  const { currentStep, navigateTo } = useNavigation();
  const {
    selectedOption,
    selectedCountry,
    selectedDataOption,
    activationDate,
  } = useDataStore();

  useHeaderControl(currentStep);

  const handleRequestRetry = useCallback(() => {
    const payload: TopUpRequest = {
      option: selectedOption?.id,
      country: selectedCountry?.code,
      dataOption: selectedDataOption?.id,
      date: activationDate || undefined,
    };

    withErrorHandling(api.retryTopUp(payload), () => navigateTo("success"));
  }, [
    selectedOption,
    selectedCountry,
    selectedDataOption,
    activationDate,
    withErrorHandling,
    navigateTo,
  ]);

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
          <ErrorBoundary>
            <MemoStepRouter currentStep={currentStep} />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}
