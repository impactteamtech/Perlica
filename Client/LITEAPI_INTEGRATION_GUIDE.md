# liteAPI Integration Guide for Perlica

## Overview

liteAPI is a hotel booking API that provides access to hotel search, availability, booking, and management features. This guide shows you how to integrate it into your React/TypeScript project.

## 1. Get API Credentials

1. Sign up at [liteAPI](https://www.liteapi.travel/)
2. Get your API key from the dashboard
3. Store it securely (never commit to git)

## 2. Environment Setup

Create or update `.env` file in your project root:

```env
VITE_LITEAPI_KEY=your_api_key_here
VITE_LITEAPI_BASE_URL=https://api.liteapi.travel/v3.0
```

Add `.env` to `.gitignore` if not already there.

## 3. Create API Service

Create `src/services/liteapi.service.ts`:

```typescript
// src/services/liteapi.service.ts

const LITEAPI_BASE_URL =
  import.meta.env.VITE_LITEAPI_BASE_URL || "https://api.liteapi.travel/v3.0";
const LITEAPI_KEY = import.meta.env.VITE_LITEAPI_KEY;

interface SearchParams {
  cityCode: string; // e.g., "PAR" for Paris, "NYC" for New York
  checkInDate: string; // YYYY-MM-DD
  checkOutDate: string; // YYYY-MM-DD
  adults: number;
  children?: number;
  currency?: string; // e.g., "USD", "EUR", "KES"
  guestNationality?: string; // ISO country code
}

interface Hotel {
  id: string;
  name: string;
  address: string;
  rating?: number;
  images?: string[];
  minRate?: number;
  currency?: string;
  latitude?: number;
  longitude?: number;
}

interface HotelDetails extends Hotel {
  description?: string;
  facilities?: string[];
  rooms?: Room[];
}

interface Room {
  id: string;
  name: string;
  description?: string;
  maxOccupancy: number;
  price: number;
  currency: string;
  images?: string[];
}

interface BookingParams {
  hotelId: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  paymentInfo?: {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
  };
}

class LiteAPIService {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = LITEAPI_BASE_URL;
    this.apiKey = LITEAPI_KEY;

    if (!this.apiKey) {
      console.warn(
        "liteAPI key is missing. Add VITE_LITEAPI_KEY to your .env file."
      );
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const headers = {
      "Content-Type": "application/json",
      "X-API-Key": this.apiKey,
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ message: "Unknown error" }));
        throw new Error(
          error.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("liteAPI request failed:", error);
      throw error;
    }
  }

  /**
   * Search for hotels by city and dates
   */
  async searchHotels(params: SearchParams): Promise<Hotel[]> {
    const queryParams = new URLSearchParams({
      cityCode: params.cityCode,
      checkin: params.checkInDate,
      checkout: params.checkOutDate,
      adults: params.adults.toString(),
      ...(params.children && { children: params.children.toString() }),
      ...(params.currency && { currency: params.currency }),
      ...(params.guestNationality && {
        guestNationality: params.guestNationality,
      }),
    });

    const response = await this.request<{ data: Hotel[] }>(
      `/hotels/search?${queryParams}`
    );
    return response.data || [];
  }

  /**
   * Get detailed information about a specific hotel
   */
  async getHotelDetails(
    hotelId: string,
    checkIn: string,
    checkOut: string
  ): Promise<HotelDetails> {
    const queryParams = new URLSearchParams({
      checkin: checkIn,
      checkout: checkOut,
    });

    const response = await this.request<{ data: HotelDetails }>(
      `/hotels/${hotelId}?${queryParams}`
    );
    return response.data;
  }

  /**
   * Get available rooms for a hotel
   */
  async getHotelRates(
    hotelId: string,
    checkIn: string,
    checkOut: string,
    adults: number,
    currency: string = "USD"
  ): Promise<Room[]> {
    const queryParams = new URLSearchParams({
      checkin: checkIn,
      checkout: checkOut,
      adults: adults.toString(),
      currency,
    });

    const response = await this.request<{ data: { rooms: Room[] } }>(
      `/hotels/${hotelId}/rates?${queryParams}`
    );
    return response.data?.rooms || [];
  }

  /**
   * Create a booking (pre-book to get booking ID and payment details)
   */
  async preBook(params: BookingParams): Promise<any> {
    const body = {
      hotelId: params.hotelId,
      roomId: params.roomId,
      checkin: params.checkInDate,
      checkout: params.checkOutDate,
      guest: params.guestInfo,
    };

    return await this.request("/bookings/prebook", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  /**
   * Confirm booking with payment
   */
  async confirmBooking(preBookId: string, paymentInfo: any): Promise<any> {
    const body = {
      preBookId,
      payment: paymentInfo,
    };

    return await this.request("/bookings/confirm", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  /**
   * Get booking details
   */
  async getBooking(bookingId: string): Promise<any> {
    return await this.request(`/bookings/${bookingId}`);
  }

  /**
   * Cancel a booking
   */
  async cancelBooking(bookingId: string): Promise<any> {
    return await this.request(`/bookings/${bookingId}/cancel`, {
      method: "POST",
    });
  }

  /**
   * Get list of supported cities
   */
  async getCities(countryCode?: string): Promise<any[]> {
    const queryParams = countryCode ? `?countryCode=${countryCode}` : "";
    const response = await this.request<{ data: any[] }>(
      `/data/cities${queryParams}`
    );
    return response.data || [];
  }

  /**
   * Get list of supported countries
   */
  async getCountries(): Promise<any[]> {
    const response = await this.request<{ data: any[] }>("/data/countries");
    return response.data || [];
  }
}

// Export singleton instance
export const liteAPI = new LiteAPIService();

// Export types
export type { SearchParams, Hotel, HotelDetails, Room, BookingParams };
```

## 4. Create React Hook for Hotel Search

Create `src/hooks/useHotelSearch.ts`:

```typescript
// src/hooks/useHotelSearch.ts

import { useState } from "react";
import { liteAPI, SearchParams, Hotel } from "../services/liteapi.service";

export const useHotelSearch = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchHotels = async (params: SearchParams) => {
    setLoading(true);
    setError(null);

    try {
      const results = await liteAPI.searchHotels(params);
      setHotels(results);
      return results;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to search hotels";
      setError(message);
      console.error("Hotel search error:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setHotels([]);
    setError(null);
  };

  return {
    hotels,
    loading,
    error,
    searchHotels,
    reset,
  };
};
```

## 5. Example Component: Hotel Search

Create `src/components/Hotels/HotelSearch.tsx`:

```typescript
// src/components/Hotels/HotelSearch.tsx

import React, { useState } from "react";
import { useHotelSearch } from "../../hooks/useHotelSearch";

const HotelSearch: React.FC = () => {
  const { hotels, loading, error, searchHotels } = useHotelSearch();

  const [searchParams, setSearchParams] = useState({
    cityCode: "NYC",
    checkInDate: "",
    checkOutDate: "",
    adults: 2,
    currency: "USD",
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await searchHotels(searchParams);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: name === "adults" ? parseInt(value) : value,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Search Hotels</h1>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-lg shadow-md p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">City Code</label>
            <input
              type="text"
              name="cityCode"
              value={searchParams.cityCode}
              onChange={handleChange}
              placeholder="e.g., NYC, PAR, LON"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Check-in</label>
            <input
              type="date"
              name="checkInDate"
              value={searchParams.checkInDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Check-out</label>
            <input
              type="date"
              name="checkOutDate"
              value={searchParams.checkOutDate}
              onChange={handleChange}
              min={searchParams.checkInDate}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Adults</label>
            <input
              type="number"
              name="adults"
              value={searchParams.adults}
              onChange={handleChange}
              min="1"
              max="10"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Currency</label>
            <select
              name="currency"
              value={searchParams.currency}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="KES">KES</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {loading ? "Searching..." : "Search Hotels"}
        </button>
      </form>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Results */}
      {hotels.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              {hotel.images && hotel.images[0] && (
                <img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{hotel.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{hotel.address}</p>
                {hotel.rating && (
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1 text-sm font-medium">
                      {hotel.rating}
                    </span>
                  </div>
                )}
                {hotel.minRate && (
                  <p className="text-lg font-bold text-blue-600">
                    {hotel.currency} {hotel.minRate.toFixed(2)}
                    <span className="text-sm font-normal text-gray-600">
                      {" "}
                      / night
                    </span>
                  </p>
                )}
                <button className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && hotels.length === 0 && searchParams.checkInDate && (
        <div className="text-center text-gray-500 py-12">
          No hotels found. Try adjusting your search criteria.
        </div>
      )}
    </div>
  );
};

export default HotelSearch;
```

## 6. Common City Codes for Kenya & East Africa

```typescript
// Useful city codes for your Perlica app
const KENYA_CITIES = {
  NAIROBI: "NBO",
  MOMBASA: "MBA",
  KISUMU: "KIS",
  NAKURU: "NKU",
  ELDORET: "EDL",
};

const EAST_AFRICA_CITIES = {
  // Tanzania
  DAR_ES_SALAAM: "DAR",
  ZANZIBAR: "ZNZ",
  ARUSHA: "ARK",

  // Uganda
  KAMPALA: "KLA",
  ENTEBBE: "EBB",

  // Rwanda
  KIGALI: "KGL",
};
```

## 7. Integration with Your Existing Components

You can integrate hotel search into your existing `SearchPackages` component:

```typescript
// Add to src/components/SearchPackages/SearchPackages.tsx

import { liteAPI } from "../../services/liteapi.service";

// In your search handler:
const handleHotelSearch = async () => {
  try {
    const hotels = await liteAPI.searchHotels({
      cityCode: selectedCity,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      adults: guestCount,
      currency: "KES",
      guestNationality: "KE",
    });

    // Display hotels in your UI
    setSearchResults(hotels);
  } catch (error) {
    console.error("Hotel search failed:", error);
  }
};
```

## 8. TypeScript Types Reference

```typescript
// Full type definitions for common use cases

interface Guest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality?: string;
}

interface BookingRequest {
  hotelId: string;
  roomId: string;
  checkin: string; // YYYY-MM-DD
  checkout: string; // YYYY-MM-DD
  guests: Guest[];
  currency: string;
  specialRequests?: string;
}

interface BookingResponse {
  bookingId: string;
  status: "confirmed" | "pending" | "cancelled";
  totalPrice: number;
  currency: string;
  hotel: {
    name: string;
    address: string;
  };
  confirmationNumber: string;
}
```

## 9. Error Handling Best Practices

```typescript
// Wrap API calls with proper error handling
const handleBooking = async () => {
  try {
    setLoading(true);
    const booking = await liteAPI.preBook(bookingParams);

    // Process successful booking
    if (booking.status === "success") {
      // Redirect to confirmation page
      navigate(`/booking-confirmation/${booking.bookingId}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      // Show user-friendly error message
      setError(error.message);
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};
```

## 10. Testing the Integration

```bash
# Install dependencies if needed
npm install

# Run your dev server
npm run dev

# Test the API in browser console:
# Open DevTools > Console and run:
```

```javascript
// Test API connection
fetch("https://api.liteapi.travel/v3.0/data/countries", {
  headers: {
    "X-API-Key": "your_api_key_here",
  },
})
  .then((r) => r.json())
  .then(console.log);
```

## 11. Next Steps

1. **Add the HotelSearch component** to your routing
2. **Create a hotel details page** showing rooms and rates
3. **Implement booking flow** with payment processing
4. **Add user authentication** to track bookings
5. **Store bookings** in your backend/database
6. **Set up webhooks** for booking confirmations

## 12. Security Notes

- ⚠️ Never expose your API key in client-side code for production
- Use a backend proxy to make liteAPI calls server-side
- Validate all user inputs before API calls
- Implement rate limiting to prevent abuse
- Use HTTPS for all API communications

## Resources

- [liteAPI Documentation](https://docs.liteapi.travel/)
- [API Reference](https://docs.liteapi.travel/reference)
- [Support](https://www.liteapi.travel/contact)

---

**Need help?** Check the liteAPI docs or create an issue in your project repo.
