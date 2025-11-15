import React from 'react'
import MainSection from './MainSection'
import PopularDestinations from './PopularDestinations'
import FeaturedDestinations from './FeaturedDestinations'

const Destinations = (): React.JSX.Element => {
  return (
    <>
      <MainSection />
      <PopularDestinations />
      <FeaturedDestinations /> 
      
      <div className='bg-secondary/20 w-full h-60 mt-3 gap-5 flex-col items-center flex justify-center'>   
        <h1 className='text-4xl color-primary font-bold '>Keep things flexible</h1>
        <p className='text-black text-xl w-[60%] text-center font-mono'>
          Use Reserve Now & Pay Later to secure the activities you don't want to miss without being locked in.
        </p>
      </div>

      {/* Option 1: Travel Tips Section */}
      <div className='flex flex-col gap-6 py-8 px-4 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold color-primary text-center'>Travel Smarter, Not Harder</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
          <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
            <h3 className='text-xl font-semibold text-secondary mb-3'>Best Time to Visit</h3>
            <p className='text-gray-600'>Discover the ideal seasons for each destination to maximize your experience and avoid crowds.</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
            <h3 className='text-xl font-semibold text-secondary mb-3'>Local Experiences</h3>
            <p className='text-gray-600'>Go beyond tourist spots with authentic local experiences and hidden gems in every city.</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
            <h3 className='text-xl font-semibold text-secondary mb-3'>Travel Prepared</h3>
            <p className='text-gray-600'>Essential tips on local customs, transportation, and must-try foods for each destination.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Destinations