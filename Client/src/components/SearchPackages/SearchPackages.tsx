import React, { useState } from 'react';
import PackagesIcons from './PackagesIcons';
// import SearchFilters from './SearchFilters';
import CircularGallery from '../CircularGallary/CircularGallery';
import galleryCollections from './GallerySelections';
const SearchPackages: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedGallery, setSelectedGallery] = useState<'stays' | 'destinations' | 'cars' | 'packages' | 'thingsToDo' | null>(null);

    return (
        <section className="w-full mx-auto flex flex-col items-center gap-6 p-2">

            <PackagesIcons onSelect={(category) => {
                setSelectedGallery(category);
                setIsOpen(true);
            }} />

            {isOpen && selectedGallery && (
                <CircularGallery
                    onClose={() => setIsOpen(false)}
                    isOpen={isOpen}
                    items={galleryCollections[selectedGallery]}
                />
            )}
        </section>
    );
};

export default SearchPackages;