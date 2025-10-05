import type {JSX}  from 'react'
import HistoryAndMission from './HistoryAndMission'
import PerlicaTeam from './PerlicaTeam'
import SupDetailsSection from './SupDetailsSection'
import YouMaySee from './YouMaySee'
import MainAboutDiv from './MainAboutDiv'
const AboutUs = (): JSX.Element => {
  return (
    <>
      {/* Rest of the Sections */}
      <HistoryAndMission />
      <SupDetailsSection />
      <YouMaySee />
      <PerlicaTeam />
      <MainAboutDiv />
    </>
  )
}

export default AboutUs