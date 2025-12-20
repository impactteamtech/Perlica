
// Add a comment to force reload
export interface Destination {
  name: string;
  code: string;
  city: string;
}

export interface RoomType {
  rates: {
    retailRate: {
      total: {
        amount: number;
      }[];
    };
  }[];
}

export interface HotelData {
  images: string[];
}
export interface HotelRate {
  hotelId: string;
  roomTypes: RoomType[];
  hotelData?: HotelData;
}


export interface Hotel {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  heroImage: string;
  images: string[];
  description: string;
  starRating: number;
  rating: number;
  facilities: string[];
  latitude: number;
  longitude: number;
  rates: HotelRate | null;
  minPrice: number | null;
  roomCount: number;
  available: boolean;
}

export type Country = 'KE' | 'UG' | 'TZ';
