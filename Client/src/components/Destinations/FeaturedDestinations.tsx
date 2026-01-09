import { useEffect, useMemo, useState, type JSX } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import CityCard from "./CityCard";
import { destinations } from "../../lib/staticData";

const placeholderImages = [
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
];

const FeaturedDestinations = (): JSX.Element => {
 

  const [selectedCountry, setSelectedCountry] = useState<string>(destinations[0].country);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState<number>(3);
  const selectedCities = useMemo(() => {
    return destinations.find((dest) => dest.country === selectedCountry)?.cities ?? [];
  }, [selectedCountry]);

  useEffect(() => {
    const computeCardsToShow = () => {
      const w = window.innerWidth;
      if (w < 640) return 1; // <sm
      if (w < 1024) return 2; // sm..md
      return 3; // lg+
    };

    const update = () => setCardsToShow(computeCardsToShow());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxStartIndex = useMemo(() => {
    return Math.max(0, selectedCities.length - cardsToShow);
  }, [selectedCities.length, cardsToShow]);

  const clampStartIndex = (value: number): number => {
    if (value < 0) return 0;
    if (value > maxStartIndex) return maxStartIndex;
    return value;
  };

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

  useEffect(() => {
    if (!selectedCities.length) return;

    const getCityImageUrl = (city: { image?: string }, absoluteIndex: number) => {
      return city.image || placeholderImages[absoluteIndex % placeholderImages.length];
    };

    const getNextStart = () => {
      const next = currentIndex + cardsToShow;
      return next > maxStartIndex ? 0 : next;
    };

    const getPrevStart = () => {
      const prev = currentIndex - cardsToShow;
      return prev < 0 ? maxStartIndex : prev;
    };

    const starts = [currentIndex, getNextStart(), getPrevStart()];
    const urls = new Set<string>();

    for (const start of starts) {
      const slice = selectedCities.slice(start, start + cardsToShow);
      slice.forEach((city, offset) => {
        urls.add(getCityImageUrl(city, start + offset));
      });
    }

    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [cardsToShow, currentIndex, maxStartIndex, selectedCities]);

  const pageCount = Math.ceil(selectedCities.length / cardsToShow);
  const currentPage = Math.floor(currentIndex / cardsToShow);

  return (
    <section className="px-4 py-10 sm:px-6 md:px-10 md:py-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl text-center lg:text-5xl 2xl:text-6xl color-primary font-mono title-font leading-tight">
          FEATURED DESTINATIONS
        </h2>
        <p className="text-font text-center mt-5 mb-4">
          Discover the most breathtaking destinations across East Africa
        </p>
        
        {/* Country Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {destinations.map((destination, index) => (
            <button
              key={index}
              onClick={() => handleCountryChange(destination.country)}
              className={`
                px-4 sm:px-6 md:px-10 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105
                ${selectedCountry === destination.country
                  ? 'bg-[#0cce10] text-white '
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
            type="button"
            onClick={prevSlide}
            disabled={selectedCities.length <= cardsToShow}
            aria-label="Previous destinations"
            title="Previous"
            className={`hidden sm:flex
              p-3 rounded-full transition-all duration-300 transform hover:scale-110
              ${selectedCities.length <= cardsToShow 
                ? 'opacity-30 cursor-not-allowed' 
                : 'bg-black text-white '
              }
            `}
          >
            <FaChevronLeft size={24} />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 flex-1 max-w-6xl">
            {visibleCities.map((city, index) => (
              <CityCard
                index={currentIndex + index}
                city={city}
                key={currentIndex + index}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            disabled={selectedCities.length <= cardsToShow}
            aria-label="Next destinations"
            title="Next"
            className={`hidden sm:flex
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

        {/* Mobile Controls */}
        {selectedCities.length > cardsToShow && (
          <div className="flex sm:hidden items-center justify-center gap-6 mt-6">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous destinations"
              title="Previous"
              className="p-3 rounded-full bg-black text-white"
            >
              <FaChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next destinations"
              title="Next"
              className="p-3 rounded-full bg-[#0cce10] text-white shadow-md"
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        )}

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