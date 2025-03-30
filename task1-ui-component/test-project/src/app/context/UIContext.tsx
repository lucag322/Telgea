"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

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

interface TopUpOption {
  id: string;
  title: string;
  subtitle: string;
}

type UIContextType = {
  showHeaderCancel: boolean;
  setShowHeaderCancel: (show: boolean) => void;
  onHeaderCancel: (() => void) | null;
  setOnHeaderCancel: (callback: (() => void) | null) => void;
  currentStep: Step;
  navigateTo: (step: Step) => void;
  selectedOption: TopUpOption | null;
  setSelectedOption: (option: TopUpOption | null) => void;
  selectedCountry: Country | null;
  setSelectedCountry: (country: Country | null) => void;
  selectedDataOption: InternationalDataOption | null;
  setSelectedDataOption: (option: InternationalDataOption | null) => void;
  activationDate: Date | null;
  setActivationDate: (date: Date | null) => void;
  resetFlow: () => void;
};

const UIContext = createContext<UIContextType>({
  showHeaderCancel: false,
  setShowHeaderCancel: () => {},
  onHeaderCancel: null,
  setOnHeaderCancel: () => {},
  currentStep: "form",
  navigateTo: () => {},
  selectedOption: null,
  setSelectedOption: () => {},
  selectedCountry: null,
  setSelectedCountry: () => {},
  selectedDataOption: null,
  setSelectedDataOption: () => {},
  activationDate: null,
  setActivationDate: () => {},
  resetFlow: () => {},
});

export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [showHeaderCancel, setShowHeaderCancel] = useState(false);
  const [onHeaderCancel, setOnHeaderCancel] = useState<(() => void) | null>(
    null
  );
  const [currentStep, setCurrentStep] = useState<Step>("form");
  const [selectedOption, setSelectedOption] = useState<TopUpOption | null>(
    null
  );
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedDataOption, setSelectedDataOption] =
    useState<InternationalDataOption | null>(null);
  const [activationDate, setActivationDate] = useState<Date | null>(null);

  const navigateTo = useCallback((step: Step) => {
    setCurrentStep(step);
  }, []);

  const resetFlow = useCallback(() => {
    setCurrentStep("form");
    setSelectedOption(null);
    setSelectedCountry(null);
    setSelectedDataOption(null);
    setActivationDate(null);
  }, []);

  return (
    <UIContext.Provider
      value={{
        showHeaderCancel,
        setShowHeaderCancel,
        onHeaderCancel,
        setOnHeaderCancel,
        currentStep,
        navigateTo,
        selectedOption,
        setSelectedOption,
        selectedCountry,
        setSelectedCountry,
        selectedDataOption,
        setSelectedDataOption,
        activationDate,
        setActivationDate,
        resetFlow,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
