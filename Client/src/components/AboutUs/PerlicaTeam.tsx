import type {JSX} from 'react'
import { tourGuides } from '../../lib/staticData'
import TourGuideCard from './TourGuideCard'
import PingDot from './PingDot'
const PerlicaTeam = (): JSX.Element => {
  return (
    <div className='w-full  pb-10 px-15 flex min-h-screen flex-col gap-40'>
    
      <div className='flex gap-10'>
        <div className='relative w-[40%] flex'>
          <img 
          className='w-100  hover:scale-105 transition-transform duration-200 hover:z-10 rounded-lg border-[#efebe5]/90   border-4'
          src="/tour_guides/perlica_team1.jpg" alt="team-member-1"/>
          <img 
          className='w-100 hover:scale-105 transition-transform duration-200 relative top-30 right-40 rounded-lg border-[#efebe5]/90 border-4'
          src="/tour_guides/perlica_team2.jpg" alt="team-member-2"/>
        </div>
        <div className='flex w-[60%] flex-col gap-10 items-center justify-center'>
          <div className='flex flex-col gap-3 items-center justify-center'>
            <h2 className='text-6xl text-center color-primary title-font font-mono'>
              MEET OUR EXPERT TOUR GUIDES
            </h2>
            <h3 className='text-4xl text-black/80 title-font font-mono text-center'>
              Let's Make Your Next Journey Extraordinary
            </h3>
          </div>
         <div className='w-[100%] flex flex-col gap-2 items-center justify-center'>
            <p className='text-gray-900/80 lg:leading-loose text-center text-font text-xl w-[80%] leading-relaxed'>
              Our Expert Team has combined deep local knowledge with global travel insight 
              to create safaris and tours you'll never forget. All you have to do is explore
              whether it's your first safari or your fiftieth, we'll show you the hidden gems
              others miss, all at the the best value possible.<br />
            </p>
         </div>
        </div>
      </div>
      {/* Second part */}
      <div className='flex flex-col gap-5'>
        <div className="flex items-center  gap-2">
          <PingDot />
          <h4 className="text-2xl w-[10%] title-font font-medium ">Tour Guides</h4>
          <div className="w-[90%] h-[1px] bg-black "/>
       </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {tourGuides.map((guide, index) =>
          <TourGuideCard 
          key={index} guide={guide} />
        )}
      </div>
      </div>
    
         
    </div>
  )
}

export default PerlicaTeam