import React, { useEffect } from 'react';

const imagePaths = [
  'bg-1.jpg',
  'bg-2.jpg',
  'bg-3.jpg'
];

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = React.useState<string>(imagePaths[0]);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setSelectedImage((prevSelected) => {
        const idx = imagePaths.indexOf(prevSelected);
        const nextIdx = (idx + 1) % imagePaths.length;
        return imagePaths[nextIdx];
      });
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const prev = () => {
    const idx = imagePaths.indexOf(selectedImage);
    const nextIdx = (idx - 1 + imagePaths.length) % imagePaths.length;
    setSelectedImage(imagePaths[nextIdx]);
  };

  const next = () => {
    const idx = imagePaths.indexOf(selectedImage);
    const nextIdx = (idx + 1) % imagePaths.length;
    setSelectedImage(imagePaths[nextIdx]);
  };

  const goToSlide = (index: number) => {
    setSelectedImage(imagePaths[index]);
  };

  return (
    <div 
      className="w-full h-full group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="w-full h-full relative overflow-hidden">
        {/* Main Image with smooth transition */}
        <div className="relative w-full h-full">
          <img 
            src={`/bg-images-destination/${selectedImage}`} 
            alt="Destination" 
            className="w-full h-full brightness-50 object-cover transition-all duration-500 ease-in-out transform group-hover:scale-105" 
          />
          
        </div>

        {/* Navigation Buttons with enhanced styling */}
        <button
          type="button"
          aria-label="Previous image"
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/60 backdrop-blur-sm border border-white/30 hover:border-white text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-black/80 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 shadow-2xl"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <button
          type="button"
          aria-label="Next image"
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/60 backdrop-blur-sm border border-white/30 hover:border-white text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-black/80 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 shadow-2xl"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

        {/* Enhanced Dots Indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-30 flex items-center gap-2">
          {imagePaths.map((path, index) => {
            const isActive = selectedImage === path;
            return (
              <button
                key={path}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goToSlide(index)}
                className={`flex items-center justify-center transition-all duration-300 ${
                  isActive ? 'w-8 scale-110' : 'w-3 hover:w-4'
                } h-3 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm`}
              >
                <span className={`block w-full h-full rounded-full transition-colors duration-300 ${
                  isActive ? 'bg-[#0cce10] shadow-lg' : 'bg-white/70 hover:bg-white'
                }`} />
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default ImageGallery;