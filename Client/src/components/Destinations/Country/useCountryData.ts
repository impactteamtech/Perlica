import { useCallback, useEffect, useRef, useState } from 'react';
import { CITY_IMAGE_FALLBACK, COUNTRIES, LITEAPI_BASE_URL, LITEAPI_KEY, cityKey, preferredCities } from './constants';
import type {
  CityDetails,
  CityDestination,
  CityTheme,
  CountryConfig,
  LiteApiCity,
  LiteApiCitiesResponse,
  LiteApiHotelsResponse
} from '../../../lib/types';
import { compactSnippet, extractHotelImageUrl, generateCityDescription, inferThemesFromHotels, normalizeCityName } from '../../../lib/utils';

type UseCountryDataResult = {
  destinations: CityDestination[];
  availableCountries: CountryConfig[];
  loading: boolean;
  error: string | null;
  cityImages: Record<string, string>;
  cityImageStatus: Record<string, 'loading' | 'ok' | 'none'>;
  cityThemes: Record<string, CityTheme[]>;
  cityDetails: Record<string, CityDetails>;
  ensureCityMeta: (countryCode: string, cityName: string) => void;
  refetch: () => Promise<void>;
};

export const useCountryData = (): UseCountryDataResult => {
  const [destinations, setDestinations] = useState<CityDestination[]>([]);
  const [availableCountries, setAvailableCountries] = useState<CountryConfig[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [cityImages, setCityImages] = useState<Record<string, string>>({});
  const [cityImageStatus, setCityImageStatus] = useState<Record<string, 'loading' | 'ok' | 'none'>>({});
  const [cityThemes, setCityThemes] = useState<Record<string, CityTheme[]>>({});
  const [cityDetails, setCityDetails] = useState<Record<string, CityDetails>>({});

  const cityImagesRef = useRef<Record<string, string>>({});
  const cityImageStatusRef = useRef<Record<string, 'loading' | 'ok' | 'none'>>({});
  const cityThemesRef = useRef<Record<string, CityTheme[]>>({});
  const cityDetailsRef = useRef<Record<string, CityDetails>>({});
  const queueRef = useRef<string[]>([]);
  const inFlightRef = useRef<Set<string>>(new Set());
  const runningRef = useRef<boolean>(false);

  const processQueue = useCallback(async (): Promise<void> => {
    if (runningRef.current) return;
    runningRef.current = true;

    const CONCURRENCY = 3;
    const WORKER_DELAY_MS = 150;

    const worker = async () => {
      while (queueRef.current.length > 0) {
        const key = queueRef.current.shift();
        if (!key) return;

        const [countryCode, cityName] = key.split('::');
        let url: string | null = null;
        let themes: CityTheme[] | null = null;
        let details: CityDetails | null = null;

        try {
          const resp = await fetch(
            `${LITEAPI_BASE_URL}/data/hotels?countryCode=${countryCode}&cityName=${encodeURIComponent(cityName)}&limit=10`,
            {
              method: 'GET',
              headers: {
                'X-API-Key': LITEAPI_KEY,
                'Content-Type': 'application/json'
              }
            }
          );

          if (resp.ok) {
            const data = (await resp.json()) as LiteApiHotelsResponse;
            const hotels = (data.data ?? []).filter((h) => h.deletedAt == null);

            const uniqueImages = Array.from(
              new Set(
                hotels
                  .flatMap((h) => [h.thumbnail, h.main_photo])
                  .filter((v): v is string => Boolean(v))
                  .map((v) => v.trim())
                  .filter((v) => v.length > 0)
              )
            ).slice(0, 4);

            url =
              uniqueImages[0] ??
              extractHotelImageUrl(hotels.find((h) => Boolean(extractHotelImageUrl(h))) ?? hotels[0]);

            themes = inferThemesFromHotels(hotels);

            const primary = hotels[0];
            details = {
              images: uniqueImages,
              hotelName: primary?.name,
              hotelRating: typeof primary?.rating === 'number' ? primary.rating : undefined,
              reviewCount: typeof primary?.reviewCount === 'number' ? primary.reviewCount : undefined,
              stars: typeof primary?.stars === 'number' ? primary.stars : undefined,
              address: primary?.address,
              snippet: primary?.hotelDescription ? compactSnippet(primary.hotelDescription) : undefined
            };
          }
        } catch {
          url = null;
        }

        if (url) {
          setCityImages((prev) => {
            const next = { ...prev, [key]: url };
            cityImagesRef.current = next;
            return next;
          });

          setCityImageStatus((prev) => {
            const next: Record<string, 'loading' | 'ok' | 'none'> = { ...prev, [key]: 'ok' };
            cityImageStatusRef.current = next;
            return next;
          });
        } else {
          setCityImageStatus((prev) => {
            const next: Record<string, 'loading' | 'ok' | 'none'> = { ...prev, [key]: 'none' };
            cityImageStatusRef.current = next;
            return next;
          });
        }

        if (themes) {
          setCityThemes((prev) => {
            const next = { ...prev, [key]: themes };
            cityThemesRef.current = next;
            return next;
          });
        }

        if (details) {
          setCityDetails((prev) => {
            const next = { ...prev, [key]: details };
            cityDetailsRef.current = next;
            return next;
          });
        }

        inFlightRef.current.delete(key);
        await new Promise<void>((resolve) => setTimeout(resolve, WORKER_DELAY_MS));
      }
    };

    try {
      await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
    } finally {
      runningRef.current = false;
    }
  }, []);

  const ensureCityMeta = useCallback(
    (countryCode: string, cityName: string) => {
      const key = cityKey(countryCode, cityName);

      const status = cityImageStatusRef.current[key];
      if (status === 'ok' || status === 'none') return;
      if (cityImagesRef.current[key] && cityThemesRef.current[key] && cityDetailsRef.current[key]) return;
      if (inFlightRef.current.has(key)) return;

      setCityImageStatus((prev) => {
        if (prev[key] === 'ok' || prev[key] === 'none') return prev;
        const next: Record<string, 'loading' | 'ok' | 'none'> = { ...prev, [key]: 'loading' };
        cityImageStatusRef.current = next;
        return next;
      });

      inFlightRef.current.add(key);
      queueRef.current.push(key);
      void processQueue();
    },
    [processQueue]
  );

  const probeCityHasImage = useCallback(async (countryCode: string, cityName: string): Promise<boolean> => {
    try {
      const key = cityKey(countryCode, cityName);
      if (cityImagesRef.current[key]) return true;

      const resp = await fetch(
        `${LITEAPI_BASE_URL}/data/hotels?countryCode=${countryCode}&cityName=${encodeURIComponent(cityName)}&limit=10`,
        {
          method: 'GET',
          headers: {
            'X-API-Key': LITEAPI_KEY,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!resp.ok) return false;
      const data = (await resp.json()) as LiteApiHotelsResponse;
      const hotels = (data.data ?? []).filter((h) => h.deletedAt == null);

      const uniqueImages = Array.from(
        new Set(
          hotels
            .flatMap((h) => [h.thumbnail, h.main_photo])
            .filter((v): v is string => Boolean(v))
            .map((v) => v.trim())
            .filter((v) => v.length > 0)
        )
      ).slice(0, 1);

      const url =
        uniqueImages[0] ??
        extractHotelImageUrl(hotels.find((h) => Boolean(extractHotelImageUrl(h))) ?? hotels[0]);

      if (!url) return false;

      setCityImages((prev) => {
        const next = { ...prev, [key]: url };
        cityImagesRef.current = next;
        return next;
      });

      setCityImageStatus((prev) => {
        const next: Record<string, 'loading' | 'ok' | 'none'> = { ...prev, [key]: 'ok' };
        cityImageStatusRef.current = next;
        return next;
      });

      return true;
    } catch {
      // fall through
    }

    const failKey = cityKey(countryCode, cityName);
    setCityImageStatus((prev) => {
      const next: Record<string, 'loading' | 'ok' | 'none'> = { ...prev, [failKey]: 'none' };
      cityImageStatusRef.current = next;
      return next;
    });
    return false;
  }, []);

  const fetchAllCities = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const allDestinations: CityDestination[] = [];
      const countriesWithImages: CountryConfig[] = [];

      const MAX_CITIES_PER_COUNTRY = 80;
      const PROBE_CITIES_PER_COUNTRY = 4;

      for (const country of COUNTRIES) {
        let apiCities: LiteApiCity[] = [];
        try {
          const citiesResponse = await fetch(`${LITEAPI_BASE_URL}/data/cities?countryCode=${country.code}`, {
            method: 'GET',
            headers: {
              'X-API-Key': LITEAPI_KEY,
              'Content-Type': 'application/json'
            }
          });

          if (citiesResponse.ok) {
            const citiesData = (await citiesResponse.json()) as LiteApiCitiesResponse;
            apiCities = citiesData.data ?? [];
          }
        } catch {
          // Non-fatal: fall back to preferred list
        }

        const apiCityNames = apiCities
          .map((c) => normalizeCityName(c))
          .filter((c): c is string => Boolean(c));

        const apiCitySet = new Set(apiCityNames);
        const preferred = preferredCities[country.code] ?? [];

        const citiesInOrder: string[] = [];
        for (const c of preferred) {
          if (apiCitySet.has(c)) citiesInOrder.push(c);
        }
        for (const c of apiCityNames) {
          if (!citiesInOrder.includes(c)) citiesInOrder.push(c);
        }

        const citiesToShow = citiesInOrder.slice(0, MAX_CITIES_PER_COUNTRY);

        // Only include a country if we can find at least one real image for it.
        // Since LiteAPI doesn't provide country-level images, we probe a few cities.
        let hasAnyImage = false;
        for (const cityName of citiesToShow.slice(0, PROBE_CITIES_PER_COUNTRY)) {
          if (await probeCityHasImage(country.code, cityName)) {
            hasAnyImage = true;
            break;
          }
        }

        if (!hasAnyImage) {
          await new Promise<void>((resolve) => setTimeout(resolve, 200));
          continue;
        }

        countriesWithImages.push(country);

        for (const cityName of citiesToShow) {
          const description = generateCityDescription(cityName, country.name);
          allDestinations.push({
            id: `${country.code}-${cityName.replace(/\s+/g, '-')}`,
            cityName,
            countryName: country.name,
            countryCode: country.code,
            displayName: `${cityName}, ${country.name}`,
            description,
            image: CITY_IMAGE_FALLBACK,
            isZanzibar: cityName.toLowerCase().includes('zanzibar')
          });
        }

        await new Promise<void>((resolve) => setTimeout(resolve, 400));
      }

      setDestinations(allDestinations);
      setAvailableCountries(countriesWithImages);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch destination data.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [probeCityHasImage]);

  useEffect(() => {
    void fetchAllCities();
  }, [fetchAllCities]);

  return {
    destinations,
    availableCountries,
    loading,
    error,
    cityImages,
    cityImageStatus,
    cityThemes,
    cityDetails,
    ensureCityMeta,
    refetch: fetchAllCities
  };
};
