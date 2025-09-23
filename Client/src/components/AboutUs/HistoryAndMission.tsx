import type {JSX}  from 'react'
import { IoArrowBackOutline,IoArrowForward } from "react-icons/io5";
import { useEffect, useState } from 'react';
import { safariVideos,safariImages } from '../../lib/staticData';
import { GoDotFill } from "react-icons/go";
import { AnimatePresence, motion } from 'framer-motion';
import StyledTextCard from './StyledTextCard';

const HistoryAndMission = (): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState<string>(safariImages[0]);
  const [selectedVideo, setSelectedVideo] = useState<string>(safariVideos[0]);

  // Auto slide images every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setSelectedImage((prev) => {
        const currentIndex = safariImages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % safariImages.length;
        return safariImages[nextIndex];
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className='w-full flex flex-col gap-8'>
      {/* div 1 */}
      <div className='w-full items-start flex gap-6'>
        <div className='w-[30%] flex items-center flex-col'>
          <div className='w-[30%]  flex justify-center mb-2'>
            <img 
            className='w-full '
            src="/kenya_flagIcon.png" alt="picture-kenya-flag"/>
          </div>
          <p className='w-full text-center  font-baskerville text-2xl tracking-wide'>
            Established in <span className='font-bold text-3xl'>2007</span>
          </p>
        </div>
        <div className='w-[70%] flex items-center'>
          <h1 className='text-6xl text-primary font-bold font-baskerville leading-tight'>
            We're dedicated to make every journey exceptional.
          </h1>
        </div>
      </div>

      {/* div 2 */}
      <div className='w-full flex gap-6 mt-4'>
        <div className='w-[30%]'>
          <div className='flex items-center mb-6'>
            <h1 className='font-semibold text-7xl text-gray-900'>
              0{safariImages.indexOf(selectedImage) + 1}
            </h1>
            <div className='w-20 h-[3px] mx-3 bg-black/80'/>
            <h2 className='text-black/80 text-5xl'>0{safariImages.length}</h2>
          </div>
          <div className='w-full relative h-120 overflow-hidden rounded-xl shadow-2xl'>
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={selectedImage}
                alt="kenya-safari"
                className='w-full h-full bg-contain transition-transform duration-700 hover:scale-110 cursor-pointer'
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeIn" }}
              />
            </AnimatePresence>
            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 rounded-full px-4 py-2 flex gap-2'>
              {Array.from({ length: safariImages.length }).map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(safariImages[index])}
                  aria-label={`Go to image ${index + 1}`}
                  className={`transition-all duration-300 ${
                    safariImages[index] === selectedImage 
                      ? 'text-primary scale-125' 
                      : 'text-black/30 hover:text-black/60'
                  }`}
                >
                  <GoDotFill size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className='flex-col w-[70%] gap-6'>
          <div className='w-[100%] mb-8 relative'>
            <div className='border-t-4 border-black w-7 h-7 border-l-4 absolute'/>
            <p className="font-baskerville text-gray-800 text-lg p-4 text-justify leading-relaxed">
              We deliver high-quality travel services through a strong, 
              enthusiastic, and professional multinational team.
              With extensive expertise in regional and international travel,
              tourism, and hospitality, we are committed to providing exceptional experiences
              that exceed our clients' expectations.  
            </p>
            <div  className=''/>
            <div className='border-b-4 border-black w-7 h-7 border-r-4 absolute bottom-5 right-0'/>
          </div>
          <div className='w-full flex gap-4'>
            <div className='w-[50%]'>
              <img 
                className='w-full h- rounded-xl shadow-black/20  shadow-md transition-transform duration-300 hover:scale-[1.02]'
                src="/tourist.jpg" 
                alt="kenya-safari-2" 
              />
              <StyledTextCard />
            </div>
            <div className='w-[50%] flex flex-col gap-3'>
              <div className='flex gap-7 w-full justify-center items-center'>
                <button 
                  onClick={() => {
                    const currentIndex = safariVideos.indexOf(selectedVideo);
                    const previousIndex = (currentIndex - 1 + safariVideos.length) % safariVideos.length;
                    setSelectedVideo(safariVideos[previousIndex]);
                  }}
                  title="Previous" 
                  type="button" 
                  className='cursor-pointer bg-transparent border-2 border-gray-600 p-3 rounded-full transition-all duration-300 hover:bg-gray-100 hover:scale-110'
                >
                  <IoArrowBackOutline size={30} />
                </button>
                <button 
                  onClick={() => {
                    const currentIndex = safariVideos.indexOf(selectedVideo);
                    const nextIndex = (currentIndex + 1) % safariVideos.length;
                    setSelectedVideo(safariVideos[nextIndex]);
                  }}
                  title="Next" 
                  type='button' 
                  className='cursor-pointer bg-secondary text-white p-3 rounded-full transition-all duration-300 hover:bg-secondary/90 hover:scale-110'
                >
                  <IoArrowForward size={30} />
                </button>
              </div>
              <div className='w-full h-90 rounded-xl overflow-hidden shadow-2xl'>
                <video 
                  autoPlay
                  loop
                  muted
                  className='w-full object-cover h-full transition-transform duration-300 hover:scale-105'
                  src={selectedVideo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryAndMission