
import React from 'react';
import type { Country } from './types';

const countryNames: Record<Country, string> = {
  KE: 'Kenya',
  UG: 'Uganda',
  TZ: 'Tanzania'
};

interface CountryTabsProps {
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
  setDestination: (destination: string) => void;
  setHotels: (hotels: any[]) => void;
}

const CountryTabs: React.FC<CountryTabsProps> = ({
  selectedCountry,
  setSelectedCountry,
  setDestination,
  setHotels
}) => (
  <div className="w-full px-4 mt-4 sm:mt-6">
    <div className="flex flex-col sm:flex-row gap-2 bg-white rounded-lg p-2 shadow-md">
      {(Object.keys(countryNames) as Country[]).map(code => (
        <button
          key={code}
          onClick={() => {
            setSelectedCountry(code);
            setDestination('');
            setHotels([]);
          }}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
            selectedCountry === code
              ? 'bg-[#04c41a] text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {countryNames[code]}
        </button>
      ))}
    </div>
  </div>
);

export default CountryTabs;
