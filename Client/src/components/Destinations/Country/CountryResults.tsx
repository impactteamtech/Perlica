import { Loader, Search } from 'lucide-react';
import type { CityDestination } from '../../../lib/types';
import CountryCityCard from './CountryCityCard';

type CountryResultsProps = {
  destinations: CityDestination[];
  themeLoading: boolean;
  error: string | null;
  getImageUrl: (destination: CityDestination) => string;
  ensureCityMeta: (countryCode: string, cityName: string) => void;
  onSelectCity: (destination: CityDestination) => void;
};

const CountryResults = ({
  destinations,
  themeLoading,
  error,
  getImageUrl,
  ensureCityMeta,
  onSelectCity
}: CountryResultsProps) => {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-700">
          Showing <span className="font-bold text-2xl text-secondary/80">{destinations.length}</span>{' '}
          {destinations.length === 1 ? 'city' : 'cities'}
        </p>
        {themeLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader className="w-4 h-4 animate-spin" />
            Loading theme data…
          </div>
        )}
        {error && <div className="text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">⚠️ {error}</div>}
      </div>

      {destinations.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No cities found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <CountryCityCard
              key={destination.id}
              destination={destination}
              imageUrl={getImageUrl(destination)}
              ensureImage={ensureCityMeta}
              onSelect={onSelectCity}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CountryResults;
