"use client";
import PageTitle from "./ui/PageTitle";
import DatePicker from "./ui/DatePicker";
import { useState } from "react";

interface TopUpDateSelectionProps {
  selectedOption: {
    id: string;
    title: string;
    subtitle: string;
  };
  onBack: () => void;
  onRequestTopUp: (date: Date) => void;
}

export default function TopUpDateSelection({
  selectedOption,
  onBack,
  onRequestTopUp,
}: TopUpDateSelectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-150px)]">
      <PageTitle title={selectedOption.title} />
      <h2 className="text-secondary-foreground font-bold text-2xl mb-6">
        {selectedOption.subtitle}
      </h2>

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
