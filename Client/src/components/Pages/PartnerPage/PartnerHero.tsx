import React from 'react';
import DomeGallery from './DomeGallery';
import  '../../../../public/partner_with_us/partnerBg.jpg'

const PartnerHero: React.FC = () => {
  return (
    <div className="w-full relative  min-h-screen flex flex-col background-color">
        <div className='bg-black/30 backdrop-blur-md'></div>
      <div className="w-full h-screen  p-4 md:p-8 lg:p-12 mask-t-from-60%">
        <DomeGallery />
        <div className="absolute inset-0 bg-black/10  pointer-events-none" />

        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center text-center px-4">
        
        
        </div>

          <h1
            className="text-5xl z-10 sm:text-6xl md:text-7xl lg:text-[10rem] font-extrabold
                       text-[#006600] drop-shadow-[0_4px_12px_rgba(255,255,255,0.65)]
                       [text-shadow:0_0_12px_rgba(255,255,255,0.35)]
                       [-webkit-text-stroke:1px_rgba(0,0,0,0.25)] leading-tight"
          >
            Partner With Us
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#a31414] mt-4 font-semibold drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)]">
            Let’s Build Unforgettable Travel Experiences Together
          </p>
      </div>
    </div>
  );
};

export default PartnerHero;
