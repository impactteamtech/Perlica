
const CarsCTA = () => {
  const number: string = ": 071-500-1992"; 
  
  return (
    <section className='px-4 md:px-8 bg-secondary/25 lg:px-15 py-16 '>
      <div className='max-w-4xl mx-auto text-center'>
        
        <h1 className='text-5xl text-black title-font mb-6'>
          Step In. Sit Back. Travel Effortlessly. 
          <span className='color-primary block mt-2'>Contact Us Today!</span>
        </h1>
        
        {/* Description */}
        <p className='text-lg md:text-2xl text-black text-font mb-10 max-w-3xl mx-auto'>
          From airport pickups to exploring Kenya, our fleet of sedans, SUVs, and comfortable vehicles ensures reliable, efficient, and stress-free travel for every journey.
        </p>
        
        {/* Buttons Container */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          {/* Primary Button */}
          <button className='
            bg-secondary border-white border text-white font-semibold 
            py-4 px-8 rounded-xl transition-all duration-300 
            transform hover:scale-105
            w-full sm:w-auto text-lg
          '>
            Get Started
          </button>
          
          {/* Secondary Button */}
          <button className='

border-1 border-black
            font-semibold bg-white py-4 px-8 rounded-xl transition-all duration-300 
            transform hover:scale-105 w-full sm:w-auto text-lg
            flex items-center justify-center gap-2
          '>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
            Call us {number}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CarsCTA;