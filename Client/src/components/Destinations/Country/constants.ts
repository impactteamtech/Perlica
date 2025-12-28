import type { CountryConfig } from '../../../lib/types';

export const LITEAPI_BASE_URL = 'https://api.liteapi.travel/v3.0';
export const LITEAPI_KEY = 'sand_c0155ab8-c683-4f26-8f94-b5e92c5797b9';

export const CITY_IMAGE_FALLBACK = '/popular_destinations/tube-spinner.svg';

export const cityKey = (countryCode: string, cityName: string): string => `${countryCode}::${cityName}`;

// Countries to fetch cities from
export const COUNTRIES: CountryConfig[] = [
  { name: 'Kenya', code: 'KE' },
  { name: 'Uganda', code: 'UG' },
  { name: 'Tanzania', code: 'TZ' }
];

export const preferredCities: Record<string, string[]> = {
  KE: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
  UG: ['Kampala', 'Entebbe', 'Jinja', 'Mbarara', 'Gulu'],
  TZ: ['Dar es Salaam', 'Arusha', 'Mwanza', 'Zanzibar City', 'Dodoma', 'Moshi']
};
