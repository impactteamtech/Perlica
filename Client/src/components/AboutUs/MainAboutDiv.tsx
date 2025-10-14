import { IoMdArrowDropleft } from "react-icons/io";
import type { JSX } from "react";
const MainAboutDiv = ():JSX.Element => {
  return (
    <div className='pt-33 flex flex-col items-center w-full pb-5' >
        <div className='card-background-color shadow-sm shadow-black/10  px-10 relative justify-between flex gap- w-full h-60  py-10'>
            {/* Waves */}
            <img 
            className='absolute bottom-0 w-15 left-0  opacity-70'
            alt="Waves" src="/waves.png" />
            <div className='relative'>
              <div className='w-60 h-50 absolute rounded-lg border-4 border-[#efebe5] bottom-[30px] bg-[#509530] '/>
              <img 
                className='w-50 relative bottom-33'
                src="/taking_pictures.png" 
              alt="Taking Pictures" />
              <div className='flex items-center relative bottom-40'>
                <button className='bg-red-600 border-3 relative right-4 z-40 border-[#efebe5] p-3 rounded-full  text-white'>
                  <IoMdArrowDropleft  size={30}/>
                </button>
                <img 
                className='w-60 relative bottom-10 right-[62px] h-20'
                src="/herb.png" alt="claude"/>
              </div>
            </div>
              <div className='flex-col relative items-center flex gap-2'>
              {/* decorators */}
           
              <img 
              className='relative  left-5  bottom-4 w-140'
              alt="kenya name" 
              src="/kenya_name.png"/>
            </div>
            {/* last positioned div */}
            <div className="relative">
              {/* <div className='w-80 h-70 absolute  rounded-lg border-4 border-[#efebe5] -top-40 bg-[#008d42] '/> */}
              <img 
              className='w-80 relative bottom-16'
              src="/taking_ticket.png" 
              alt="Taking Pictures" />
            </div>
        </div>
    </div>
   
  )
}

export default MainAboutDiv