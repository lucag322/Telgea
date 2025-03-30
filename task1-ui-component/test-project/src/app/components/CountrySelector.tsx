"use client";
import { useState } from "react";
import Button from "./ui/Button";
import PageTitle from "./ui/PageTitle";
import Image from "next/image";

interface Country {
  code: string;
  name: string;
  flag: string;
}

interface CountrySelectorProps {
  onBack: () => void;
  onSelect: (country: Country) => void;
}

export default function CountrySelector({
  onBack,
  onSelect,
}: CountrySelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const countries: Country[] = [
    { code: "dk", name: "Denmark", flag: "/flags/denmark.svg" },
    { code: "se", name: "Sweden", flag: "/flags/sweden.svg" },
    { code: "no", name: "Norway", flag: "/flags/norway.svg" },
    { code: "de", name: "Germany", flag: "/flags/germany.svg" },
    { code: "fr", name: "France", flag: "/flags/france.svg" },
  ];

  const filteredCountries = searchQuery
    ? countries.filter((country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : countries;

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-150px)]">
      <PageTitle
        title="Top up International Data"
        description="Which country should the data work in?"
      />

      <div className="relative mb-6 bg-secondary-background rounded-sm">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Image
            src="/Search.svg"
            alt="Search icon"
            width={16}
            height={16}
            className="text-gray-400"
          />
        </div>
        <input
          type="text"
          placeholder="Search country"
          className="w-full pl-10 pr-4 py-2 border border-secondary-foreground rounded-md focus:outline-none focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-4">
          {filteredCountries.map((country) => (
            <li key={country.code}>
              <button
                className="w-full flex items-center py-2 px-1 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => onSelect(country)}
              >
                <div className="w-8 h-8 mr-3 overflow-hidden rounded-full">
                  <Image
                    src={country.flag}
                    alt={`${country.name} flag`}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span className="font-medium">{country.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto py-10 flex justify-center">
        <Button
          variant="secondary"
          size="md"
          className="w-1/2"
          onClick={onBack}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
