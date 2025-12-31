import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import type { JSX } from 'react';
const HeroSection = (): JSX.Element => {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden relative font-sans selection:bg-emerald-500 selection:text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/85 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent z-10 pointer-events-none" />
      
      <div className="absolute inset-0 z-10 opacity-5 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      <NavBar />

      <div className='w-full h-full absolute md:top-10 left-0 px-6 md:px-16 pt-[15vh] flex flex-col z-20 justify-between pb-10'>
        <div className='flex flex-col gap-6 lg:gap-2 xl:gap-1 w-full'>
          <div className={`flex items-center gap-3 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="w-12 h-[2px] bg-gradient-to-r from-emerald-700 to-transparent" />
            <h2 className='text-base lg:text-[10px] xl:text-lg font-bold text-[#04c41a] tracking-[0.3em] uppercase drop-shadow-lg'>
              Explore Africa With Perlica
            </h2>
          </div>

          <div className='flex w-full  flex-col md:flex-row justify-between items-end relative mt-6'>
            
            <div className="relative flex flex-col lg:gap-0 xl:gap-2 gap-3 z-20 w-full md:w-2/3">
              
              <div className={`transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h1 className='text-6xl kenya-name-font md:text-[5rem] xl:text-[10rem]   leading-[0.8] text-white font-black tracking-tighter drop-shadow-2xl relative'>
                  PERLICA
                </h1>
              </div>
              
              <div className={`transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h3 className='text-lg md:text-xl  xl:text-4xl mt-5 md:mt-10 lg:mt-6 ml-2 text-white/95 font-light tracking-wide'>
                  Your Gateway to Unforgettable 
                  <span className="text-[#04c41a] font-bold text-xl md:text-2xl xl:text-5xl"> Adventures</span>
                </h3>
              </div>

              {/* Premium Description Box */}
              <div className={`mt-8 ml-2 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="relative md:w-full lg:w-[70%]  xl:w-full group">
                  <div className='relative backdrop-blur-xl bg-gray-200/20 border-l-4 border-[#04c41a] p-6 md:p-6  lg:max-w-xl shadow-2xl'>
                    <p className='text-white text-base md:text-md leading-relaxed'>
                      Discover the magic of Africa. From the vast savannahs to vibrant cultures, embark on journeys that create lifelong memories.
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced CTA Button */}
                <button 
                  onClick={()=>navigate('/hotels')}
                  className='flex mt-10 ml-2 group overflow-hidden cursor-pointer w-58 h-15 md:h-16 lg:h-18 transition-all duration-300  active:scale-95'>
                  <div className='relative overflow-hidden'>
                    <div className='relative bg-[#04c41a] h-full text-white px-6 py-3 lg:px-8  lg:py-4 xl:px-10 xl:py-5 font-bold text-xl'>
                      <h1 className=''>Let's Go!</h1>
                    </div>
                  </div>
                  <div className='xl:px-6 lg:py-4 lg:px-6 h-full flex xl:py-5 px-3 py-3  items-center justify-center bg-red-600 transition-colors'>
                    <ArrowRight size={22} className='text-white  transition-transform duration-300' />
                  </div>
                </button>
            </div>

            <div className={`hidden lg:flex flex-col items-end absolute right-0 top-1 xl:top-1 transition-all duration-1000 delay-700`}>
              <div className='lg:w-[300px] xl:w-[400px] h-[1px] bg-gradient-to-l from-white/60 via-white/30 to-transparent mb-6' />
              <div className='flex gap-3'>
             
                  <button
                    className='relative overflow-hidden  flex flex-col items-center justify-center gap-2 shadow-2xl transition-all duration-500 cursor-pointer 
                       lg:w-16 lg:h-23 xl:w-20 xl:h-32 bg-white/95 transform -translate-y-4'
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 ${
                      'bg-gradient-to-r from-red-600 to-red-500'
                    }`} />
                    
                    <span className='md:text-2xl xl:text-4xl font-black transition-colors duration-300 
                    text-gray-900'
                    >
                      01
                    </span>
                    
                    <div className='rounded-full transition-all duration-300
                      w-2.5 h-2.5 bg-red-600 animate-pulse' />
                    
                   
                      <span className='text-xs font-bold uppercase text-gray-500 tracking-widest animate-fade-in'>
                        Active
                      </span>
                   
                  </button>
                   <button
                    className='relative overflow-hidden flex flex-col items-center justify-center gap-2 shadow-2xl transition-all duration-500 cursor-pointer 
                       lg:w-16 lg:h-23 xl:w-20 xl:h-32 bg-white/35 transform -translate-y-4'
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 ${
                      'bg-gradient-to-r from-red-600/30 to-red-500/30'
                    }`} />
                    
                    <span className='md:text-2xl xl:text-4xl font-black transition-colors duration-300 
                    text-gray-900'
                    >
                      02
                    </span>
                     </button>
                   <button
                    className='relative overflow-hidden flex flex-col items-center justify-center gap-2 shadow-2xl transition-all duration-500 cursor-pointer 
                       lg:w-16 lg:h-23 xl:w-20 xl:h-32 bg-white/35 transform -translate-y-4'
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 ${
                      'bg-gradient-to-r from-red-600/30 to-red-500/30'
                    }`} />
                    
                    <span className='md:text-2xl xl:text-4xl font-black transition-colors duration-300 
                    text-gray-900'
                    >
                      03
                    </span>
                  </button>           
              </div>
            </div>
          </div>
        </div>      
      </div>

      <video
        className="absolute inset-0 w-full h-full object-cover scale-105 brightness-75"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src="/heroSafari.mp4" type="video/mp4" />
      </video>

      {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent z-10 pointer-events-none" /> */}
    </div>
  );
};

export default HeroSection;