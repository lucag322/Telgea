import { ChangeEvent } from "react";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function PhoneInput({
  value,
  onChange,
  error,
}: PhoneInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^\d]/g, "");
    onChange(newValue);
  };

  return (
    <div className="mb-6">
      <div className="w-full bg-custom-white py-2 px-3 rounded-lg">
        <label className="block text-gray-400 text-sm mb-1">
          Phone Number *
        </label>
        <input
          type="tel"
          value={value}
          onChange={handleChange}
          className="w-full text-3xl font-medium border-none bg-transparent p-0 focus:outline-none focus:ring-0"
          aria-invalid={error ? "true" : "false"}
          placeholder="37829016"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
