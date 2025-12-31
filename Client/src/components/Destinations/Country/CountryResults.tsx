import { Loader, Search } from 'lucide-react';
import { useMemo } from 'react';
import type { CityDestination } from '../../../lib/types';
import CountryCityCard from './CountryCityCard';

type CountryResultsProps = {
  destinations: CityDestination[];
  themeLoading: boolean;
  imageLoading?: boolean;
  error: string | null;
  getImageUrl: (destination: CityDestination) => string;
  ensureCityMeta: (countryCode: string, cityName: string) => void;
  onSelectCity: (destination: CityDestination) => void;
};

const CountryResults = ({
  destinations,
  themeLoading,
  imageLoading = false,
  error,
  getImageUrl,
  ensureCityMeta,
  onSelectCity
}: CountryResultsProps) => {
  const uniqueDestinations = useMemo(() => {
    const seen = new Set<string>();
    const normalize = (value: string) => value.trim().toLowerCase();

    return destinations.filter((d) => {
      const key = normalize(d.id || `${d.countryCode}-${d.cityName}`);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [destinations]);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-700">
          Showing <span className="font-bold text-2xl text-secondary/80">{uniqueDestinations.length}</span>{' '}
          {uniqueDestinations.length === 1 ? 'city' : 'cities'}
        </p>
        {themeLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader className="w-4 h-4 animate-spin" />
            Loading theme data…
          </div>
        )}
        {imageLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader className="w-4 h-4 animate-spin" />
            Loading images…
          </div>
        )}
        {error && <div className="text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">⚠️ {error}</div>}
      </div>

      {uniqueDestinations.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          {imageLoading ? (
            <>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading city images…</h3>
              <p className="text-gray-500">Filtering out cities without photos</p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No cities found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uniqueDestinations.map((destination) => (
            <CountryCityCard
              key={(destination.id || `${destination.countryCode}-${destination.cityName}`).trim()}
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
