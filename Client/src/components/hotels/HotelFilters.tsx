import React from 'react';
import { 
  SlidersHorizontal, 
  Star, 
  DollarSign, 
  TrendingUp, 
  Home, 
  ThumbsUp,
} from 'lucide-react';

export type HotelSortBy =
  | 'recommended'
  | 'price_low'
  | 'price_high'
  | 'rating_high'
  | 'stars_high'
  | 'rooms_high';

type Props = {
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  minStars: number;
  setMinStars: (value: number) => void;
  minGuestRating: string;
  setMinGuestRating: (value: string) => void;
  minRoomTypes: string;
  setMinRoomTypes: (value: string) => void;
  sortBy: HotelSortBy;
  setSortBy: (value: HotelSortBy) => void;
  onlyAvailable: boolean;
  setOnlyAvailable: (value: boolean) => void;
  visibleCount: number;
  totalCount: number;
};

const HotelFilters: React.FC<Props> = ({
  minPrice, setMinPrice, maxPrice, setMaxPrice,
  minStars, setMinStars, minGuestRating, setMinGuestRating,
  minRoomTypes, setMinRoomTypes, sortBy, setSortBy,
  onlyAvailable, setOnlyAvailable, visibleCount, totalCount
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 mb-8">
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#04c41a]/10 rounded-lg">
            <SlidersHorizontal className="w-5 h-5 text-[#04c41a]" />
          </div>
          <h2 className="font-bold text-gray-800 text-lg">Filter Results</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="peer sr-only"
              />
              <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[#04c41a] transition-colors" />
              <div className="absolute left-1 peer-checked:left-6 w-3 h-3 bg-white rounded-full transition-all" />
            </div>
            <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
              Available only
            </span>
          </label>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-500 uppercase tracking-wider">
            {Math.min(visibleCount, totalCount)} / {totalCount} Hotels
          </span>
        </div>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        
        {/* Price Range Group */}
        <div className="lg:col-span-2">
          <label className="flex items-center text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
            <DollarSign className="w-3 h-3 mr-1" /> Price Range
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min"
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#04c41a] transition-all"
            />
            <span className="text-gray-300">—</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max"
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#04c41a] transition-all"
            />
          </div>
        </div>

        {/* Stars Filter */}
        <div>
          <label className="flex items-center text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
            <Star className="w-3 h-3 mr-1" /> Min Stars
          </label>
          <select
            value={minStars}
            onChange={(e) => setMinStars(Number(e.target.value))}
            className="w-full bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#04c41a] appearance-none cursor-pointer"
          >
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n === 0 ? 'Any Class' : `${n} Stars & Up`}</option>
            ))}
          </select>
        </div>

        {/* Guest Rating Filter */}
        <div>
          <label className="flex items-center text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
            <ThumbsUp className="w-3 h-3 mr-1" /> Rating
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              value={minGuestRating}
              onChange={(e) => setMinGuestRating(e.target.value)}
              placeholder="0-10"
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#04c41a]"
            />
            <span className="absolute right-3 top-2.5 text-xs text-gray-400 font-bold">/10</span>
          </div>
        </div>

        {/* Room Types Filter */}
        <div>
          <label className="flex items-center text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
            <Home className="w-3 h-3 mr-1" /> Room Types
          </label>
          <input
            type="number"
            value={minRoomTypes}
            onChange={(e) => setMinRoomTypes(e.target.value)}
            placeholder="Min types"
            className="w-full bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#04c41a]"
          />
        </div>

        {/* Sort By Filter */}
        <div>
          <label className="flex items-center text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
            <TrendingUp className="w-3 h-3 mr-1" /> Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as HotelSortBy)}
            className="w-full bg-secondary border-none rounded-xl px-4 py-2.5 text-sm font-semibold text-white  appearance-none cursor-pointer"
          >
            <option value="recommended">Recommended</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating_high">Top Rated</option>
            <option value="stars_high">Most Stars</option>
            <option value="rooms_high">More Options</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default HotelFilters;