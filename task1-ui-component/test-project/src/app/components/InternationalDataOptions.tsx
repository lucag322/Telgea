"use client";
import { useState } from "react";
import Button from "./ui/Button";
import PageTitle from "./ui/PageTitle";
import Image from "next/image";

interface InternationalDataOption {
  id: string;
  title: string;
  countryName: string;
}

interface InternationalDataOptionsProps {
  selectedCountry: {
    code: string;
    name: string;
    flag: string;
  };
  onBack: () => void;
  onSelectOption: (option: InternationalDataOption) => void;
}

export default function InternationalDataOptions({
  selectedCountry,
  onSelectOption,
}: InternationalDataOptionsProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const dataOptions: InternationalDataOption[] = [
    {
      id: "1gb",
      title: "+ 1GB Fast Data",
      countryName: selectedCountry.name,
    },
    {
      id: "5gb",
      title: "+ 5GB Fast Data",
      countryName: selectedCountry.name,
    },
  ];

  const handleOptionClick = (optionId: string) => {
    setSelectedOptionId(optionId);
  };

  const handleConfirm = () => {
    if (selectedOptionId) {
      const selectedOption = dataOptions.find(
        (option) => option.id === selectedOptionId
      );
      if (selectedOption) {
        onSelectOption(selectedOption);
      }
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-150px)]">
      <div>
        <PageTitle title="Top up International Data" />

        <div className="flex items-center mb-6">
          <div className="w-12 h-12 mr-3 overflow-hidden rounded-full">
            <Image
              src={selectedCountry.flag}
              alt={`${selectedCountry.name} flag`}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <span className="text-xl font-medium">{selectedCountry.name}</span>
        </div>
        <p className="text-base mb-8">
          How much data do you want to add?
          <br />
          The data will be active until the end of the month.
        </p>

        <div className="space-y-4 mb-10">
          {dataOptions.map((option) => (
            <div
              key={option.id}
              className={`p-8 border rounded-md bg-custom-white cursor-pointer transition-colors ${
                selectedOptionId === option.id
                  ? "border-black"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              onClick={() => handleOptionClick(option.id)}
            >
              <div className="flex flex-col items-center text-center">
                <h3 className="font-bold text-lg">{option.title}</h3>
                <p className="text-gray-500">{option.countryName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto py-5">
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={handleConfirm}
          disabled={!selectedOptionId}
        >
          Request Top-up
        </Button>
      </div>
    </div>
  );
}
