import React from 'react'
import { GoArrowRight, GoPlus } from "react-icons/go";
import { IoStarSharp } from "react-icons/io5";

const FirstSection = ():React.JSX.Element => {
    const persons:string[] = [
        "/partner_with_us/person1.jpg",
        "/partner_with_us/person2.jpg",
        "/partner_with_us/person3.jpg",
    ]
  return (
    <section className='min-h-screen px-15 pt-15  pb-10'>
        {/* top part */}
        <div className='w-full  relative flex justify-between'>
            <div className='w-45 h-50 relative top-10'>
                    {/* Rotated green background behind the image */}
                    <div
                        className='absolute inset-0 rounded-xl bg-secondary/20 -rotate-3 -translate-x-2 -translate-y-4'
                        aria-hidden='true'
                    />
                    {/* Portrait image on top */}
                    <img
                        src='/image1.jpg'
                        alt=''
                        className='relative z-10 w-full h-full rounded-xl object-cover object-center shadow'
                    />
            </div>
            <div className='w-100'>
                <h1 className='text-5xl  title-font color-primary'>Perlica Tours & Travel where professionalism meets adventure</h1>
            </div>
                <div>
                    <div className='w-55 h-65 relative bottom-10'> 
                        <div
                            className='absolute inset-0 rounded-xl bg-secondary/20 -rotate-3 -translate-x-2 -translate-y-4'
                            aria-hidden='true'
                        />
                        <img 
                            src='/image2.jpg' 
                            alt='Experience highlight 2'
                            className='relative z-10 w-full h-full rounded-xl object-cover object-center shadow'
                        />
                    </div>
                </div>
        </div>


        {/* bottom part */}
        <div className='flex items-center justify-between gap-30'>
            {/* happy costumers */}
            <div className='flex-col gap-4 flex w-[20%]'>
                <div>
                    <h2  className='text-7xl font-bold'>4.9/5</h2>
                </div>
                <div className='flex gap-2 items-center'>
                    {Array.from({length:5}).map((_, index) => (
                        <IoStarSharp 
                            size={30}
                            key={index}
                            className='text-yellow-500'
                        />
                    ))}
                </div>
                <div className='flex gap-2 items-center '>
                    <div className='flex flex-row mt-4 items-center'>
                        {persons.map((person, index) => (
                            <img
                                key={index}
                                src={person}
                                alt={`Partner ${index + 1}`}
                                className={`${index === 0 ? '' : '-ml-4'} w-12 h-12 rounded-full shadow-sm object-cover`}
                            />
                        ))}
                        <button
                            type='button'
                            aria-label='Add partner'
                            className='w-12 h-12 -ml-4 rounded-full bg-secondary text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-sm'
                        >
                            <GoPlus size={30} className='text-white' />
                        </button>
                    </div>
                    <p className='text-wrap text-lg w-[40%]'>
                        100K Happy Customers
                    </p>
                </div>
            </div>
            <div className='flex w-[80%] gap-5 items-center'>
                <div className='flex w-[60%] items-center gap-8'> 
                    <div className='w-110 overflow-hidden relative h-120 rounded-xl  group'>
                  
                        <img
                            className='relative z-10 w-full h-full  rounded-xl shadow'
                            src='/image3.jpg'
                            alt='Experience highlight 3'
                        />
                    </div>
                    <div className='w-80 h-78 overflow-hidden  rounded-xl'>
                        <img 
                            className='w-full h-full'
                            src='/image4.jpg' 
                            alt='Experience highlight 4'/>
                    </div>
                </div>
                <div className='flex ml-10 w-[40%] flex-col gap-6'>
                    <p className='text-font text-3xl'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus fugiat doloribus iure, autem sint quod!
                    </p>
                    <button className='px-3 py-3 text-center  justify-center w-45 flex items-center  bg-black text-white rounded-full'>
                        EXPLORE MORE
                        <GoArrowRight 
                            size={20}
                            className='text-white'/>
                    </button>

                </div>
            </div>
          
        </div>
    </section>
  )
}

export default FirstSection