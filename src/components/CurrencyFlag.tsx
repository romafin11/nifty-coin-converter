
import React from "react";

interface CurrencyFlagProps {
  countryCode?: string;
  className?: string;
}

const CurrencyFlag: React.FC<CurrencyFlagProps> = ({ countryCode, className = "w-6 h-4" }) => {
  if (!countryCode) return null;

  // Convert to lowercase for consistency
  const code = countryCode.toLowerCase();

  // Special case for the euro which uses 'eu'
  const flagUrl = `https://flagcdn.com/w40/${code}.png`;

  return (
    <img
      src={flagUrl}
      alt={`${code} flag`}
      className={`rounded ${className}`}
      onError={(e) => {
        // Fallback for flags that may not exist
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
};

export default CurrencyFlag;
