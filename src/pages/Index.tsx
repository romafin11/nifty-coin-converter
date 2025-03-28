
import React from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import CurrencyConverter from "@/components/CurrencyConverter";
import { useLanguage, LanguageProvider } from "@/contexts/LanguageContext";

// Main App component that uses the language context
const IndexContent = () => {
  const { t, toggleLanguage, language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4 px-6 md:px-8 flex justify-between items-center bg-white">
        <div className="flex items-center space-x-2">
          <Globe className="h-6 w-6 text-converter-blue" />
          <h1 className="text-xl font-semibold text-converter-navy">
            {t("appTitle")}
          </h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-converter-blue text-converter-blue hover:bg-converter-lightblue"
          onClick={toggleLanguage}
        >
          {t("languageToggle")}
        </Button>
      </header>

      <main className="flex-grow flex items-center justify-center p-6 md:p-8">
        <div className="w-full max-w-md">
          <CurrencyConverter />
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>{language === "english" ? "Data provided by Exchange Rate API" : "Tiedot toimittaa Exchange Rate API"}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

// Wrap the main component with the LanguageProvider
const Index = () => {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
};

export default Index;
