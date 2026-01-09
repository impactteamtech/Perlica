import React, { useState, useEffect } from 'react';

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface CurrencyConverterProps {
  originalPriceUSD: number;
  onConvertedPrice?: (convertedPrice: number, currency: string) => void;
}

// Mock conversion rates (fallback when API fails)
const MOCK_RATES: Record<string, number> = {
  KES: 150.50,    // US Dollar to Kenyan Shilling
  EUR: 0.92,      // US Dollar to Euro
  GBP: 0.79,      // US Dollar to British Pound
  TZS: 2500,      // US Dollar to Tanzanian Shilling
  UGX: 3700,      // US Dollar to Ugandan Shilling
  ZAR: 18.50,     // US Dollar to South African Rand
  INR: 83.00,     // US Dollar to Indian Rupee
  CNY: 7.20,      // US Dollar to Chinese Yuan
  JPY: 148.00,    // US Dollar to Japanese Yen
  AUD: 1.52,      // US Dollar to Australian Dollar
  CAD: 1.35,      // US Dollar to Canadian Dollar
};

const DEFAULT_CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh' },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh' },
];

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ 
  originalPriceUSD, 
  onConvertedPrice 
}) => {
  const [currencies, setCurrencies] = useState<Currency[]>(DEFAULT_CURRENCIES);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [convertedPrice, setConvertedPrice] = useState<number>(originalPriceUSD);
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [apiStatus, setApiStatus] = useState<string>('');
  const [useMockData, setUseMockData] = useState<boolean>(false);

  // Fetch currencies from backend on component mount
  useEffect(() => {
    fetchCurrencies();
  }, []);

  // Convert price when currency changes or original price changes
  useEffect(() => {
    if (selectedCurrency === 'USD') {
      setConvertedPrice(originalPriceUSD);
      setExchangeRate(1);
      setApiStatus('');
      setError('');
      if (onConvertedPrice) {
        onConvertedPrice(originalPriceUSD, 'USD');
      }
    } else {
      convertPrice(originalPriceUSD, selectedCurrency);
    }
  }, [selectedCurrency, originalPriceUSD]);

  const fetchCurrencies = async () => {
    try {
      console.log('Fetching currencies from backend...');
      const response = await fetch('https://perlica-backend.onrender.com/currency/currencies', {
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Currencies API response:', data);
        
        if (data.currencies && Array.isArray(data.currencies) && data.currencies.length > 0) {
          setCurrencies(data.currencies);
        }
      } else {
        console.warn('Failed to fetch currencies from API, using default currencies');
      }
    } catch (err) {
      console.warn('Could not fetch currencies, using defaults:', err);
      // Keep default currencies
    }
  };

  const convertWithMockData = (amountUSD: number, targetCurrency: string) => {
    console.log('Using mock conversion data');
    const rate = MOCK_RATES[targetCurrency] || 1;
    const converted = amountUSD * rate;
    
    setConvertedPrice(converted);
    setExchangeRate(rate);
    setApiStatus('Using approximate rates');
    setUseMockData(true);
    
    if (onConvertedPrice) {
      onConvertedPrice(converted, targetCurrency);
    }
    
    return converted;
  };

  const convertPrice = async (amountUSD: number, targetCurrency: string) => {
    if (!amountUSD || amountUSD <= 0) return;
    
    setLoading(true);
    setError('');
    setApiStatus('');
    setUseMockData(false);

    try {
      console.log(`Converting ${amountUSD} USD to ${targetCurrency}...`);
      
      // First try the main endpoint
      const url = `https://perlica-backend.onrender.com/currency/convert?from_curr=USD&to_curr=${targetCurrency}&amount=${amountUSD}`;
      console.log('Trying main endpoint:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(8000), // 8 second timeout
      });
      
      console.log('Response status:', response.status);
      
      // Try to parse response
      let data;
      try {
        data = await response.json();
        console.log('Response data:', data);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        throw new Error('Invalid response from server');
      }
      
      if (!response.ok) {
        // Check if there's an error detail in the response
        if (data && data.detail) {
          console.warn('API returned error:', data.detail);
          
          // If it's a 400 error about API issues, use mock data
          if (response.status === 400 && data.detail.includes('API')) {
            console.log('Falling back to mock data due to API error');
            convertWithMockData(amountUSD, targetCurrency);
            return;
          }
          throw new Error(data.detail);
        }
        throw new Error(`Server returned ${response.status}`);
      }
      
      // Handle successful response
      if (data.success) {
        setConvertedPrice(data.converted_amount);
        setExchangeRate(data.exchange_rate || data.converted_amount / amountUSD);
        setApiStatus(data.note || 'Live exchange rate');
        
        if (onConvertedPrice) {
          onConvertedPrice(data.converted_amount, targetCurrency);
        }
      } else if (data.error) {
        // API returned an error message
        console.warn('API error response:', data.error);
        
        // If it's an API-related error, use mock data
        if (data.error.includes('API') || data.error.includes('Network')) {
          console.log('Falling back to mock data');
          convertWithMockData(amountUSD, targetCurrency);
        } else {
          setError(`Conversion error: ${data.error}`);
          setApiStatus('Error');
        }
      } else if (data.converted_amount !== undefined) {
        // Fallback for different response formats
        setConvertedPrice(data.converted_amount);
        setExchangeRate(data.converted_amount / amountUSD);
        setApiStatus('Converted');
        
        if (onConvertedPrice) {
          onConvertedPrice(data.converted_amount, targetCurrency);
        }
      } else {
        // Unexpected response format
        console.warn('Unexpected response format, using mock data');
        convertWithMockData(amountUSD, targetCurrency);
      }
      
    } catch (err: any) {
      console.error('Currency conversion error:', err);
      
      // Check if it's a timeout or network error
      if (err.name === 'AbortError' || err.name === 'TimeoutError' || 
          err.message.includes('network') || err.message.includes('timeout')) {
        console.log('Network/timeout error, using mock data');
        convertWithMockData(amountUSD, targetCurrency);
      } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        console.log('Network error, using mock data');
        convertWithMockData(amountUSD, targetCurrency);
      } else {
        setError(`Conversion failed: ${err.message}`);
        setApiStatus('Error');
        
        // Still show mock data as fallback
        convertWithMockData(amountUSD, targetCurrency);
      }
    } finally {
      setLoading(false);
    }
  };

  const getCurrencySymbol = (code: string) => {
    const currency = currencies.find(c => c.code === code);
    return currency ? currency.symbol : code;
  };

  const formatPrice = (price: number, currencyCode: string) => {
    const symbol = getCurrencySymbol(currencyCode);
    
    // Format based on currency
    if (currencyCode === 'KES' || currencyCode === 'TZS' || currencyCode === 'UGX') {
      // East African currencies usually don't use decimals
      return `${symbol} ${Math.round(price).toLocaleString()}`;
    } else if (currencyCode === 'JPY') {
      // Japanese Yen usually doesn't use decimals
      return `${symbol} ${Math.round(price).toLocaleString()}`;
    } else {
      // Other currencies with 2 decimal places
      return `${symbol} ${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }
  };

  return (
    <div className="currency-converter mt-2">
      <div className="flex items-center gap-2">
        <label htmlFor="currency-select" className="text-sm text-gray-600">
          Show price in:
        </label>
        <select
          id="currency-select"
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="text-sm border border-gray-300 rounded px-3 py-2 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#04c41a] focus:border-[#04c41a] transition-colors w-full md:w-auto min-w-[160px]"
          disabled={loading}
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} ({currency.symbol})
            </option>
          ))}
        </select>
        
        {loading && (
          <span className="text-xs text-gray-500 animate-pulse">Converting...</span>
        )}
      </div>

      {selectedCurrency !== 'USD' && !loading && convertedPrice && (
        <div className="mt-2 text-sm animate-fadeIn">
          <p className="text-gray-700">
            <span className="font-medium">
              {formatPrice(convertedPrice, selectedCurrency)}
            </span>
            {' '}per night
            {useMockData && (
              <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">
                Approximate
              </span>
            )}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Exchange rate: 1 USD = {exchangeRate.toFixed(4)} {selectedCurrency}
          </p>
          {apiStatus && (
            <p className={`text-xs mt-1 ${
              apiStatus.includes('Error') ? 'text-red-500' : 
              apiStatus.includes('mock') || apiStatus.includes('approximate') ? 'text-amber-600' : 
              'text-gray-400'
            }`}>
              {apiStatus}
            </p>
          )}
        </div>
      )}

      {error && !useMockData && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded animate-fadeIn">
          <p className="text-xs text-red-600 font-medium">Error: {error}</p>
          <p className="text-xs text-red-500 mt-1">
            Showing approximate conversion rates
          </p>
        </div>
      )}
      
      {useMockData && (
        <div className="mt-1">
          <p className="text-xs text-amber-600">
            <span className="font-medium">Note:</span> Using approximate exchange rates. 
            For accurate rates,
             {/* configure the currency API. */}
          </p>
        </div>
      )}
    </div>
  );
};

// Add some CSS animations
const styles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default CurrencyConverter;