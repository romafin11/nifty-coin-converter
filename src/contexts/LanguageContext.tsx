
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define translation types and content
type Translations = {
  [key: string]: {
    english: string;
    finnish: string;
  };
};

const translations: Translations = {
  appTitle: {
    english: "Currency Converter",
    finnish: "Valuuttamuunnin"
  },
  fromCurrency: {
    english: "From",
    finnish: "Mistä"
  },
  toCurrency: {
    english: "To",
    finnish: "Mihin"
  },
  amount: {
    english: "Amount",
    finnish: "Määrä"
  },
  convert: {
    english: "Convert",
    finnish: "Muunna"
  },
  swap: {
    english: "Swap",
    finnish: "Vaihda"
  },
  selectCurrency: {
    english: "Select currency",
    finnish: "Valitse valuutta"
  },
  conversionResult: {
    english: "Conversion Result",
    finnish: "Muunnoksen Tulos"
  },
  loading: {
    english: "Loading...",
    finnish: "Ladataan..."
  },
  errorMessage: {
    english: "An error occurred. Please try again.",
    finnish: "Tapahtui virhe. Yritä uudelleen."
  },
  searchCurrency: {
    english: "Search currency",
    finnish: "Hae valuuttaa"
  },
  languageToggle: {
    english: "FI",
    finnish: "EN"
  },
  exchangeRate: {
    english: "Exchange Rate",
    finnish: "Vaihtokurssi"
  },
  lastUpdated: {
    english: "Last Updated",
    finnish: "Viimeksi Päivitetty"
  },
  popular: {
    english: "Popular Currencies",
    finnish: "Suositut Valuutat"
  }
};

// Define the context type
type LanguageContextType = {
  language: "english" | "finnish";
  toggleLanguage: () => void;
  t: (key: string) => string;
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create the provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<"english" | "finnish">("english");

  const toggleLanguage = () => {
    setLanguage(language === "english" ? "finnish" : "english");
  };

  // Function to get translation based on key
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
