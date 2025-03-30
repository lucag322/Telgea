"use client";
import { useState } from "react";
import PageTitle from "./ui/PageTitle";
import DatePicker from "./ui/DatePicker";
import Image from "next/image";

interface InternationalDataDateSelectorProps {
  selectedCountry: {
    code: string;
    name: string;
    flag: string;
  };
  selectedDataOption: {
    id: string;
    title: string;
    countryName: string;
  };
  onBack: () => void;
  onRequestTopUp: (date: Date) => void;
}

export default function InternationalDataDateSelector({
  selectedCountry,
  selectedDataOption,
  onBack,
  onRequestTopUp,
}: InternationalDataDateSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-150px)]">
      <div>
        <PageTitle title="Top up International Data" />

        <div className="flex items-center mb-4">
          <div className="w-8 h-8 mr-3 overflow-hidden rounded-full">
            <Image
              src={selectedCountry.flag}
              alt={`${selectedCountry.name} flag`}
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <span className="font-medium">{selectedCountry.name}</span>
        </div>

        <h2 className="text-xl font-bold mb-6">
          Add {selectedDataOption.title}
        </h2>
      </div>

      <div className="flex-1 flex flex-col">
        <DatePicker
          onSelect={setSelectedDate}
          onBack={onBack}
          onConfirm={onRequestTopUp}
        />
      </div>
    </div>
  );
}
