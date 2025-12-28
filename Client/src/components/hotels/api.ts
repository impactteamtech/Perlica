

import type { Hotel, HotelRate, Destination, Country } from './types';

const API_KEY = 'sand_c0155ab8-c683-4f26-8f94-b5e92c5797b9';

const toUniqueImageUrls = (values: unknown[]): string[] => {
  return Array.from(
    new Set(
      values
        .filter((v): v is string => typeof v === 'string')
        .map((v) => v.trim())
        .filter((v) => v.length > 0)
    )
  );
};

const extractHotelDetailImageUrls = (payload: unknown): string[] => {
  const root = (payload && typeof payload === 'object' && 'data' in (payload as Record<string, unknown>))
    ? (payload as Record<string, unknown>).data
    : payload;

  if (!root || typeof root !== 'object') return [];
  const obj = root as Record<string, unknown>;

  const candidates: unknown[] = [];

  const pushStringArray = (key: string) => {
    const val = obj[key];
    if (Array.isArray(val)) {
      for (const item of val) {
        if (typeof item === 'string') candidates.push(item);
      }
    }
  };

  pushStringArray('images');
  pushStringArray('photos');
  pushStringArray('gallery');

  const hotelImages = obj['hotelImages'];
  if (Array.isArray(hotelImages)) {
    for (const item of hotelImages) {
      if (typeof item === 'string') {
        candidates.push(item);
      } else if (item && typeof item === 'object') {
        const url = (item as Record<string, unknown>)['url'];
        if (typeof url === 'string') candidates.push(url);
      }
    }
  }

  const mainPhoto = obj['main_photo'];
  if (typeof mainPhoto === 'string') candidates.push(mainPhoto);
  const thumbnail = obj['thumbnail'];
  if (typeof thumbnail === 'string') candidates.push(thumbnail);

  return toUniqueImageUrls(candidates);
};

export const fetchHotelDetailImages = async (hotelId: string): Promise<string[]> => {
  if (!hotelId) return [];
  const resp = await fetch(
    `https://api.liteapi.travel/v3.0/data/hotel?hotelId=${encodeURIComponent(hotelId)}`,
    {
      headers: {
        'X-API-Key': API_KEY,
        accept: 'application/json'
      }
    }
  );

  if (!resp.ok) return [];
  const json = (await resp.json()) as unknown;
  return extractHotelDetailImageUrls(json);
};

type LiteApiFacility = {
  id?: number;
  facilityId?: number;
  name?: string;
  title?: string;
};

type LiteApiHotelImage = string | { url?: string };

type LiteApiHotel = {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  main_photo?: string;
  thumbnail?: string;
  hotelDescription?: string;
  stars?: number;
  starRating?: number;
  rating?: number;
  latitude?: number;
  longitude?: number;
  facilityIds?: number[];
  facilities?: string[];
  hotelFacilities?: string[];
  hotelImages?: LiteApiHotelImage[];
};

type LiteApiHotelsResponse = {
  data?: LiteApiHotel[];
};

type LiteApiRatesResponse = {
  data?: HotelRate[];
};

let facilityNameByIdCache: Map<number, string> | null = null;
let facilityNameByIdPromise: Promise<Map<number, string>> | null = null;

const getFacilityNameById = async (): Promise<Map<number, string>> => {
  if (facilityNameByIdCache) return facilityNameByIdCache;
  if (facilityNameByIdPromise) return facilityNameByIdPromise;

  facilityNameByIdPromise = (async () => {
    try {
      const resp = await fetch('https://api.liteapi.travel/v3.0/data/facilities', {
        headers: {
          'X-API-Key': API_KEY,
          accept: 'application/json'
        }
      });

      if (!resp.ok) {
        return new Map();
      }

      const json = await resp.json();
      const list: LiteApiFacility[] = Array.isArray(json?.data)
        ? json.data
        : Array.isArray(json)
          ? json
          : [];

      const map = new Map<number, string>();
      for (const item of list) {
        const id = typeof item?.id === 'number'
          ? item.id
          : typeof item?.facilityId === 'number'
            ? item.facilityId
            : null;
        const name = typeof item?.name === 'string'
          ? item.name
          : typeof item?.title === 'string'
            ? item.title
            : null;

        if (typeof id === 'number' && typeof name === 'string' && name.trim().length > 0) {
          map.set(id, name.trim());
        }
      }

      facilityNameByIdCache = map;
      return map;
    } catch {
      return new Map();
    } finally {
      facilityNameByIdPromise = null;
    }
  })();

  return facilityNameByIdPromise;
};

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



export const searchHotels = async (
  destination: string,
  checkIn: string,
  checkOut: string,
  guests: number,
  selectedCountry: Country
): Promise<Hotel[]> => {
  if (!destination || !checkIn || !checkOut) {
    throw new Error('Please fill in all required fields');
  }

  const cityData = destinations[selectedCountry].find(d => d.city === destination);
  if (!cityData) {
    throw new Error('Invalid destination');
  }

  console.log('📍 Fetching hotels for:', cityData.city, cityData.code);
  const hotelsResponse = await fetch(
    `https://api.liteapi.travel/v3.0/data/hotels?countryCode=${cityData.code}&cityName=${encodeURIComponent(cityData.city)}`,
    {
      headers: {
        'X-API-Key': API_KEY,
        'accept': 'application/json'
      }
    }
  );

  if (!hotelsResponse.ok) {
    throw new Error(`Failed to fetch hotels: ${hotelsResponse.status}`);
  }

  const hotelsData = await hotelsResponse.json();
  console.log('🏨 Hotels data received:', hotelsData);

  const hotelsPayload = hotelsData as LiteApiHotelsResponse;
  if (!hotelsPayload.data || hotelsPayload.data.length === 0) {
    throw new Error('No hotels found for this destination');
  }

  const hotelsList = hotelsPayload.data;
  console.log('📋 Processing hotels:', hotelsList.length);

  const hotelIds = hotelsList.map((h) => h.id);

  const fetchRatesForHotelIds = async (ids: string[]): Promise<HotelRate[]> => {
    const ratesResponse = await fetch('https://api.liteapi.travel/v3.0/hotels/rates', {
      method: 'POST',
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({
        checkin: checkIn,
        checkout: checkOut,
        currency: 'USD',
        guestNationality: 'US',
        hotelIds: ids,
        includeHotelData: true,
        occupancies: [
          {
            adults: guests,
            children: []
          }
        ]
      })
    });

    if (!ratesResponse.ok) {
      throw new Error(`Failed to fetch rates: ${ratesResponse.status}`);
    }

    const ratesData = (await ratesResponse.json()) as LiteApiRatesResponse;
    return Array.isArray(ratesData.data) ? ratesData.data : [];
  };

  const RATE_BATCH_SIZE = 50;
  const allRates: HotelRate[] = [];

  console.log('💰 Fetching rates for hotels:', hotelIds.length);
  for (let i = 0; i < hotelIds.length; i += RATE_BATCH_SIZE) {
    const batch = hotelIds.slice(i, i + RATE_BATCH_SIZE);
    const batchIndex = Math.floor(i / RATE_BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(hotelIds.length / RATE_BATCH_SIZE);
    console.log(`💰 Rates batch ${batchIndex}/${totalBatches}:`, batch.length);
    const batchRates = await fetchRatesForHotelIds(batch);
    allRates.push(...batchRates);
  }

  const ratesData: LiteApiRatesResponse = { data: allRates };
  console.log('💵 Rates data received:', { count: allRates.length });

  const facilityNameById = await getFacilityNameById();

  const hotelsWithRates = hotelsList.map((hotel): Hotel => {
    const hotelRates = ratesData.data?.find((r) => r.hotelId === hotel.id);

    let minPrice: number | null = null;
    let roomCount = 0;

    if (hotelRates && hotelRates.roomTypes) {
      roomCount = hotelRates.roomTypes.length;
      const prices: number[] = [];

      hotelRates.roomTypes.forEach(room => {
        if (room.rates && room.rates.length > 0) {
          room.rates.forEach(rate => {
            if (rate.retailRate && rate.retailRate.total && rate.retailRate.total.length > 0) {
              prices.push(rate.retailRate.total[0].amount);
            }
          });
        }
      });

      if (prices.length > 0) {
        minPrice = Math.min(...prices);
      }
    }

    const candidateImages: string[] = [];

    if (hotel.main_photo) candidateImages.push(hotel.main_photo);
    if (hotel.thumbnail && hotel.thumbnail !== hotel.main_photo) candidateImages.push(hotel.thumbnail);

    if (hotel.hotelImages && Array.isArray(hotel.hotelImages) && hotel.hotelImages.length > 0) {
      for (const img of hotel.hotelImages) {
        if (typeof img === 'string') {
          candidateImages.push(img);
        } else if (img && typeof img.url === 'string') {
          candidateImages.push(img.url);
        }
      }
    }

    if (hotelRates?.hotelData?.images && Array.isArray(hotelRates.hotelData.images) && hotelRates.hotelData.images.length > 0) {
      candidateImages.push(...hotelRates.hotelData.images);
    }

    const heroImage: string | null = candidateImages.length > 0 ? candidateImages[0] : null;
    const imagesList: string[] = candidateImages;

    const uniqueImages = toUniqueImageUrls(imagesList);

    const facilityIds: number[] = Array.isArray(hotel.facilityIds)
      ? hotel.facilityIds
          .map((v: unknown) => {
            if (typeof v === 'number') return v;
            if (typeof v === 'string') return Number(v);
            return Number.NaN;
          })
          .filter((n) => Number.isFinite(n))
      : [];

    const directFacilities: string[] = Array.isArray(hotel.hotelFacilities)
      ? hotel.hotelFacilities
      : Array.isArray(hotel.facilities)
        ? hotel.facilities
        : [];

    const mappedFacilities: string[] = directFacilities.length
      ? directFacilities
      : facilityIds
          .map((id) => facilityNameById.get(id))
          .filter((v): v is string => typeof v === 'string');

    const facilities = toUniqueImageUrls(mappedFacilities);

    return {
      id: hotel.id,
      name: hotel.name,
      address: hotel.address,
      city: hotel.city,
      country: hotel.country,
      heroImage: heroImage || uniqueImages[0] || '',
      images: uniqueImages,
      description: hotel.hotelDescription || '',
      starRating: hotel.stars ?? hotel.starRating ?? 0,
      rating: hotel.rating ?? 0,
      facilities,
      facilityIds,
      latitude: hotel.latitude ?? 0,
      longitude: hotel.longitude ?? 0,
      rates: hotelRates || null,
      minPrice: minPrice,
      roomCount: roomCount,
      available: !!(hotelRates && hotelRates.roomTypes && hotelRates.roomTypes.length > 0)
    };
  });

  hotelsWithRates.sort((a, b) => {
    if (a.available !== b.available) return a.available ? -1 : 1;
    if (a.minPrice === null && b.minPrice !== null) return 1;
    if (a.minPrice !== null && b.minPrice === null) return -1;
    if (a.minPrice !== null && b.minPrice !== null) return a.minPrice - b.minPrice;
    return 0;
  });

  return hotelsWithRates;
};
