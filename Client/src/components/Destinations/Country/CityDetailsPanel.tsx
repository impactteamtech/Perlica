import React, { useEffect, useMemo, useState } from 'react';
import { MapPin, X } from 'lucide-react';

type CityDetails = {
  images: string[];
  hotelName?: string;
  hotelRating?: number;
  reviewCount?: number;
  stars?: number;
  address?: string;
  snippet?: string;
};

type CityDestinationLike = {
  cityName: string;
  countryName: string;
  description: string;
};

type CityDetailsPanelProps = {
  destination: CityDestinationLike;
  details?: CityDetails;
  imageUrl: string;
  fallbackImageUrl: string;
  onClose: () => void;
};

const CityDetailsPanel = ({ destination, details, imageUrl, fallbackImageUrl, onClose }: CityDetailsPanelProps) => {
  const images = useMemo(
    () =>
      Array.from(
        new Set(
          (details?.images?.length ? details.images : [imageUrl || fallbackImageUrl])
            .filter((v): v is string => typeof v === 'string')
            .map((v) => v.trim())
            .filter((v) => v.length > 0)
        )
      ).slice(0, 4),
    [details, imageUrl, fallbackImageUrl]
  );

  const [selectedImage, setSelectedImage] = useState<string>(images[0] || fallbackImageUrl);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyPaddingRight = body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - html.clientWidth;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = prevBodyOverflow;
      html.style.overflow = prevHtmlOverflow;
      body.style.paddingRight = prevBodyPaddingRight;
    };
  }, []);

  useEffect(() => {
    setSelectedImage(images[0] || imageUrl || fallbackImageUrl);
  }, [images, imageUrl, fallbackImageUrl]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center p-2 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${destination.cityName} details`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

      <div
        className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-4xl h-[92dvh] sm:h-auto sm:max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="relative h-56 sm:h-72 md:h-80 group bg-gray-100">
            <img
              src={selectedImage || fallbackImageUrl}
              alt={`${destination.cityName} photo`}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.src = fallbackImageUrl;
              }}
            />

            <button
              type="button"
              aria-label="Close city details"
              title="Close"
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-all hover:rotate-90"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 leading-tight">{destination.cityName}</h2>
              <div className="flex items-center gap-2 text-gray-200">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#04c41a]" />
                <span className="text-sm sm:text-base md:text-lg">{destination.countryName}</span>
              </div>
            </div>
          </div>

     
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">About this destination</h3>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">{destination.description}</p>
            {details?.snippet && <p className="text-gray-500 mt-3">{details.snippet}</p>}
          </div>

          {details && (
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Top hotel</p>
                  <p className="text-gray-800 font-semibold mt-1">{details.hotelName ?? '—'}</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Rating</p>
                  <p className="text-gray-800 font-semibold mt-1">
                    {typeof details.hotelRating === 'number' ? details.hotelRating : '—'}
                    {typeof details.reviewCount === 'number' ? ` (${details.reviewCount} reviews)` : ''}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Address</p>
                  <p className="text-gray-800 font-semibold mt-1">{details.address ?? '—'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityDetailsPanel;
