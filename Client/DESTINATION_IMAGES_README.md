# Destination Images - Important Information

## ⚠️ LiteAPI Does NOT Provide Destination Images

### What is LiteAPI?

[LiteAPI](https://www.liteapi.travel/) is a **hotel booking API**, NOT a general destination/city information API.

### What LiteAPI Provides

✅ **Hotel search** with hotel images  
✅ **Hotel details** including photos  
✅ **Room availability** and rates  
✅ **Booking management** and reservations  
✅ **Basic city/country data** (city codes, country codes, names)

### What LiteAPI Does NOT Provide

❌ **City/destination images**  
❌ **Tourist attraction photos**  
❌ **Destination descriptions**  
❌ **Points of interest**  
❌ **City landmarks or scenery photos**

## Current Solution

We implemented a workaround using **Unsplash Source API** to dynamically fetch beautiful destination images based on city names.

### Implementation

See `Country.tsx` - the `getDestinationImage()` function:

```typescript
const getDestinationImage = (cityName: string, countryCode: string): string => {
  const cleanCityName = encodeURIComponent(cityName);
  const width = 800;
  const height = 600;

  // Specific mappings for popular destinations
  const destinationImages: Record<string, string> = {
    Nairobi: `https://source.unsplash.com/800x600/?nairobi,kenya,city`,
    Mombasa: `https://source.unsplash.com/800x600/?mombasa,beach,kenya`,
    // ... more cities
  };

  return (
    destinationImages[cityName] ||
    `https://source.unsplash.com/${width}x${height}/?${cleanCityName},travel`
  );
};
```

## Alternative Solutions

### Option 1: Use a Dedicated Destination API

- **Amadeus Travel API** - Comprehensive destination data
- **Foursquare Places API** - Points of interest with photos
- **Google Places API** - Rich location data with images
- **TripAdvisor API** - Tourist attractions with reviews and photos

### Option 2: Use Free Image APIs

- **Unsplash API** (current solution) - High-quality free photos
- **Pexels API** - Free stock photos
- **Pixabay API** - Free images and videos
- **Flickr API** - User-generated travel photos

### Option 3: Curated Database

Store your own curated destination images:

1. Create a destinations database table
2. Manually upload quality images for each destination
3. Map city codes to image URLs
4. Store in CDN for fast delivery

### Option 4: Hybrid Approach

Combine multiple sources:

```typescript
async getDestinationImage(cityName: string): Promise<string> {
  // 1. Check local database first
  const localImage = await db.getDestinationImage(cityName);
  if (localImage) return localImage;

  // 2. Try destination-specific API
  const apiImage = await amadeus.getDestinationPhoto(cityName);
  if (apiImage) return apiImage;

  // 3. Fall back to Unsplash
  return `https://source.unsplash.com/800x600/?${cityName},travel`;
}
```

## Production Recommendations

### 1. Image Caching

Cache Unsplash images to reduce API calls and improve performance:

```typescript
const imageCache = new Map<string, string>();

const getCachedDestinationImage = (cityName: string): string => {
  if (imageCache.has(cityName)) {
    return imageCache.get(cityName)!;
  }

  const imageUrl = getDestinationImage(cityName);
  imageCache.set(cityName, imageUrl);
  return imageUrl;
};
```

### 2. CDN Integration

Upload images to a CDN like Cloudinary or AWS S3:

```typescript
const destinationImages = {
  Nairobi: "https://cdn.yoursite.com/destinations/nairobi.jpg",
  Mombasa: "https://cdn.yoursite.com/destinations/mombasa.jpg",
};
```

### 3. Lazy Loading

Implement lazy loading for better performance:

```tsx
<img
  src={destination.image}
  alt={destination.name}
  loading="lazy"
  onError={(e) => {
    e.currentTarget.src = "/fallback-destination.jpg";
  }}
/>
```

### 4. Image Optimization

- Serve WebP format with JPEG fallback
- Use responsive images with `srcset`
- Compress images (aim for < 200KB)
- Add blur placeholder while loading

### 5. Fallback Strategy

Always have fallback images:

```typescript
const FALLBACK_IMAGES = {
  city: "/images/fallback-city.jpg",
  beach: "/images/fallback-beach.jpg",
  nature: "/images/fallback-nature.jpg",
};

const getImageWithFallback = (cityName: string, category: string) => {
  return (
    getDestinationImage(cityName) ||
    FALLBACK_IMAGES[category] ||
    "/images/fallback-default.jpg"
  );
};
```

## API Rate Limits

### Unsplash Source API

- **Free tier**: 50 requests/hour
- No API key required for source.unsplash.com
- For production, use official Unsplash API with higher limits

### Recommended for Production

Use the official Unsplash API with authentication:

```typescript
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const searchUnsplashImage = async (query: string) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&per_page=1`,
    {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  const data = await response.json();
  return data.results[0]?.urls?.regular;
};
```

## Summary

**Problem**: LiteAPI provides hotel data, not destination images.

**Solution**: We use Unsplash to fetch destination images dynamically.

**For Production**: Consider using:

1. Curated image database with CDN
2. Dedicated destination API (Amadeus, Google Places)
3. Official Unsplash API with caching
4. Hybrid approach with multiple fallbacks

---

**Last Updated**: December 26, 2025  
**Related Files**: `Client/src/components/Destinations/Country/Country.tsx`
