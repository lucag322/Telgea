import React, { useState } from "react";
import Button from "./ui/Button";

interface TopUpOption {
  id: string;
  title: string;
  subtitle: string;
}

interface TopUpOptionsProps {
  userName?: string;
  options: TopUpOption[];
  onSelect: (optionId: string) => void;
  onCancel: () => void;
}

export default function TopUpOptions({
  userName = "Name",
  options,
  onSelect,
  onCancel,
}: TopUpOptionsProps) {
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
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          Cancel <span className="ml-1">×</span>
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-2">Hi {userName}!</h1>

      <p className="text-gray-700 mb-6">
        You can now choose the top-up you want to request for your plan.
      </p>

      <div className="space-y-4 mb-6">
        {options.map((option) => (
          <div
            key={option.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedOption === option.id
                ? "border-black"
                : "border-gray-200 hover:border-gray-400"
            }`}
            onClick={() => handleOptionClick(option.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{option.title}</h3>
                <p className="text-gray-500">{option.subtitle}</p>
              </div>
              {selectedOption === option.id && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z"
                    fill="black"
                  />
                </svg>
              )}
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
