"use client";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

export type StepRoute =
  | "form"
  | "options"
  | "dateSelect"
  | "countrySelect"
  | "internationalDataOptions"
  | "internationalDateSelect"
  | "success";

interface NavigationContextType {
  currentStep: StepRoute;
  navigateTo: (step: StepRoute) => void;
  goBack: () => void;
  resetNavigation: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<StepRoute>("form");
  const [history, setHistory] = useState<StepRoute[]>([]);
  const router = useRouter();

  // Routes pour les URLs
  const routePaths: Record<StepRoute, string> = {
    form: "/",
    options: "/options",
    dateSelect: "/date-selection",
    countrySelect: "/country-selection",
    internationalDataOptions: "/international-data",
    internationalDateSelect: "/international-date",
    success: "/success",
  };

  const navigateTo = useCallback(
    (step: StepRoute) => {
      if (step !== currentStep) {
        setHistory((prev) => [...prev, currentStep]);
        setCurrentStep(step);
        router.push(routePaths[step]);
      }
    },
    [currentStep, router]
  );

  const goBack = useCallback(() => {
    if (history.length > 0) {
      const newHistory = [...history];
      const previousStep = newHistory.pop() || "form";
      setHistory(newHistory);
      setCurrentStep(previousStep);
      router.push(routePaths[previousStep]);
    }
  }, [history, router]);

  const resetNavigation = useCallback(() => {
    setCurrentStep("form");
    setHistory([]);
    router.push(routePaths.form);
  }, [router]);

  return (
    <NavigationContext.Provider
      value={{
        currentStep,
        navigateTo,
        goBack,
        resetNavigation,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
