import React from 'react';
import PingDot from '../AboutUs/PingDot';
import { GoArrowUpRight } from "react-icons/go";
import { GoPlus } from "react-icons/go";
import { IoArrowForwardSharp } from "react-icons/io5";

const PartnerWithUs: React.FC = () => {
    const persons = [
        "/partner_with_us/person1.jpg",
        "/partner_with_us/person2.jpg",
        "/partner_with_us/person3.jpg",
    ]
    return (
        <>
            <div className="flex items-center px-8 gap-2 w-full">
                <PingDot />
                <h4 className="text-2xl min-w-[200px] title-font font-medium">Partner With Us</h4>
                <div className="flex-1 h-[1px] bg-black" />
            </div>
            <div className='flex flex-col gap-10 px-15 py-10'>
                <div>
                    <h1 className='title-font color-primary text-5xl font-mono'>WHY PARTNER WITH US?</h1>
                </div>
                <div className='flex flex-row gap-8 justify-between p-2'>
                    {/* Left large feature image */}
                    <div className='group w-1/2 relative overflow-hidden rounded-2xl ring-1 ring-black/10 shadow-sm'>
                        {/* Overlay gradients for readability */}
                        <div className='pointer-events-none absolute inset-0'>
                            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />
                            <div className='absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity bg-[radial-gradient(120%_80%_at_50%_100%,rgba(0,0,0,0.5),transparent_60%)]' />
                        </div>
                        <div className='absolute z-10 left-5 bottom-6 flex flex-col max-w-[75%]'>
                            <h1 className='text-white text-4xl md:text-5xl font-bold leading-tight drop-shadow-sm'>Join Our Network</h1>
                            <p className='text-white/90 text-lg md:text-2xl mt-2 leading-snug drop-shadow-sm'>Collaborate with us to unlock new opportunities.</p>
                            <div className='flex flex-row mt-4 items-center'>
                                {persons.map((person, index) => (
                                    <img
                                        key={index}
                                        src={person}
                                        alt={`Partner ${index + 1}`}
                                        className={`${index === 0 ? '' : '-ml-4'} w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover`}
                                    />
                                ))}
                                <button
                                    type='button'
                                    aria-label='Add partner'
                                    className='w-12 h-12 -ml-4 rounded-full border-2 border-white bg-secondary text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-sm'
                                >
                                    <GoPlus className='text-white' />
                                </button>
                            </div>
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
                            className='brightness-75 w-full h-full transition-transform duration-500 group-hover:scale-[1.03]'
                            src='/partner_with_us/tenders.jpg'
                            alt='Tenders collaboration visual'
                        />
                    </div>
                    {/* Right column secondary images + text */}
                    <div className='flex w-1/2 flex-col gap-7'>
                        <div className='w-full flex gap-6 md:gap-10'>
                            <div className='group overflow-hidden relative h-60 w-90 rounded-2xl ring-1 ring-black/10 shadow-sm'>
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
                                    className='w-full h-full transition-transform duration-500'
                                />
                            </div>
                            <div className='group rounded-2xl relative h-60 overflow-hidden w-90 ring-1 ring-black/10 shadow-sm'>
                                <button
                                    type='button'
                                    aria-label='Add agency partner'
                                    className='w-11 h-11 absolute right-4 top-3 rounded-full border-2 border-white bg-secondary text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow'
                                >
                                    <GoPlus className='text-white' size={18} />
                                </button>
                                <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity' />
                                <img
                                    className='w-full h-full  transition-transform duration-500 '
                                    src='/partner_with_us/agency.jpg'
                                    alt='Travel agency partner'
                                />
                            </div>
                        </div>
                        <div>
                            <p className='font-[Rubik] font-light text-2xl md:text-3xl leading-snug'>
                                From cutting-edge collaborations to innovative travel experiences, our partnerships
                                unlock endless opportunities to explore, connect, and grow. Join us in building the next
                                wave of adventure-driven impact.
                            </p>
                            <button
                                type='button'
                                className='text-black text-xl md:text-2xl underline mt-3 hover:scale-105 active:scale-95 cursor-pointer transition-transform flex items-center'
                                aria-label='Read more about partnerships'
                            >
                                Read More <IoArrowForwardSharp className='inline-block ml-2' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PartnerWithUs;
