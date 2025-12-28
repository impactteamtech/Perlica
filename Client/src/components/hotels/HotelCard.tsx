
import React from 'react';
import { MapPin } from 'lucide-react';
import type { Hotel } from './types';
import StarRating from './StarRating';
import HotelFacilities from './HotelFacilities';

interface HotelCardProps {
  hotel: Hotel;
  onSelectHotel: (hotel: Hotel) => void;
}

const stripHtml = (html: string) => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html || '';
  return tmp.textContent || tmp.innerText || '';
};

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onSelectHotel }) => (
  <div className="bg-white   rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div className="md:flex h-70">
      <div className="">
        <img
          src={hotel.heroImage || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}
          alt={hotel.name}
          className="w-100 h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400';
          }}
        />
      </div>

      <div className="md:w-2/3 p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800">
              {hotel.name || 'Hotel Name Not Available'}
            </h3>

            <p className="text-gray-600 mt-1 flex items-center gap-1">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              {hotel.address ? (
                <span>{hotel.address}, {hotel.city}</span>
              ) : (
                <span>{hotel.city}, {hotel.country}</span>
              )}
            </p>

            {hotel.starRating && (
              <div className="flex items-center mt-2 gap-2">
                <StarRating rating={hotel.starRating} />
                <span className="text-sm text-gray-600">
                  {hotel.starRating} Star Hotel
                </span>
                {hotel.rating && (
                  <span className="text-sm text-gray-600">
                    • Guest Rating: {hotel.rating}/10
                  </span>
                )}
              </div>
            )}

            {hotel.facilities && hotel.facilities.length > 0 && (
              <HotelFacilities facilities={hotel.facilities} />
            )}

            {hotel.description && (
              <p className="text-gray-700 mt-3 text-sm line-clamp-2">
                {stripHtml(hotel.description)}
              </p>
            )}

            <p className="text-sm text-gray-600 mt-2">
              {hotel.roomCount} room type{hotel.roomCount > 1 ? 's' : ''} available
            </p>
          </div>

          <div className="text-right ml-4 flex-shrink-0">
            {hotel.minPrice !== null && !isNaN(hotel.minPrice) ? (
              <>
                <div className="text-sm text-gray-500">From</div>
                <div className="text-3xl font-bold text-[#04c41a]">
                  ${hotel.minPrice.toFixed(2)}
                </div>
                <p className="text-sm text-gray-600">per night</p>
              </>
            ) : (
              <div className="text-gray-500">
                Check availability
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => onSelectHotel(hotel)}
            className="bg-[#04c41a] hover:bg-[#039e14] text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            View Details & Book
          </button>
          {hotel.latitude && hotel.longitude && (
            <a
              href={`https://maps.google.com/?q=${hotel.latitude},${hotel.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              View on Map
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default HotelCard;
