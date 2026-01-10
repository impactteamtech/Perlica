import React from 'react';
import PingDot from '../AboutUs/PingDot';
import { GoArrowUpRight } from "react-icons/go";
import { GoPlus } from "react-icons/go";
import { IoArrowForwardSharp } from "react-icons/io5";
import PartnerWithUsDetails from './PartnerWithUsDetails';

const PartnerWithUs: React.FC = () => {
    const [showDetails, setShowDetails] = React.useState(false);
    return (
        <>
            <div
                id="partner-section"
                className="flex w-full  gap-3 px-4 flex-row items-center md:px-8 scroll-mt-32"
            >
                <PingDot />
                <h4 className="text-xl  w-[50%] sm:w-[30%] md:w-[25%] lg:w-[10%] sm:text-2xl min-w-0 title-font font-medium">Partner With Us</h4>
                <div className="w-[50%] sm:w-[70%] md:w-[75%]  lg:w-[90%] h-[1px] bg-black" />
            </div>
            <div className='mx-auto flex flex-col gap-8 sm:gap-10 px-6 lg:px-15 py-10 w-full '>
                <div>
                    <h1 className='text-3xl lg:text-5xl  2xl:text-6xl color-primary font-mono title-font leading-tight'>WHY PARTNER WITH US?</h1>
                </div>
                <div className='flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between p-2'>
                    {/* Left large feature image */}
                    <div className='group w-full lg:w-1/2 relative overflow-hidden rounded-2xl ring-1 ring-black/10 shadow-sm'>
                        {/* Overlay gradients for readability */}
                        <div className='pointer-events-none absolute inset-0'>
                            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />
                            <div className='absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity bg-[radial-gradient(120%_80%_at_50%_100%,rgba(0,0,0,0.5),transparent_60%)]' />
                        </div>
                        <div className='absolute z-10 left-4 sm:left-5 bottom-4 sm:bottom-6 flex flex-col max-w-[85%] sm:max-w-[75%]'>
                            <h1 className='text-white text-2xl sm:text-4xl md:text-5xl font-bold leading-tight drop-shadow-sm'>Join Our Network</h1>
                            <p className='text-white/90 text-base sm:text-lg md:text-2xl mt-2 leading-snug drop-shadow-sm'>Collaborate with us to unlock new opportunities.</p>

                        </div>
                        <button
                            type='button'
                            title='Show more'
                            aria-label='Show more details'
                            className='bg-white/90 backdrop-blur-sm right-3 top-3 absolute z-20 w-14 h-14 rounded-full flex items-center justify-center shadow hover:shadow-md hover:scale-105 active:scale-95 transition-all'
                        >
                            <GoArrowUpRight
                                size={26}
                                className='text-black'
                            />
                        </button>
                        <img
                            className='brightness-75 w-full h-full object-cover aspect-[16/10] sm:aspect-[16/9] transition-transform duration-500 group-hover:scale-[1.03]'
                            src='/partner_with_us/tenders.jpg'
                            alt='Tenders collaboration visual'
                        />
                    </div>
                    {/* Right column secondary images + text */}
                    <div className='flex w-full lg:w-1/2 flex-col gap-6 sm:gap-7'>
                        <div className='w-full flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10'>
                            <div className='group overflow-hidden relative w-full sm:flex-1 rounded-2xl ring-1 ring-black/10 shadow-sm'>
                                <button
                                    type='button'
                                    aria-label='Add hotel partner'
                                    className='w-11 h-11 absolute right-4 top-3 rounded-full border-2 border-white bg-secondary text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow'
                                >
                                    <GoPlus className='text-white' size={18} />
                                </button>
                                <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity' />
                                <img
                                    src='/partner_with_us/hotel.jpg'
                                    alt='Hotel partner'
                                    className='w-full h-full object-cover aspect-[4/3] transition-transform duration-500'
                                />
                            </div>
                            <div className='group rounded-2xl relative overflow-hidden w-full sm:flex-1 ring-1 ring-black/10 shadow-sm'>
                                <button
                                    type='button'
                                    aria-label='Add agency partner'
                                    className='w-11 h-11 absolute right-4 top-3 rounded-full border-2 border-white bg-secondary text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow'
                                >
                                    <GoPlus className='text-white' size={18} />
                                </button>
                                <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity' />
                                <img
                                    className='w-full h-full object-cover aspect-[4/3] transition-transform duration-500'
                                    src='/partner_with_us/agency.jpg'
                                    alt='Travel agency partner'
                                />
                            </div>
                        </div>
                        <div>
                            <p className='text-font'>
                                Whether it’s creating innovative travel experiences or handling import and export tenders, our partnerships open doors to endless possibilities.
                                Explore, connect, and grow with us as we shape the future of adventure and global commerce.
                            </p>
                            <button
                                type='button'
                                className='text-black text-base sm:text-xl md:text-2xl underline mt-3 hover:scale-105 active:scale-95 cursor-pointer transition-transform flex items-center'
                                aria-label='Read more about partnerships'
                                onClick={() => setShowDetails(true)}
                            >
                                Read More <IoArrowForwardSharp className='inline-block ml-2' />
                            </button>
                        </div>
                    </div>
                </div>
                {showDetails && (
                    <PartnerWithUsDetails onClose={() => setShowDetails(false)} />
                )}
            </div>
        </>
    );
};

export default PartnerWithUs;
