import type { CitySortBy, CountryConfig, ThemeFilter } from '../../../lib/types';
import { RotateCcw, Map, Palmtree, ArrowDownAz } from 'lucide-react';

type CountryFiltersPanelProps = {
  showFilters: boolean;
  countries: CountryConfig[];
  selectedCountry: string;
  onChangeCountry: (value: string) => void;
  selectedTheme: ThemeFilter;
  onChangeTheme: (value: ThemeFilter) => void;
  sortBy: CitySortBy;
  onChangeSortBy: (value: CitySortBy) => void;
  onClearFilters: () => void;
};

const CountryFiltersPanel = ({
  showFilters,
  countries,
  selectedCountry,
  onChangeCountry,
  selectedTheme,
  onChangeTheme,
  sortBy,
  onChangeSortBy,
  onClearFilters
}: CountryFiltersPanelProps) => {
  return (
    <div 
      className={`
        ${showFilters ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none md:pointer-events-auto md:opacity-100 md:translate-y-0'} 
        transition-all duration-500 ease-in-out
        mb-12 mt-[-2rem] relative z-20 w-full
      `}
    >
      <div className="bg-white border border-slate-200/60 p-2 shadow-2xl shadow-slate-200/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          
          {/* Country Filter */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0cce10] transition-colors">
              <Map className="w-5 h-5" />
            </div>
            <select
              id="country-filter"
              aria-label="Country filter"
              value={selectedCountry}
              onChange={(e) => onChangeCountry(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-transparent text-slate-700 font-semibold appearance-none cursor-pointer shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-slate-50 transition-colors"
            >
              <option value="all">All Countries</option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>{country.name}</option>
              ))}
            </select>
          </div>

          {/* Theme Filter */}
          <div className="relative group border-t md:border-t-0 md:border-l border-slate-100">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0cce10] transition-colors">
              <Palmtree className="w-5 h-5" />
            </div>
            <select
              id="theme-filter"
              aria-label="Theme filter"
              value={selectedTheme}
              onChange={(e) => onChangeTheme(e.target.value as ThemeFilter)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-transparent text-slate-700 font-semibold appearance-none cursor-pointer shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-slate-50 transition-colors"
            >
              <option value="all">All Themes</option>
              <option value="beach">Beach</option>
              <option value="nature">Nature</option>
              <option value="wildlife">Wildlife / Safari</option>
              <option value="city">City</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div className="relative group border-t md:border-t-0 md:border-l border-slate-100">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0cce10] transition-colors">
              <ArrowDownAz className="w-5 h-5" />
            </div>
            <select
              id="sort-filter"
              aria-label="Sort cities"
              value={sortBy}
              onChange={(e) => onChangeSortBy(e.target.value as CitySortBy)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-transparent text-slate-700 font-semibold appearance-none cursor-pointer shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-slate-50 transition-colors"
            >
              <option value="name">City Name (A-Z)</option>
            </select>
          </div>

          {/* Action Button */}
          <div className="p-1">
            <button
              onClick={onClearFilters}
              className="w-full h-full px-6 py-3 bg-[#0cce10] text-white rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default CountryFiltersPanel;