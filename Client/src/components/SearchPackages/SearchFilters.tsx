import React from "react";
import { Input } from "../ui/input";

const SearchFilters: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-xl shadow p-6 flex  gap-2 items-center">
      {/* Location */}
      <div className="flex flex-col gap-2 w-full sm:w-1/4">
        <label
          htmlFor="location"
          className="text-sm font-medium text-gray-700"
        >
          Location:
        </label>
        <Input
          type="text"
          placeholder="Where to?"
          id="location"
          className="w-1/2"
        />
      </div>

      {/* Check-In */}
      <div className="flex flex-col gap-2 w-full sm:w-1/4">
        <label htmlFor="check-in" className="text-sm font-medium text-gray-700">
          Check-In:
        </label>
        <Input type="date" id="check-in" className="w-1/2" />
      </div>

      {/* Check-Out */}
      <div className="flex flex-col gap-2 w-full sm:w-1/4">
        <label
          htmlFor="check-out"
          className="text-sm font-medium text-gray-700"
        >
          Check-Out:
        </label>
        <Input type="date" id="check-out" className="w-1/2" />
      </div>

      {/* Guests */}
      <div className="flex flex-col gap-2 w-full sm:w-1/4">
        <label htmlFor="guests" className="text-sm font-medium text-gray-700">
          Guests:
        </label>
        <Input type="number" id="guests" placeholder="2" className="w-1/2" />
      </div>

      {/* Search Button */}
      <div className="w-full sm:w-auto">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full sm:w-auto">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
