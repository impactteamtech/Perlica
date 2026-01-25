import type { JSX } from 'react'
import HistoryAndMission from './HistoryAndMission'
import SupDetailsSection from './SupDetailsSection'
import FirstSection from './FirstSection'
import AboutTicker from './AboutTicker'
const AboutUs = (): JSX.Element => {
  return (
    <>
      <AboutTicker />
      <div
        id='about-section'
        className='pt-10 px-15 flex items-center gap-6 scroll-mt-32'
      >
        <div className="relative flex flex-col items-center justify-center">
          <div className='w-4 h-4 absolute bg-[#00d404] animate-ping rounded-full' />
          <div className='w-4 h-4 absolute bg-[#0cce10] rounded-full' />
        </div>
        <h1 className='text-2xl font-semibold leading-3.5 title-font  text-[#0cce10]'>ABOUT US</h1>
      </div>
      <FirstSection />
      <HistoryAndMission />
      <SupDetailsSection />
    </>
  )
}

export default AboutUs