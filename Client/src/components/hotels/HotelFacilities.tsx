
import React from 'react';
import { Wifi, Car, Utensils, Dumbbell, Coffee } from 'lucide-react';

const getFacilityIcon = (facilityName: string) => {
  const name = facilityName?.toLowerCase() || '';
  if (name.includes('wifi') || name.includes('internet')) return <Wifi className="w-4 h-4" />;
  if (name.includes('parking') || name.includes('car')) return <Car className="w-4 h-4" />;
  if (name.includes('restaurant') || name.includes('dining')) return <Utensils className="w-4 h-4" />;
  if (name.includes('gym') || name.includes('fitness')) return <Dumbbell className="w-4 h-4" />;
  if (name.includes('breakfast') || name.includes('coffee')) return <Coffee className="w-4 h-4" />;
  return null;
};

interface HotelFacilitiesProps {
  facilities: string[];
}

const HotelFacilities: React.FC<HotelFacilitiesProps> = ({ facilities }) => (
  <div className="mt-3 flex flex-wrap gap-2">
    {facilities.slice(0, 5).map((facility, idx) => (
      <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
        {getFacilityIcon(facility)}
        {facility}
      </span>
    ))}
    {facilities.length > 5 && (
      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
        +{facilities.length - 5} more
      </span>
    )}
  </div>
);

export default HotelFacilities;
