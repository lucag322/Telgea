"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type Step =
  | "form"
  | "options"
  | "dateSelect"
  | "countrySelect"
  | "internationalDataOptions"
  | "internationalDateSelect"
  | "success";

// Type du contexte
type UIContextType = {
  showHeaderCancel: boolean;
  setShowHeaderCancel: (show: boolean) => void;
  onHeaderCancel: (() => void) | null;
  setOnHeaderCancel: (callback: (() => void) | null) => void;
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
};

// Création du contexte avec des valeurs par défaut
const UIContext = createContext<UIContextType>({
  showHeaderCancel: false,
  setShowHeaderCancel: () => {},
  onHeaderCancel: null,
  setOnHeaderCancel: () => {},
  currentStep: "form",
  setCurrentStep: () => {},
});

// Hook pour utiliser le contexte
export const useUI = () => useContext(UIContext);

// Fournisseur du contexte
export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [showHeaderCancel, setShowHeaderCancel] = useState(false);
  const [onHeaderCancel, setOnHeaderCancel] = useState<(() => void) | null>(
    null
  );
  const [currentStep, setCurrentStep] = useState<Step>("form");

  return (
    <UIContext.Provider
      value={{
        showHeaderCancel,
        setShowHeaderCancel,
        onHeaderCancel,
        setOnHeaderCancel,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
