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
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${destination.cityName} details`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div className="relative shrink-0">
          <div className="relative h-80 group bg-gray-100">
            <img
              src={selectedImage || fallbackImageUrl}
              alt={`${destination.cityName} photo`}
              className="w-full h-full object- transition-transform duration-700 group-hover:scale-105"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.src = fallbackImageUrl;
              }}
            />

            <button
              type="button"
              aria-label="Close city details"
              title="Close"
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-all hover:rotate-90"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h2 className="text-4xl font-bold mb-2">{destination.cityName}</h2>
              <div className="flex items-center gap-2 text-gray-200">
                <MapPin className="w-5 h-5 text-[#04c41a]" />
                <span className="text-lg">{destination.countryName}</span>
              </div>
            </div>
          </div>

     
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">About this destination</h3>
            <p className="text-gray-600 leading-relaxed text-lg">{destination.description}</p>
            {details?.snippet && <p className="text-gray-500 mt-3">{details.snippet}</p>}
          </div>

          {details && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
