import React from 'react'
import { GoArrowRight } from "react-icons/go";
import { IoStarSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
const FirstSection = (): React.JSX.Element => {
    const navigate = useNavigate();
    return (
        <section className='px-6 lg:px-15 pt-10 bg- sm:pt-12  lg:pt-15 pb-10 lg:pb-15'>
            <div className='w-full relative flex flex-col lg:flex-row lg:justify-between gap-8 sm:gap-10 '>
                <div className='hidden lg:block  lg:w-45 h-64 sm:h-80 lg:h-50 relative top-0 lg:top-10 mx-auto lg:mx-0'>
                    <div
                        className='absolute inset-0 rounded-xl bg-[#0cce10]/20 -rotate-3 -translate-x-2 -translate-y-4'
                        aria-hidden='true'
                    />
                    <img
                        src='/giraffe.jpeg'
                        alt=''
                        className='relative z-10 w-full h-full rounded-xl object-cover object-center shadow'
                    />
            </div>
            <div className='w-full lg:h-50 overflow-x-auto'>
                <h1 
                    className='text-4xl lg:text-5xl xl:text-4xl 2xl:text-5xl color-primary font-mono title-font leading-tight text-center'>
                        Where Professionalism Meets Comfort and Reliability
                    </h1>
                </div>
                <div>
                    <div className='w-full sm:w-[26rem] lg:w-55 h-72 sm:h-[26rem] lg:h-65 relative bottom-0 lg:bottom-10 mx-auto lg:mx-0'>
                        <div
                            className='absolute inset-0 rounded-xl bg-[#0cce10]/20 -rotate-3 -translate-x-2 -translate-y-4'
                            aria-hidden='true'
                        />
                        <img 
                            src='/antelope.jpeg' 
                            alt='Experience highlight 2'
                            className='relative z-10 w-full h-full rounded-xl object-cover object-center shadow'
                        />
                    </div>
                </div>
            </div>

            <div className='flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-30 mt-10 lg:mt-0'>
                <div className='flex-col   flex w-full lg:w-[20%] lg:mt-30 items-center lg:items-start text-center lg:text-left'>

                    <div className='w-full flex items-center'>
                        <h2 className='mb-2 text-4xl sm:text-5xl text-center w-full
                         lg:text-6xl font-bold'>4.9/5</h2>
                    </div>
                    <div className='flex gap-2 items-center'>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <IoStarSharp
                                key={index}
                                className='text-yellow-500 text-[20px] sm:text-[26px] lg:text-[30px]'
                            />
                        ))}
                    </div>
                 

                </div>
                <div className='flex w-full lg:w-[80%] gap-8 lg:gap-5 items-center flex-col lg:flex-row'>
                    <div className='flex w-full lg:w-[60%] items-center gap-6 lg:gap-8 flex-col sm:flex-row'>
                        <div className='w-full sm:w-110 overflow-hidden relative h-72 sm:h-96 lg:h-120 rounded-xl group'>

                            <img
                                className='relative z-10 w-full h-full  rounded-xl shadow'
                                src='https://res.cloudinary.com/drztwlqqx/image/upload/v1768070643/image3_gaogpe.jpg'
                                alt='Experience highlight 3'
                            />
                        </div>
                        <div className='w-full sm:w-80 h-64 sm:h-78 overflow-hidden rounded-xl'>
                            <img
                                className='w-full h-full'
                                src='https://res.cloudinary.com/drztwlqqx/image/upload/v1768070642/image4_bmoibi.jpg'
                                alt='Experience highlight 4' />
                        </div>
                    </div>
                    <div className='flex ml-0 lg:ml-3 w-full lg:w-[33%] flex-col lg:px-6 gap-6 items-center lg:items-start text-center lg:text-left'>
                        <p className='text-font '>
                            Discover the destinations that make Perlica Tours & Travel your gateway to unforgettable adventures.
                        </p>
                        <button
                            onClick={() => navigate('/destinations')}
                            className='px-3 py-3 text-center justify-center w-full sm:w-64 lg:w-45 flex items-center hover:bg-gray-800 transition-all duration-150 cursor-pointer bg-black text-white rounded-full'>
                            EXPLORE MORE
                            <GoArrowRight
                                size={20}
                                className='text-white' />
                        </button>

                    </div>
                </div>

            </div>
        </section>
    )
}

export default FirstSection