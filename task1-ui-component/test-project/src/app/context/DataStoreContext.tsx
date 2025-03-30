"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface TopUpOption {
  id: string;
  title: string;
  subtitle: string;
}

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

interface DataStoreContextType {
  selectedOption: TopUpOption | null;
  setSelectedOption: (option: TopUpOption | null) => void;
  selectedCountry: Country | null;
  setSelectedCountry: (country: Country | null) => void;
  selectedDataOption: InternationalDataOption | null;
  setSelectedDataOption: (option: InternationalDataOption | null) => void;
  activationDate: Date | null;
  setActivationDate: (date: Date | null) => void;
  resetData: () => void;
}

const DataStoreContext = createContext<DataStoreContextType | undefined>(
  undefined
);

export const DataStoreProvider = ({ children }: { children: ReactNode }) => {
  const [selectedOption, setSelectedOption] = useState<TopUpOption | null>(
    null
  );
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedDataOption, setSelectedDataOption] =
    useState<InternationalDataOption | null>(null);
  const [activationDate, setActivationDate] = useState<Date | null>(null);

  const resetData = useCallback(() => {
    setSelectedOption(null);
    setSelectedCountry(null);
    setSelectedDataOption(null);
    setActivationDate(null);
  }, []);

  return (
    <DataStoreContext.Provider
      value={{
        selectedOption,
        setSelectedOption,
        selectedCountry,
        setSelectedCountry,
        selectedDataOption,
        setSelectedDataOption,
        activationDate,
        setActivationDate,
        resetData,
      }}
    >
      {children}
    </DataStoreContext.Provider>
  );
};

export const useDataStore = () => {
  const context = useContext(DataStoreContext);
  if (context === undefined) {
    throw new Error("useDataStore must be used within a DataStoreProvider");
  }
  return context;
};
