import React from 'react';

interface GalleryItem {
    image: string;
    text: string;
    buttonLabel?: string;
    link?: string;
}

interface CircularGalleryProps {
    isOpen: boolean;
    onClose: () => void;
    items: GalleryItem[];
}

const CircularGallery: React.FC<CircularGalleryProps> = ({ isOpen, onClose, items }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
            <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Explore Collections</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
                        aria-label="Close gallery"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="p-4 sm:p-6 overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {items.map((item, index) => (
                            <div
                                key={`${item.text}-${index}`}
                                className="flex flex-col bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shadow-sm"
                            >
                                <div className="h-40 w-full bg-gray-200 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.text}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 p-3">
                                    <p className="text-sm font-medium text-gray-800 line-clamp-2">{item.text}</p>
                                    {item.link && (
                                        <a
                                            href={item.link}
                                            className="inline-flex justify-center items-center text-xs font-semibold text-white bg-[#04c41a] hover:bg-[#03a315] rounded-full px-3 py-1.5 transition-colors"
                                        >
                                            {item.buttonLabel || 'View Details'}
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CircularGallery;
