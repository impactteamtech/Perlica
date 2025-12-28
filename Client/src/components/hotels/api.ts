

import type { Hotel, HotelRate, Destination, Country } from './types';

const API_KEY = 'sand_c0155ab8-c683-4f26-8f94-b5e92c5797b9';

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

  if (!hotelsData.data || hotelsData.data.length === 0) {
    throw new Error('No hotels found for this destination');
  }

  const hotelsList = hotelsData.data.slice(0, 5);
  console.log('📋 Processing hotels:', hotelsList.length);

  const hotelIds = hotelsList.map((h: any) => h.id);

  console.log('💰 Fetching rates for hotels:', hotelIds);
  const ratesResponse = await fetch(
    'https://api.liteapi.travel/v3.0/hotels/rates',
    {
      method: 'POST',
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        checkin: checkIn,
        checkout: checkOut,
        currency: 'USD',
        guestNationality: 'US',
        hotelIds: hotelIds,
        includeHotelData: true,
        occupancies: [
          {
            adults: guests,
            children: []
          }
        ]
      })
    }
  );

  if (!ratesResponse.ok) {
    throw new Error(`Failed to fetch rates: ${ratesResponse.status}`);
  }

  const ratesData = await ratesResponse.json();
  console.log('💵 Rates data received:', ratesData);

  const hotelsWithRates = hotelsList.map((hotel: any): Hotel => {
    const hotelRates = ratesData.data?.find((r: any) => r.hotelId === hotel.id) as HotelRate | undefined;

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

    let heroImage: string | null = null;
    let imagesList: string[] = [];

    if (hotelRates?.hotelData?.images && Array.isArray(hotelRates.hotelData.images) && hotelRates.hotelData.images.length > 0) {
      heroImage = hotelRates.hotelData.images[0];
      imagesList = hotelRates.hotelData.images;
    } else if (hotel.main_photo) {
      heroImage = hotel.main_photo;
      imagesList = [hotel.main_photo];
      if (hotel.thumbnail && hotel.thumbnail !== hotel.main_photo) {
        imagesList.push(hotel.thumbnail);
      }
    } else if (hotel.hotelImages && Array.isArray(hotel.hotelImages) && hotel.hotelImages.length > 0) {
      heroImage = hotel.hotelImages[0].url || hotel.hotelImages[0];
      imagesList = hotel.hotelImages.map((img: { url?: string } | string) => 
        typeof img === 'string' ? img : (img.url || '')
      );
    }

    return {
      id: hotel.id,
      name: hotel.name,
      address: hotel.address,
      city: hotel.city,
      country: hotel.country,
      heroImage: heroImage || '',
      images: imagesList,
      description: hotel.hotelDescription,
      starRating: hotel.stars || hotel.starRating,
      rating: hotel.rating,
      facilities: hotel.hotelFacilities || [],
      latitude: hotel.latitude,
      longitude: hotel.longitude,
      rates: hotelRates || null,
      minPrice: minPrice,
      roomCount: roomCount,
      available: !!(hotelRates && hotelRates.roomTypes && hotelRates.roomTypes.length > 0)
    };
  });

  const availableHotels = hotelsWithRates.filter((h: Hotel) => h.available);

  if (availableHotels.length === 0) {
    throw new Error('No available rooms found for these dates. Try different dates or destination.');
  }

  return availableHotels;
};
