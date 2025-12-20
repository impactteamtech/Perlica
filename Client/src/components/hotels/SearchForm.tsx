
import React from 'react';
import { Search, MapPin, Calendar, Users, Loader2 } from 'lucide-react';
import type { Country, Destination } from './types';

const destinations: Record<Country, Destination[]> = {
    KE: [
      { name: 'Nairobi', code: 'KE', city: 'Nairobi' },
      { name: 'Mombasa', code: 'KE', city: 'Mombasa' },
      { name: 'Kisumu', code: 'KE', city: 'Kisumu' }
    ],
    UG: [
      { name: 'Kampala', code: 'UG', city: 'Kampala' },
      { name: 'Entebbe', code: 'UG', city: 'Entebbe' },
      { name: 'Jinja', code: 'UG', city: 'Jinja' }
    ],
    TZ: [
      { name: 'Zanzibar City', code: 'TZ', city: 'Zanzibar City' },
      { name: 'Nungwi', code: 'TZ', city: 'Nungwi' },
      { name: 'Paje', code: 'TZ', city: 'Paje' }
    ]
  };

interface SearchFormProps {
  destination: string;
  setDestination: (destination: string) => void;
  checkIn: string;
  setCheckIn: (checkIn: string) => void;
  checkOut: string;
  setCheckOut: (checkOut: string) => void;
  guests: number;
  setGuests: (guests: number) => void;
  loading: boolean;
  error: string;
  selectedCountry: Country;
  onSearch: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  destination,
  setDestination,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guests,
  setGuests,
  loading,
  error,
  selectedCountry,
  onSearch
}) => (
  <div className="w-full px-4 py-8">
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-white mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Destination
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full  px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a city</option>
            {destinations[selectedCountry].map(dest => (
              <option key={dest.city} value={dest.city}>
                {dest.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <Calendar className="inline w-4 h-4 mr-1" />
            Check-in
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <Calendar className="inline w-4 h-4 mr-1" />
            Check-out
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <Users className="inline w-4 h-4 mr-1" />
            Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={onSearch}
        disabled={loading}
        className="w-full mt-6 bg-[#04c41a] hover:bg-[#04c41a]/80 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Searching hotels and rates...
          </>
        ) : (
          <>
            <Search className="w-5 h-5" />
            Search Hotels
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
    </div>
  </div>
);

export default SearchForm;
