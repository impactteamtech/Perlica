import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search } from 'lucide-react'; 
import type { Hotel, Country } from './types';
// @ts-ignore
import { searchHotels } from './api';
import CountryTabs from './CountryTabs';
import SearchForm from './SearchForm';
import HotelCard from './HotelCard';
import HotelDetailsModal from './HotelDetailsModal';

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

    try {
      const results = await searchHotels(destination, checkIn, checkOut, guests, selectedCountry);
      setHotels(results);
    } catch (err: any) {
      setError(err.message || 'An error occurred while searching');
      console.error('❌ Search error:', err);
    } finally {
      setLoading(false);
    }
  };
  console.log("selected hotel", selectedHotel?.facilities);
  return (
    <div className="min-h-screen  flex flex-col font-sans">
      
      <div className="relative h-[100vh] w-full flex items-center justify-center flex-col overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0  z-0">
          <img 
            src="/hotels-main-image.jpg" 
            alt="Luxury Hotel"
            className="h-full w-full object-cover object-center"
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#efebe5]" />
        </div>

        <div className="z-10 w-full max-w-5xl px-4 flex flex-col items-center text-center space-y-8 mt-[-50px]">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-2"
          >
            <h1 className="text-4xl md:text-6xl text-white font-extrabold tracking-tight drop-shadow-lg">
              Find the Most Beautiful <br/> 
              <span className="text-[#04c41a]">Hotels in Africa</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl font-light max-w-2xl mx-auto">
              Experience luxury and comfort in the heart of the continent.
            </p>
          </motion.div>

          {/* Search Container - Glassmorphism Effect */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full  backdrop-blur-md border-gray-50/30 border  rounded-3xl shadow-2xl"
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

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-0 relative z-20 pb-20">
        
     
        {/* Results Header */}
        {hotels.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between mb-8 mt-30"
          >
            <h2 className="text-4xl color-primary font-bold text-gray-900">
              Available Stays
            </h2>
            <span className="bg-orange-100 text-orange-800 text-sm font-medium px-4 py-1 rounded-full">
              {hotels.length} results found
            </span>
          </motion.div>
        )}

        {/* Loading State Skeleton */}
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

        {/* Grid of Hotels */}
        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1  gap-8"
            layout
          >
            {hotels.map((hotel, index) => (
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

        {/* Empty State (Before Search or No Results) */}
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
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedHotel && (
          <HotelDetailsModal hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HotelSearchPage;