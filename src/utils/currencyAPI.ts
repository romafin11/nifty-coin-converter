
// Use ExchangeRate-API for currency exchange rates
// This is a free API that provides basic functionality
const API_URL = "https://open.er-api.com/v6/latest/";

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flagCode?: string;
}

export interface ExchangeRateResponse {
  base_code: string;
  time_last_update_utc: string;
  rates: Record<string, number>;
}

// List of major currencies with their details
export const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", flagCode: "us" },
  { code: "EUR", name: "Euro", symbol: "€", flagCode: "eu" },
  { code: "GBP", name: "British Pound", symbol: "£", flagCode: "gb" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flagCode: "jp" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flagCode: "au" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flagCode: "ca" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", flagCode: "ch" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flagCode: "cn" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", flagCode: "se" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", flagCode: "nz" },
  { code: "MXN", name: "Mexican Peso", symbol: "$", flagCode: "mx" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flagCode: "sg" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", flagCode: "hk" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", flagCode: "no" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", flagCode: "kr" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", flagCode: "tr" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", flagCode: "ru" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flagCode: "in" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flagCode: "br" },
  { code: "ZAR", name: "South African Rand", symbol: "R", flagCode: "za" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", flagCode: "ph" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč", flagCode: "cz" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", flagCode: "id" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", flagCode: "my" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft", flagCode: "hu" },
  { code: "ISK", name: "Icelandic Króna", symbol: "kr", flagCode: "is" },
  { code: "HRK", name: "Croatian Kuna", symbol: "kn", flagCode: "hr" },
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв", flagCode: "bg" },
  { code: "RON", name: "Romanian Leu", symbol: "lei", flagCode: "ro" },
  { code: "DKK", name: "Danish Krone", symbol: "kr", flagCode: "dk" },
  { code: "THB", name: "Thai Baht", symbol: "฿", flagCode: "th" },
  { code: "PLN", name: "Polish Złoty", symbol: "zł", flagCode: "pl" },
  { code: "ILS", name: "Israeli New Shekel", symbol: "₪", flagCode: "il" },
  { code: "AED", name: "United Arab Emirates Dirham", symbol: "د.إ", flagCode: "ae" },
  { code: "ARS", name: "Argentine Peso", symbol: "$", flagCode: "ar" },
  { code: "CLP", name: "Chilean Peso", symbol: "$", flagCode: "cl" },
  { code: "EGP", name: "Egyptian Pound", symbol: "£", flagCode: "eg" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك", flagCode: "kw" },
  { code: "QAR", name: "Qatari Riyal", symbol: "ر.ق", flagCode: "qa" },
  { code: "SAR", name: "Saudi Riyal", symbol: "ر.س", flagCode: "sa" },
  { code: "VND", name: "Vietnamese Đồng", symbol: "₫", flagCode: "vn" },
  { code: "FJD", name: "Fijian Dollar", symbol: "FJ$", flagCode: "fj" },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴", flagCode: "ua" },
  { code: "TWD", name: "New Taiwan Dollar", symbol: "NT$", flagCode: "tw" }
];

// Popular currencies for quick selection
export const popularCurrencies: string[] = [
  "USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CNY", "INR"
];

// Get currency details by code
export const getCurrencyByCode = (code: string): Currency | undefined => {
  return currencies.find(currency => currency.code === code);
};

// Fetch exchange rates for a base currency
export const fetchExchangeRates = async (baseCurrency: string): Promise<ExchangeRateResponse> => {
  try {
    const response = await fetch(`${API_URL}${baseCurrency}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
};

// Convert amount from one currency to another
export const convertCurrency = async (
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number> => {
  try {
    const exchangeRates = await fetchExchangeRates(fromCurrency);
    const rate = exchangeRates.rates[toCurrency];
    
    if (!rate) {
      throw new Error(`Rate not found for ${toCurrency}`);
    }
    
    return amount * rate;
  } catch (error) {
    console.error("Error converting currency:", error);
    throw error;
  }
};
