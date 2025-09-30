// please use background-color for all sections -R
//Trying something with the background neumorphism - R
import type {JSX}  from 'react'
import HistoryAndMission from './HistoryAndMission'
import PerlicaTeam from './PerlicaTeam'
import SupDetailsSection from './SupDetailsSection'
import YouMaySee from './YouMaySee'
const AboutUs = (): JSX.Element => {
  return (
    <>
      <HistoryAndMission />
      <SupDetailsSection />
      <YouMaySee />
      <PerlicaTeam />
    </>
  )
}

export default AboutUs
