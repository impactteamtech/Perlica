import React from 'react';
import PackagesIcons from './PackagesIcons';
import SearchFilters from './SearchFilters';

const SearchPackages: React.FC = () => {

    return (
        <section className="w-full min-h-screen mx-auto 
             flex flex-col items-center gap-10
           
             bg-gray-100 shadow-md p-8 bg-cover bg-center"
  >
            <PackagesIcons />
            <SearchFilters />
        </section>
    );
};

export default SearchPackages;