import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search } from 'lucide-react'; 
import type { Hotel, Country } from './types';
import { searchHotels } from './api';
import CountryTabs from './CountryTabs';
import SearchForm from './SearchForm';
import HotelCard from './HotelCard';
import HotelDetailsModal from './HotelDetailsModal';
import HotelBookingLeadFormModal from './HotelBookingLeadFormModal';
import HotelFilters, { type HotelSortBy } from './HotelFilters';

const HotelSearchPage: React.FC = () => {
  // State
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country>('KE');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [bookingFormOpen, setBookingFormOpen] = useState(false);
  const [bookingUrl, setBookingUrl] = useState<string | null>(null);
  const [bookingHotelName, setBookingHotelName] = useState<string>('');

  // Filters + paging
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minStars, setMinStars] = useState<number>(0);
  const [minGuestRating, setMinGuestRating] = useState<string>('');
  const [minRoomTypes, setMinRoomTypes] = useState<string>('');
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<HotelSortBy>('recommended');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Default dates
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);

    setCheckIn(tomorrow.toISOString().split('T')[0]);
    setCheckOut(dayAfter.toISOString().split('T')[0]);
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setHasSearched(true);
    // Clear previous results while loading for better UX
    setHotels([]); 
    setVisibleCount(12);

    try {
      const results = await searchHotels(destination, checkIn, checkOut, guests, selectedCountry);
      setHotels(results);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred while searching';
      setError(message);
      console.error('❌ Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredHotels = React.useMemo(() => {
    const minPriceNum = minPrice.trim().length ? Number(minPrice) : null;
    const maxPriceNum = maxPrice.trim().length ? Number(maxPrice) : null;
    const minGuestRatingNum = minGuestRating.trim().length ? Number(minGuestRating) : null;
    const minRoomTypesNum = minRoomTypes.trim().length ? Number(minRoomTypes) : null;

    const withinPrice = (h: Hotel) => {
      if (minPriceNum === null && maxPriceNum === null) return true;
      if (h.minPrice === null || Number.isNaN(h.minPrice)) return false;
      if (minPriceNum !== null && h.minPrice < minPriceNum) return false;
      if (maxPriceNum !== null && h.minPrice > maxPriceNum) return false;
      return true;
    };

    const withinRatings = (h: Hotel) => {
      if (minStars > 0 && (h.starRating ?? 0) < minStars) return false;
      if (minGuestRatingNum !== null && (h.rating ?? 0) < minGuestRatingNum) return false;
      if (minRoomTypesNum !== null && (h.roomCount ?? 0) < minRoomTypesNum) return false;
      if (onlyAvailable && !h.available) return false;
      return true;
    };

    const list = hotels.filter((h) => withinPrice(h) && withinRatings(h));

    const compareRecommended = (a: Hotel, b: Hotel) => {
      if (a.available !== b.available) return a.available ? -1 : 1;
      if (a.minPrice === null && b.minPrice !== null) return 1;
      if (a.minPrice !== null && b.minPrice === null) return -1;
      if (a.minPrice !== null && b.minPrice !== null) return a.minPrice - b.minPrice;
      return (b.rating ?? 0) - (a.rating ?? 0);
    };

    const compare = (a: Hotel, b: Hotel) => {
      switch (sortBy) {
        case 'price_low':
          return (a.minPrice ?? Number.POSITIVE_INFINITY) - (b.minPrice ?? Number.POSITIVE_INFINITY);
        case 'price_high':
          return (b.minPrice ?? Number.NEGATIVE_INFINITY) - (a.minPrice ?? Number.NEGATIVE_INFINITY);
        case 'rating_high':
          return (b.rating ?? 0) - (a.rating ?? 0);
        case 'stars_high':
          return (b.starRating ?? 0) - (a.starRating ?? 0);
        case 'rooms_high':
          return (b.roomCount ?? 0) - (a.roomCount ?? 0);
        case 'recommended':
        default:
          return compareRecommended(a, b);
      }
    };

    return list.slice().sort(compare);
  }, [hotels, minPrice, maxPrice, minStars, minGuestRating, minRoomTypes, onlyAvailable, sortBy]);

  useEffect(() => {
    setVisibleCount(12);
  }, [minPrice, maxPrice, minStars, minGuestRating, minRoomTypes, onlyAvailable, sortBy]);

  const visibleHotels = filteredHotels.slice(0, visibleCount);
  console.log("selected hotel", selectedHotel?.facilities);
  return (
    <div className="min-h-screen  flex flex-col font-sans">
      
      <div className="relative min-h-[100svh] w-full flex items-center justify-center flex-col overflow-hidden py-20 lg:py-15 2xl:py-10">
        <div className="absolute inset-0  z-0">
          <img 
            src="/hotels-main-image.jpg" 
            alt="Luxury Hotel"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#efebe5]" />
        </div>

        <div className="z-10 w-full max-w-5xl px-4 flex flex-col items-center text-center space-y-6 sm:space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space"
          >
            <h1 className="text-4xl sm:text-5xl 2xl:text-6xl text-white font-extrabold tracking-tight drop-shadow-lg">
              Find the Most Beautiful <br/> 
              <span className="text-[#04c41a]">Hotels in Africa</span>
            </h1>
         
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full backdrop-blur-md border-gray-50/30 border rounded-3xl shadow-2xl"
          >
              <CountryTabs
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                setDestination={setDestination}
                setHotels={setHotels}
              />

              <SearchForm
                destination={destination}
                setDestination={setDestination}
                checkIn={checkIn}
                setCheckIn={setCheckIn}
                checkOut={checkOut}
                setCheckOut={setCheckOut}
                guests={guests}
                setGuests={setGuests}
                loading={loading}
                error={error}
                selectedCountry={selectedCountry}
                onSearch={handleSearch}
              />
           
          </motion.div>
        </div>
      </div>

      <div className="flex-1 w-full  px-4 sm:px-6 lg:px-8 mt-0 relative z-20 pb-20">
        {hotels.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 mt-10 sm:mt-14 lg:mt-20"
          >
            <h2 className="text-4xl color-primary font-bold text-gray-900">
              STAYS
            </h2>
            <span className="self-start sm:self-auto bg-orange-100 text-orange-800 text-sm font-medium px-4 py-1 rounded-full">
              {filteredHotels.length} results found
            </span>
          </motion.div>
        )}

        {hotels.length > 0 && !loading && (
          <HotelFilters
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            minStars={minStars}
            setMinStars={setMinStars}
            minGuestRating={minGuestRating}
            setMinGuestRating={setMinGuestRating}
            minRoomTypes={minRoomTypes}
            setMinRoomTypes={setMinRoomTypes}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onlyAvailable={onlyAvailable}
            setOnlyAvailable={setOnlyAvailable}
            visibleCount={visibleCount}
            totalCount={filteredHotels.length}
          />
        )}

        {loading && (
          <div className="grid grid-cols-1 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl overflow-hidden shadow-lg h-96 animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-10 bg-gray-200 rounded w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1  gap-8"
            layout
          >
            {visibleHotels.map((hotel, index) => (
              <motion.div
                key={hotel.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                layout
              >
                <HotelCard hotel={hotel} onSelectHotel={setSelectedHotel} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {!loading && filteredHotels.length > visibleCount && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setVisibleCount((c) => c + 12)}
              className="bg-[#04c41a] hover:bg-[#039e14] text-white font-semibold py-3 px-8 rounded-xl transition-colors"
            >
              See more hotels
            </button>
          </div>
        )}

        {!loading && hotels.length === 0 && !error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center  justify-center py-20"
          >
            <div className="bg-gray-50 p-6 rounded-full mb-6">
              {hasSearched ? (
                 <Search className="w-12 h-12 text-red-500" />
              ) : (
                 <MapPin className="w-12 h-12 text-red-500 " />
              )}
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {hasSearched ? 'No hotels found' : 'Ready to explore?'}
            </h3>
            <p className="text-gray-600 text-lg text-center max-w-md">
              {hasSearched 
                ? 'Try adjusting your dates or destination to find available properties.' 
                : 'Select your dream destination in Africa and start your journey.'}
            </p>
          </motion.div>
        )}

        {!loading && hotels.length > 0 && filteredHotels.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <div className="bg-gray-50 p-6 rounded-full mb-6">
              <Search className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">No results match your filters</h3>
            <p className="text-gray-600 text-lg text-center max-w-md">
              Try widening your price range, lowering rating thresholds, or disabling “Only available”.
            </p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedHotel && (
          <HotelDetailsModal
            hotel={selectedHotel}
            onClose={() => setSelectedHotel(null)}
            onBookNow={(url) => {
              setSelectedHotel(null);
              setBookingUrl(url);
              setBookingHotelName(selectedHotel.name);
              setBookingFormOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {bookingFormOpen && (
          <HotelBookingLeadFormModal
            open={bookingFormOpen}
            bookingUrl={bookingUrl}
            hotelName={bookingHotelName}
            onClose={() => setBookingFormOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HotelSearchPage;