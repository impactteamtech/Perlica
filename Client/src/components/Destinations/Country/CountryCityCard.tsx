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
      className="group relative text-left bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:ring-offset-2"
      aria-label={`Open details for ${destination.cityName}`}
    >
      {/* Image Container with Overlay */}
      <div className="relative h-70 overflow-hidden rounded-t-2xl">
        <img
          src={imageUrl}
          alt={destination.cityName}
          className="w-full h-full object- transition-transform duration-700 group-hover:scale-110"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = CITY_IMAGE_FALLBACK;
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Country Badge on Image */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-1.5 shadow-sm">
          <MapPin className="w-4 h-4 text-secondary" />
          <span className="text-sm font-medium text-gray-700">{destination.countryName}</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 relative">
        {/* City Name with Accent Line */}
        <div className="mb-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-1 group-hover:text-secondary/90 transition-colors duration-300">
                {destination.cityName}
              </h3>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="relative">
          <p className="text-gray-600 leading-relaxed line-clamp-2 transition-colors duration-300 group-hover:text-gray-700">
            {destination.description}
          </p>
          
          <div className="absolute bottom-0 left-0 right-0  transition-opacity duration-300 flex items-end justify-end">
            <span className="text-xl font-medium text-secondary/70">Read more →</span>
          </div>
        </div>

      </div>

    </button>
  );
};

export default CountryCityCard;