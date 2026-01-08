import { Filter, Search, X } from 'lucide-react';

type CountryHeaderProps = {
  destinationsCount: number;
  onToggleFilters: () => void;
  searchTerm: string;
  onChangeSearchTerm: (value: string) => void;
  onClearSearch: () => void;
};

const CountryHeader = ({
  destinationsCount,
  onToggleFilters,
  searchTerm,
  onChangeSearchTerm,
  onClearSearch
}: CountryHeaderProps) => {
  
  const greenBrand = "#0cce10";

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/good-view-3.jpg" 
          alt="East Africa Background" 
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-slate-900" />
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-6 py-20 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center bg-secondary/50 w-45 px-2 py-1 rounded-full gap-2 mb-4">
               <span className="text-white/80 uppercase tracking-[0.3em] text-xs font-bold">Explorer Series</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              THE BEAUTIFUL <span style={{ color: greenBrand }}>CITIES</span> <br />
              WAITING FOR YOU
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl mt-4 max-w-xl font-medium">
              Discover <span className="text-white font-bold">{destinationsCount}</span> curated destinations across Kenya, Uganda & Tanzania
            </p>
          </div>

          <button
            onClick={onToggleFilters}
            className="md:hidden self-start flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
          >
            <Filter className="w-5 h-5" />
            <span className="font-bold text-sm">Filters</span>
          </button>
        </div>

        <div className="relative max-w-2xl group">
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 z-20">
            <Search className="w-6 h-6 text-gray-400 group-focus-within:text-white transition-colors" />
          </div>
          
          <input
            type="text"
            placeholder="Search your next adventure..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeSearchTerm(e.target.value)}
            className="w-full pl-14 pr-14 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 text-white text-lg placeholder:text-gray-400 outline-none transition-all focus:bg-white/15 focus:border-white/30 focus:ring-1"
            style={{ 
                boxShadow: searchTerm ? `0 0 20px ${greenBrand}33` : 'none'
            }}
          />

          {searchTerm && (
            <button
              title='search'
              onClick={onClearSearch}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          
        
        </div>
      </div>
      
    </div>
  );
};

export default CountryHeader;