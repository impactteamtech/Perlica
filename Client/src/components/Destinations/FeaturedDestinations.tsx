import { useEffect, useMemo, useState, type JSX } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import CityCard from "./CityCard";
import { destinations } from "../../lib/staticData";
const FeaturedDestinations = (): JSX.Element => {
 

  const [selectedCountry, setSelectedCountry] = useState<string>(destinations[0].country);
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedCities = destinations.find((dest) => dest.country === selectedCountry)?.cities || [];

  // Number of cards to show at once
  const cardsToShow = 3;

  const maxStartIndex = useMemo(() => {
    return Math.max(0, selectedCities.length - cardsToShow);
  }, [selectedCities.length]);

  const clampStartIndex = (value: number): number => {
    if (value < 0) return 0;
    if (value > maxStartIndex) return maxStartIndex;
    return value;
  };

  // Keep index valid when cities list changes (e.g. country switch)
  useEffect(() => {
    setCurrentIndex((prev) => clampStartIndex(prev));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxStartIndex]);

  const nextSlide = () => {
    if (selectedCities.length <= cardsToShow) return;
    setCurrentIndex((prevIndex) => {
      const next = prevIndex + cardsToShow;
      return next > maxStartIndex ? 0 : next;
    });
  };

  const prevSlide = () => {
    if (selectedCities.length <= cardsToShow) return;
    setCurrentIndex((prevIndex) => {
      const prev = prevIndex - cardsToShow;
      return prev < 0 ? maxStartIndex : prev;
    });
  };

  // Reset index when country changes
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setCurrentIndex(0);
  };

  // Get visible cities based on current index
  const visibleCities = selectedCities.slice(currentIndex, currentIndex + cardsToShow);

  const pageCount = Math.ceil(selectedCities.length / cardsToShow);
  const currentPage = Math.floor(currentIndex / cardsToShow);

  return (
    <section className="px-6 py-10 md:px-10 md:py-5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary font-mono text-center mb-4">
          FEATURED DESTINATIONS
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Discover the most breathtaking destinations across East Africa
        </p>
        
        {/* Country Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {destinations.map((destination, index) => (
            <button
              key={index}
              onClick={() => handleCountryChange(destination.country)}
              className={`
                px-10 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105
                ${selectedCountry === destination.country
                  ? 'bg-[#0cce10] text-white shadow-lg'
                  : 'bg-white text-black '
                }
              `}
            >
              {destination.country}
            </button>
          ))}
        </div>

        {/* Cities Carousel */}
        <div className="flex items-center justify-center gap-4">
          {/* Left Navigation Button */}
          <button
            onClick={prevSlide}
            disabled={selectedCities.length <= cardsToShow}
            aria-label="Previous destinations"
            title="Previous"
            className={`
              p-3 rounded-full transition-all duration-300 transform hover:scale-110
              ${selectedCities.length <= cardsToShow 
                ? 'opacity-30 cursor-not-allowed' 
                : 'bg-black text-white shadow-md'
              }
            `}
          >
            <FaChevronLeft size={24} />
          </button>

          <div className="flex gap-6 p-2 justify-center flex-1 max-w-10xl overflow-hidden">
            {visibleCities.map((city, index) => (
              <CityCard
                index={currentIndex + index}
                city={city}
                key={currentIndex + index}
              />
            ))}
            
            {/* Show empty states if needed for consistent layout */}
            {visibleCities.length < cardsToShow && 
              Array.from({ length: cardsToShow - visibleCities.length }).map((_, index) => (
                <div key={`empty-${index}`} className="w-80 opacity-0" />
              ))
            }
          </div>

          <button
            onClick={nextSlide}
            disabled={selectedCities.length <= cardsToShow}
            aria-label="Next destinations"
            title="Next"
            className={`
              p-3 rounded-full transition-all duration-300 transform hover:scale-110
              ${selectedCities.length <= cardsToShow 
                ? 'opacity-30 cursor-not-allowed' 
                : 'bg-[#0cce10] text-white shadow-md'
              }
            `}
          >
            <FaChevronRight size={24} />
          </button>
        </div>

        {selectedCities.length > cardsToShow && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(clampStartIndex(index * cardsToShow))}
                aria-label={`Go to page ${index + 1}`}
                title={`Go to page ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentPage === index
                    ? 'bg-[#0cce10] scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}

        {selectedCities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No destinations found for the selected country.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedDestinations;