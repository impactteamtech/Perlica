import { useState, type JSX } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import type { City } from "../../lib/types";
import CityCard from "./CityCard";

const FeaturedDestinations = (): JSX.Element => {
  const destinations: {
    country: string;
    cities: City[];
  }[] = [
    {
      country: 'Kenya',
      cities: [
        {
          name: "Nairobi",
          image: "",
          description: "The bustling capital city of Kenya, known for its vibrant culture and wildlife."
        },
        {
          name: "Maasai Mara National Reserve",
          image: "",
          description: "A world-renowned wildlife reserve in Kenya, famous for the Great Migration."
        },
        {
          name: "Mombasa",
          image: "",
          description: "A coastal city famous for its beautiful beaches and historical sites."
        },
        {
          name: "Mount Kenya National Park",
          image: "",
          description: "Home to Africa's second-highest mountain, great for hiking and adventure."
        },
        {
          name: "Lake Nakuru",
          image: "",
          description: "Famous for its flamingos and beautiful pink-colored lake views."
        },
        {
          name: "Hell's Gate National Park",
          image: "",
          description: "Known for rock formations, geothermal features, and cycling between giraffes!"
        }
      ]
    },
    {
      country: 'Uganda',
      cities: [
        {
          name: "Bwindi Impenetrable National Park",
          description: "Famous for mountain gorilla trekking, one of the most unique experiences in Africa.",
          image: ""
        },
        {
          name: "Murchison Falls National Park",
          description: "Where the Nile River explodes through a narrow gorge — breathtaking waterfall.",
          image: ""
        },
        {
          name: "Kampala",
          description: "The capital city — lively markets, culture, and great nightlife.",
          image: ""
        },
        {
          name: "Queen Elizabeth National Park",
          description: "Diverse wildlife including tree-climbing lions and beautiful landscapes.",
          image: ""
        },
        {
          name: "Lake Bunyonyi",
          description: "A serene lake surrounded by hills, perfect for relaxation and birdwatching.",
          image: "",
        },
        {
          name: "Rwenzori Mountains National Park",
          description: "Known as the 'Mountains of the Moon,' great for trekking and stunning scenery.",
          image: ""
        }
      ]
    },
    {
      country: "Zanzibar",
      cities: [
        {
          name: "Zanzibar Island (Stone Town)",
          description: "A UNESCO site with Arab-Swahili architecture, spice markets, and rich culture.",
          image: ""
        },
        {
          name: "Nungwi Beach",
          description: "Stunning sunsets, clear waters, and perfect for diving and relaxation.",
          image: "",
        },
        {
          name: "Mnemba Atoll",
          description: "Famous for snorkeling, dolphins, and crystal-clear coral reefs.",
          image: ""
        }
      ]
    }
  ];

  const [selectedCountry, setSelectedCountry] = useState<string>(destinations[0].country);
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedCities = destinations.find((dest) => dest.country === selectedCountry)?.cities || [];

  // Number of cards to show at once
  const cardsToShow = 3;

  const nextSlide = () => {
    if (selectedCities.length <= cardsToShow) return;
    setCurrentIndex((prevIndex) => 
      prevIndex + cardsToShow >= selectedCities.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (selectedCities.length <= cardsToShow) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? selectedCities.length - cardsToShow : prevIndex - 1
    );
  };

  // Reset index when country changes
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setCurrentIndex(0);
  };

  // Get visible cities based on current index
  const visibleCities = selectedCities.slice(currentIndex, currentIndex + cardsToShow);

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
                px-7 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105
                ${selectedCountry === destination.country
                  ? 'bg-secondary text-white shadow-lg'
                  : 'bg-white/80 text-black  hover:border-secondary hover:bg-gray-100'
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

          {/* Cities Cards Container */}
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

          {/* Right Navigation Button */}
          <button
            onClick={nextSlide}
            disabled={selectedCities.length <= cardsToShow}
            className={`
              p-3 rounded-full transition-all duration-300 transform hover:scale-110
              ${selectedCities.length <= cardsToShow 
                ? 'opacity-30 cursor-not-allowed' 
                : 'bg-secondary text-white shadow-md'
              }
            `}
          >
            <FaChevronRight size={24} />
          </button>
        </div>

        {/* Carousel Indicators */}
        {selectedCities.length > cardsToShow && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(selectedCities.length / cardsToShow) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * cardsToShow)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex >= index * cardsToShow && currentIndex < (index + 1) * cardsToShow
                    ? 'bg-secondary/80 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
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