import React from 'react';
import PackagesIcons from './PackagesIcons';
import SearchFilters from './SearchFilters';


const SearchPackages: React.FC = () => {

    return (
        <section className="w-full mx-auto 
             flex flex-col items-center gap-6
             bg-transparent shadow-md p-2 bg-cover bg-center">
            <PackagesIcons />
            <SearchFilters />
         
        </section>
    );
};

export default SearchPackages;