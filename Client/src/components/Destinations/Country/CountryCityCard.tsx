import React, { useEffect } from 'react';
import { MapPin} from 'lucide-react';
import { CITY_IMAGE_FALLBACK } from './constants';
import type { CityDestination } from '../../../lib/types';

type CountryCityCardProps = {
  destination: CityDestination;
  imageUrl: string;
  ensureImage: (countryCode: string, cityName: string) => void;
  onSelect: (destination: CityDestination) => void;
};

const CountryCityCard = ({ destination, imageUrl, ensureImage, onSelect }: CountryCityCardProps) => {
  useEffect(() => {
    ensureImage(destination.countryCode, destination.cityName);
  }, [destination.cityName, destination.countryCode, ensureImage]);

  return (
    <button
      type="button"
      onClick={() => onSelect(destination)}
      className="group relative w-full text-left cursor-pointer bg-white rounded-2xl shadow-md overflow-hidden  transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.99]  focus:ring-2"
      aria-label={`Open details for ${destination.cityName}`}
    >
      {/* Image Container with Overlay */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-t-2xl">
        <img
          src={imageUrl}
          alt={destination.cityName}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = CITY_IMAGE_FALLBACK;
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Country Badge on Image */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center space-x-1.5 shadow-sm">
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
          <span className="text-xs sm:text-sm font-medium text-gray-700">{destination.countryName}</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 md:p-6">
        {/* City Name with Accent Line */}
        <div className="mb-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-secondary mb-1 group-hover:text-secondary/90 transition-colors duration-300">
                {destination.cityName}
              </h3>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-gray-600 leading-relaxed line-clamp-2 transition-colors duration-300 group-hover:text-gray-700">
            {destination.description}
          </p>

          <div className="mt-4 flex items-center justify-end">
            <span className="text-sm sm:text-base font-medium text-secondary/70 group-hover:text-secondary transition-colors">
              Read more →
            </span>
          </div>
        </div>

      </div>

    </button>
  );
};

export default CountryCityCard;