// please use background-color for all sections -R

import type {JSX}  from 'react'
import HistoryAndMission from './HistoryAndMission'
import PerlicaTeam from './PerlicaTeam'
import { DotIcon } from 'lucide-react'
const AboutUs = (): JSX.Element => {
  return (
    <section className='min-h-screen py-10 px-15  block flex-col gap-2 rounded-t-2xl background-color mt-40'> 
       <h5 className='text-lg font-baskerville font-bold text-secondary/60'>
         <DotIcon  className='inline-block' /> About Us
       </h5>
       <HistoryAndMission />
       <PerlicaTeam />
    </section>
  )
}

export default AboutUs
