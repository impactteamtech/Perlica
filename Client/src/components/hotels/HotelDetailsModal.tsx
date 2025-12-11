import React, { useEffect } from 'react';
import type { Hotel } from './types';

interface HotelDetailsModalProps {
  hotel: Hotel;
  onClose: () => void;
}

// 1. Default Facilities List
const DEFAULT_FACILITIES = [
  "Free High-Speed WiFi",
  "Air Conditioning",
  "24/7 Room Service",
  "Private Parking",
  "Daily Housekeeping"
];

// 2. Helper to select icons based on facility keywords
const getFacilityIcon = (name: string) => {
  const lowerName = name.toLowerCase();
  
  // Simple SVG Icon components
  if (lowerName.includes('wifi') || lowerName.includes('internet')) {
    return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>;
  }
  if (lowerName.includes('air') || lowerName.includes('ac') || lowerName.includes('conditioning')) {
    return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  }
  if (lowerName.includes('park')) {
    return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>; // Simple check for parking
  }
  if (lowerName.includes('pool') || lowerName.includes('swim')) {
    return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>;
  }
  if (lowerName.includes('service') || lowerName.includes('keeping')) {
    return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  }
  
  // Default generic icon (Star)
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
};

const stripHtml = (html: string) => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html || '';
  return tmp.textContent || tmp.innerText || '';
};

const HotelDetailsModal: React.FC<HotelDetailsModalProps> = ({ hotel, onClose }) => {
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  // Use hotel facilities or fallback to default
  const displayFacilities = (hotel.facilities && hotel.facilities.length > 0) 
    ? hotel.facilities 
    : DEFAULT_FACILITIES;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="relative h-72 shrink-0 group">
          <img
            src={hotel.heroImage || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600'}
            alt={hotel.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <button
            title='Close modal'
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-all hover:rotate-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-4xl font-bold mb-2 ">{hotel.name}</h2>
            <div className="flex items-center gap-2 text-gray-200">
              <svg className="w-5 h-5 text-[#04c41a]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-lg">{hotel.address}, {hotel.city}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">About this stay</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {stripHtml(hotel.description || "A wonderful place to stay.")}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {displayFacilities.map((facility, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#04c41a]/30 transition-colors"
                >
                  <div className="text-[#04c41a]">
                    {getFacilityIcon(facility)}
                  </div>
                  <span className="text-gray-700 font-medium">{facility}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 p-6 bg-white/95 backdrop-blur z-10">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Total Price</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-[#04c41a]">
                  ${hotel.minPrice?.toFixed(2) || 'N/A'}
                </span>
                <span className="text-gray-400 font-medium">/ night</span>
              </div>
            </div>
            
            <button className="bg-[#04c41a] hover:bg-[#03a315] text-white text-lg font-bold py-3.5 px-10 rounded-xl shadow-lg shadow-[#04c41a]/20 transition-all hover:scale-[1.02] active:scale-95">
              Book Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HotelDetailsModal;