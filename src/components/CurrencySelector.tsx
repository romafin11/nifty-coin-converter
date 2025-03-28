
import React, { useState, useEffect } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Currency, getCurrencyByCode, currencies, popularCurrencies } from "@/utils/currencyAPI";
import { useLanguage } from "@/contexts/LanguageContext";
import CurrencyFlag from "./CurrencyFlag";

interface CurrencySelectorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ value, onChange, label }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();
  
  const selectedCurrency = getCurrencyByCode(value);

  const filteredCurrencies = searchQuery 
    ? currencies.filter(currency => 
        currency.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
        currency.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currencies;

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between h-14 bg-white border-gray-200 hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              {selectedCurrency && (
                <CurrencyFlag countryCode={selectedCurrency.flagCode} />
              )}
              <span className="font-medium">
                {selectedCurrency ? `${selectedCurrency.code} - ${selectedCurrency.name}` : t("selectCurrency")}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[300px] max-h-[400px]">
          <Command>
            <CommandInput 
              placeholder={t("searchCurrency")} 
              onValueChange={setSearchQuery}
              className="border-none focus:ring-0"
            />
            <CommandList className="custom-scrollbar">
              <CommandEmpty>{t("searchCurrency")}</CommandEmpty>
              
              {/* Popular currencies section */}
              {searchQuery === "" && (
                <CommandGroup heading={t("popular")}>
                  {popularCurrencies.map((code) => {
                    const currency = getCurrencyByCode(code);
                    if (!currency) return null;
                    
                    return (
                      <CommandItem
                        key={currency.code}
                        value={currency.code}
                        onSelect={() => {
                          onChange(currency.code);
                          setOpen(false);
                        }}
                        className="flex items-center gap-2 py-2"
                      >
                        <CurrencyFlag countryCode={currency.flagCode} />
                        <span>{currency.code} - {currency.name}</span>
                        {value === currency.code && (
                          <Check className="w-4 h-4 ml-auto text-green-500" />
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
              
              {/* All currencies */}
              <CommandGroup heading={searchQuery === "" ? "All Currencies" : "Results"}>
                {filteredCurrencies.map((currency) => (
                  <CommandItem
                    key={currency.code}
                    value={currency.code}
                    onSelect={() => {
                      onChange(currency.code);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 py-2"
                  >
                    <CurrencyFlag countryCode={currency.flagCode} />
                    <span>{currency.code} - {currency.name}</span>
                    {value === currency.code && (
                      <Check className="w-4 h-4 ml-auto text-green-500" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CurrencySelector;
