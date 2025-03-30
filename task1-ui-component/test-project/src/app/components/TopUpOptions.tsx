import React, { useState } from "react";
import Image from "next/image";
import Button from "./ui/Button";
import PageTitle from "./ui/PageTitle";

interface TopUpOption {
  id: string;
  title: string;
  subtitle: string;
}

interface TopUpOptionsProps {
  userName?: string;
  options: TopUpOption[];
  onSelect: (optionId: string) => void;
}

export default function TopUpOptions({ options, onSelect }: TopUpOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleConfirm = () => {
    if (selectedOption) {
      onSelect(selectedOption);
    }
  };

  return (
    <>
      <PageTitle
        title="Hi Theis!"
        description="You can now choose the top-up you want to request for your plan."
      />

      <div className="space-y-4 mb-6">
        {options.map((option) => (
          <div
            key={option.id}
            className={`p-8 border rounded-md bg-custom-white cursor-pointer transition-colors ${
              selectedOption === option.id
                ? "border-black"
                : "border-gray-200 hover:border-gray-400"
            }`}
            onClick={() => handleOptionClick(option.id)}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex-grow text-center">
                <h3 className="font-bold text-lg">{option.title}</h3>
                <p className="text-gray-500">{option.subtitle}</p>
              </div>
              <div className="flex-shrink-0 ml-4 w-6 h-6 flex items-center justify-center">
                {selectedOption === option.id && (
                  <div className="animate-check-appear">
                    <Image
                      src="/check.svg"
                      alt="Selected"
                      width={24}
                      height={24}
                      className="animate-pulse"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="primary"
        size="md"
        fullWidth
        onClick={handleConfirm}
        disabled={!selectedOption}
      >
        Continue
      </Button>
    </>
  );
}
