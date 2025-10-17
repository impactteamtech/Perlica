import type {JSX}  from 'react'
import HistoryAndMission from './HistoryAndMission'
import PerlicaTeam from './PerlicaTeam'
import SupDetailsSection from './SupDetailsSection'
import MainAboutDiv from './MainAboutDiv'
import AboutTicker from './AboutTicker'
const AboutUs = (): JSX.Element => {
  return (
    <>
      <AboutTicker />
      <div className='pt-10 px-15 flex items-center gap-6'>
        <div className="relative flex flex-col items-center justify-center">
          <div className='w-4 h-4 absolute bg-green-600 animate-ping rounded-full'/>
          <div className='w-4 h-4 absolute bg-green-700 rounded-full'/>
        </div>
        <h1 className='text-2xl font-semibold leading-3.5 title-font  text-green-700'>ABOUT US</h1>
      </div>
      <HistoryAndMission />
      <SupDetailsSection />
      <PerlicaTeam />
      {/* <MainAboutDiv /> */}
    </>
  )
}

export default AboutUs