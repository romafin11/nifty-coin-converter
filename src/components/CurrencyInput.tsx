
import React from "react";
import { getCurrencyByCode } from "@/utils/currencyAPI";

interface CurrencyInputProps {
  value: string;
  currency: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  className?: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  currency,
  onChange,
  readonly = false,
  className = "",
}) => {
  const selectedCurrency = getCurrencyByCode(currency);
  const symbol = selectedCurrency?.symbol || "";

  // Format number on input change
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Only allow numeric input with up to 2 decimal places
    const regex = /^[0-9]*\.?[0-9]{0,2}$/;
    
    if (inputValue === "" || regex.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      {symbol && (
        <div className="absolute left-3 text-gray-500 text-lg">{symbol}</div>
      )}
      <input
        type="text"
        value={value}
        onChange={handleValueChange}
        readOnly={readonly}
        className={`currency-input pl-8 py-4 text-xl rounded-md bg-gray-50 ${
          readonly ? "bg-gray-100" : "hover:bg-gray-100 focus:bg-white"
        }`}
        placeholder="0.00"
      />
    </div>
  );
};

export default CurrencyInput;
