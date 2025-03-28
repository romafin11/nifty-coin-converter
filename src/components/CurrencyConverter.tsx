
import React, { useState, useEffect } from "react";
import { ArrowDownUp, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import CurrencySelector from "./CurrencySelector";
import CurrencyInput from "./CurrencyInput";
import ResultCard from "./ResultCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { convertCurrency, fetchExchangeRates, ExchangeRateResponse } from "@/utils/currencyAPI";
import { toast } from "sonner";

const CurrencyConverter: React.FC = () => {
  const { t } = useLanguage();
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Swap currencies
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(null);
    setExchangeRate(null);
  };

  // Function to format the date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (e) {
      return dateString;
    }
  };

  // Handle conversion
  const handleConvert = async () => {
    if (!amount || parseFloat(amount) === 0) {
      toast.error("Please enter an amount to convert");
      return;
    }

    setIsLoading(true);
    setError(null);
    setConvertedAmount(null);
    setExchangeRate(null);
    setLastUpdated(null);

    try {
      // Fetch the exchange rates
      const ratesData: ExchangeRateResponse = await fetchExchangeRates(fromCurrency);
      const rate = ratesData.rates[toCurrency];
      
      if (!rate) {
        throw new Error(`Could not find exchange rate for ${toCurrency}`);
      }
      
      // Calculate the converted amount
      const amountToConvert = parseFloat(amount);
      const converted = amountToConvert * rate;
      
      // Update state
      setConvertedAmount(converted);
      setExchangeRate(rate);
      setLastUpdated(formatDate(ratesData.time_last_update_utc));
      
      toast.success(`Converted ${amountToConvert} ${fromCurrency} to ${toCurrency}`);
    } catch (err) {
      console.error("Conversion error:", err);
      setError(t("errorMessage"));
      toast.error(t("errorMessage"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="grid gap-4">
          <div className="grid grid-cols-5 gap-3">
            <div className="col-span-2">
              <CurrencySelector
                value={fromCurrency}
                onChange={setFromCurrency}
                label={t("fromCurrency")}
              />
            </div>
            
            <div className="flex items-end justify-center">
              <Button
                onClick={handleSwapCurrencies}
                size="icon"
                variant="ghost"
                className="h-14 w-14 rounded-full hover:bg-gray-100"
              >
                <ArrowDownUp className="h-6 w-6 text-gray-600" />
              </Button>
            </div>
            
            <div className="col-span-2">
              <CurrencySelector
                value={toCurrency}
                onChange={setToCurrency}
                label={t("toCurrency")}
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              {t("amount")}
            </label>
            <CurrencyInput
              value={amount}
              onChange={setAmount}
              currency={fromCurrency}
              className="mb-4"
            />
          </div>
          
          <Button
            onClick={handleConvert}
            disabled={isLoading}
            className="w-full bg-converter-blue hover:bg-blue-700 h-12 mt-2"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : null}
            {t("convert")}
          </Button>
        </div>
      </div>
      
      <div className="mt-6">
        <ResultCard
          fromAmount={amount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          toAmount={convertedAmount}
          rate={exchangeRate}
          lastUpdated={lastUpdated}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;
