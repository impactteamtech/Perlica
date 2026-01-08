import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { CityTheme, LiteApiCity, LiteApiHotel } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- Country / LiteAPI (cities) helpers ---

export const normalizeCityName = (city: string | LiteApiCity): string | null => {
  if (typeof city === 'string') return city.trim() || null;
  return (city.city ?? city.name ?? '').trim() || null;
};

export const extractHotelImageUrl = (h: LiteApiHotel | undefined): string | null => {
  const url = h?.thumbnail || h?.main_photo;
  return url && url.trim().length > 0 ? url : null;
};

export const stripHtml = (html: string): string => html.replace(/<[^>]*>/g, ' ');

export const compactSnippet = (html: string): string => {
  const s = stripHtml(html)
    .replace(/\s+/g, ' ')
    .trim();
  return s.length > 140 ? `${s.slice(0, 140)}…` : s;
};

export const inferThemesFromHotels = (hotels: LiteApiHotel[]): CityTheme[] => {
  const sample = hotels.slice(0, 5);
  const text = sample
    .map((h) => `${h.name ?? ''} ${h.address ?? ''} ${h.city ?? ''} ${stripHtml(h.hotelDescription ?? '')}`)
    .join(' ')
    .toLowerCase();

  const hasAny = (needles: string[]): boolean => needles.some((k) => text.includes(k));

  const themes = new Set<CityTheme>();

  if (
    hasAny([
      'beach',
      'sea',
      'ocean',
      'coast',
      'coastal',
      'seafront',
      'waterfront',
      'lagoon',
      'island',
      'zanzibar',
      'diani'
    ])
  ) {
    themes.add('beach');
  }

  if (
    hasAny([
      'park',
      'forest',
      'nature',
      'waterfall',
      'hiking',
      'trek',
      'trail',
      'mountain',
      'valley',
      'crater',
      'lake',
      'river',
      'gardens',
      'botanical'
    ])
  ) {
    themes.add('nature');
  }

  if (
    hasAny([
      'safari',
      'game drive',
      'wildlife',
      'national park',
      'serengeti',
      'maasai mara',
      'ngorongoro',
      'amboseli',
      'tsavo'
    ])
  ) {
    themes.add('wildlife');
  }

  if (
    hasAny([
      'downtown',
      'city centre',
      'city center',
      'business district',
      'shopping',
      'mall',
      'conference',
      'airport',
      'central'
    ])
  ) {
    themes.add('city');
  }

  return Array.from(themes);
};

export const generateCityDescription = (city: string, country: string): string => {
  const descriptions: Record<string, string> = {
    Nairobi: 'Vibrant capital city with modern amenities, safari access, and cultural attractions',
    Mombasa: 'Beautiful coastal city with pristine beaches, historic sites, and Swahili culture',
    Kampala: 'Bustling capital on Lake Victoria with vibrant markets and nightlife',
    'Dar es Salaam': 'Major port city with beaches, cultural heritage, and gateway to Zanzibar',
    Arusha: 'Safari hub near Serengeti and gateway to Mount Kilimanjaro',
    'Zanzibar City': 'Historic Stone Town with spice markets, beaches, and island paradise',
    Entebbe: 'Lakeside city near the international airport with botanical gardens',
    Kisumu: 'Port city on Lake Victoria with fishing culture and scenic views',
    Mwanza: 'Lake Victoria port city with rock formations and fishing industry'
  };

  return descriptions[city] || `Discover ${city}, ${country}`;
};
