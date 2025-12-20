import React, { useState } from 'react';
import PackagesIcons from './PackagesIcons';
import CircularGallery from '../CircularGallary/CircularGallery';
import galleryCollections from './GallerySelections';
import { motion, AnimatePresence } from 'framer-motion';

const SearchPackages: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedGallery, setSelectedGallery] = useState<'stays' | 'destinations' | 'cars' | 'packages' | 'thingsToDo' | null>(null);

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1.0],
            }}
            className="w-full mt-32 mx-auto  flex flex-col items-center gap-6 p-2"
        >

            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.15,
                        },
                    },
                }}
            >
                <PackagesIcons />
            </motion.div>

            <AnimatePresence>
                {isOpen && selectedGallery && (
                    <motion.div
                        key="gallery"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{
                            duration: 0.5,
                            ease: 'easeOut',
                        }}
                        className="w-full flex justify-center"
                    >
                        <CircularGallery
                            onClose={() => setIsOpen(false)}
                            isOpen={isOpen}
                            items={galleryCollections[selectedGallery]}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
};

export default SearchPackages;