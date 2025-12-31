import { useEffect, useMemo, useState } from 'react';
import { Loader } from 'lucide-react';
import CityDetailsPanel from './CityDetailsPanel';
import CountryHeader from './CountryHeader';
import CountryFiltersPanel from './CountryFiltersPanel';
import CountryResults from './CountryResults';
import { CITY_IMAGE_FALLBACK, cityKey } from './constants';
import type { CityDestination, CitySortBy, ThemeFilter } from '../../../lib/types';
import { useCountryData } from './useCountryData';

const DestinationExplorer = () => {
  const { destinations, availableCountries, loading, error, cityImages, cityImageStatus, cityThemes, cityDetails, ensureCityMeta } = useCountryData();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedTheme, setSelectedTheme] = useState<ThemeFilter>('all');
  const [sortBy, setSortBy] = useState<CitySortBy>('name');
  const [showFilters, setShowFilters] = useState<boolean>(true);
  const [selectedCityKey, setSelectedCityKey] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCountry === 'all') return;
    if (!availableCountries.some((c) => c.name === selectedCountry)) {
      setSelectedCountry('all');
    }
  }, [availableCountries, selectedCountry]);

  const baseFilteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchesSearch =
        dest.cityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = selectedCountry === 'all' || dest.countryName === selectedCountry;
      return matchesSearch && matchesCountry;
    });
  }, [destinations, searchTerm, selectedCountry]);

  useEffect(() => {
    const MAX_IMAGE_PREFETCH = 48;
    const scope = baseFilteredDestinations.slice(0, MAX_IMAGE_PREFETCH);
    for (const d of scope) {
      ensureCityMeta(d.countryCode, d.cityName);
    }
  }, [baseFilteredDestinations, ensureCityMeta]);

  useEffect(() => {
    if (selectedTheme === 'all') return;

    const MAX_META_PREFETCH = 60;
    const scope = baseFilteredDestinations.slice(0, MAX_META_PREFETCH);
    for (const d of scope) {
      const key = cityKey(d.countryCode, d.cityName);
      if (!cityThemes[key]) {
        ensureCityMeta(d.countryCode, d.cityName);
      }
    }
  }, [baseFilteredDestinations, cityThemes, ensureCityMeta, selectedTheme]);

  const filteredDestinations = baseFilteredDestinations
    .filter((dest) => {
      if (selectedTheme === 'all') return true;
      const key = cityKey(dest.countryCode, dest.cityName);
      const themes = cityThemes[key];
      return Array.isArray(themes) && themes.includes(selectedTheme);
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.cityName.localeCompare(b.cityName);
      return 0;
    });

  const destinationsWithImages = useMemo(() => {
    return filteredDestinations.filter((d) => {
      const key = cityKey(d.countryCode, d.cityName);
      return cityImageStatus[key] === 'ok' && Boolean(cityImages[key]);
    });
  }, [filteredDestinations, cityImageStatus, cityImages]);

  const imageLoading = useMemo(() => {
    if (baseFilteredDestinations.length === 0) return false;
    const MAX_IMAGE_PREFETCH = 48;
    const scope = baseFilteredDestinations.slice(0, MAX_IMAGE_PREFETCH);
    return scope.some((d) => {
      const key = cityKey(d.countryCode, d.cityName);
      const status = cityImageStatus[key];
      return status === 'loading' || status === undefined;
    });
  }, [baseFilteredDestinations, cityImageStatus]);

  useEffect(() => {
    if (!selectedCityKey) return;
    const stillVisible = filteredDestinations.some((d) => cityKey(d.countryCode, d.cityName) === selectedCityKey);
    if (!stillVisible) setSelectedCityKey(null);
  }, [filteredDestinations, selectedCityKey]);

  const themeScopeUnknownCount = selectedTheme === 'all'
    ? 0
    : baseFilteredDestinations.reduce((acc, d) => {
        const key = cityKey(d.countryCode, d.cityName);
        return cityThemes[key] ? acc : acc + 1;
      }, 0);

  const selectedDestination = useMemo(() => {
    if (!selectedCityKey) return null;
    const [countryCode, cityName] = selectedCityKey.split('::');
    return destinations.find((d) => d.countryCode === countryCode && d.cityName === cityName) ?? null;
  }, [destinations, selectedCityKey]);

  const selectedDetails = selectedCityKey ? cityDetails[selectedCityKey] : undefined;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-16 h-16 animate-spin text-secondary mx-auto mb-4" />
          <p className="text-3xl font-bold text-primary">Discovering destinations...</p>
          <p className="text-xs text-gray-400 mt-1">This may take a minute...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CountryHeader
        destinationsCount={destinations.length}
        onToggleFilters={() => setShowFilters((v) => !v)}
        searchTerm={searchTerm}
        onChangeSearchTerm={setSearchTerm}
        onClearSearch={() => setSearchTerm('')}
      />

      <div className="py-8">
        {/* Selected City Details */}
        {selectedDestination && selectedCityKey && (
          <CityDetailsPanel
            destination={selectedDestination}
            details={selectedDetails}
            imageUrl={cityImages[selectedCityKey] || CITY_IMAGE_FALLBACK}
            fallbackImageUrl={CITY_IMAGE_FALLBACK}
            onClose={() => setSelectedCityKey(null)}
          />
        )}
        <CountryFiltersPanel
          showFilters={showFilters}
          countries={availableCountries}
          selectedCountry={selectedCountry}
          onChangeCountry={setSelectedCountry}
          selectedTheme={selectedTheme}
          onChangeTheme={setSelectedTheme}
          sortBy={sortBy}
          onChangeSortBy={setSortBy}
          onClearFilters={() => {
            setSearchTerm('');
            setSelectedCountry('all');
            setSelectedTheme('all');
            setSortBy('name');
          }}
        />

       <div className='px-6 py-7 md:px-10 md:py-10'>
         <CountryResults
            destinations={destinationsWithImages}
          themeLoading={selectedTheme !== 'all' && themeScopeUnknownCount > 0}
            imageLoading={imageLoading}
          error={error}
            getImageUrl={(d) => cityImages[cityKey(d.countryCode, d.cityName)] || d.image}
          ensureCityMeta={ensureCityMeta}
          onSelectCity={(d: CityDestination) => {
            const key = cityKey(d.countryCode, d.cityName);
            setSelectedCityKey(key);
            ensureCityMeta(d.countryCode, d.cityName);
          }}
        />
       </div>
      </div>
    </div>
  );
};
export default DestinationExplorer;