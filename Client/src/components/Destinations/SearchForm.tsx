import { Search } from 'lucide-react';

const SearchForm = () => {
  return (
    <form
      className="w-full flex flex-col sm:flex-row gap-3"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search destinations..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 text-white placeholder:text-gray-400 outline-none transition-all focus:bg-white/15 focus:border-white/30"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-4 rounded-2xl font-bold text-white bg-[#04c41a] hover:bg-[#04c41a]/90 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
