
import React from "react";
import { ArrowRight } from "lucide-react";
import CurrencyFlag from "./CurrencyFlag";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCurrencyByCode } from "@/utils/currencyAPI";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultCardProps {
  fromAmount: string;
  fromCurrency: string;
  toCurrency: string;
  toAmount: number | null;
  rate: number | null;
  lastUpdated: string | null;
  isLoading: boolean;
  error: string | null;
}

const ResultCard: React.FC<ResultCardProps> = ({
  fromAmount,
  fromCurrency,
  toCurrency,
  toAmount,
  rate,
  lastUpdated,
  isLoading,
  error,
}) => {
  const { t } = useLanguage();
  const fromCurrencyDetails = getCurrencyByCode(fromCurrency);
  const toCurrencyDetails = getCurrencyByCode(toCurrency);

  if (error) {
    return (
      <Card className="bg-red-50 border-red-200">
        <CardContent className="pt-6">
          <div className="text-red-600">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6 flex justify-center items-center h-32">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-40 bg-gray-200 rounded mb-3"></div>
            <div className="h-5 w-24 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!toAmount && !isLoading) return null;

  return (
    <Card className="currency-card animate-fade-in">
      <CardHeader className="pb-2 pt-5">
        <CardTitle className="text-lg font-medium text-gray-700">{t("conversionResult")}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <CurrencyFlag countryCode={fromCurrencyDetails?.flagCode} className="w-7 h-5" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">{fromCurrencyDetails?.name}</span>
              <span className="font-medium">
                {fromCurrencyDetails?.symbol}{parseFloat(fromAmount || "0").toFixed(2)}
              </span>
            </div>
          </div>
          
          <ArrowRight className="text-gray-400 mx-2" />
          
          <div className="flex items-center space-x-2">
            <CurrencyFlag countryCode={toCurrencyDetails?.flagCode} className="w-7 h-5" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">{toCurrencyDetails?.name}</span>
              <span className="font-medium">
                {toCurrencyDetails?.symbol}{toAmount?.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        
        {rate && (
          <div className="border-t pt-3 text-sm text-gray-600">
            <div className="flex justify-between items-center">
              <span>{t("exchangeRate")}:</span>
              <span className="font-medium">
                1 {fromCurrencyDetails?.code} = {rate.toFixed(4)} {toCurrencyDetails?.code}
              </span>
            </div>
            
            {lastUpdated && (
              <div className="text-xs text-gray-500 mt-1">
                {t("lastUpdated")}: {lastUpdated}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultCard;
