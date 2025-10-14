import { IoMdArrowDropleft } from "react-icons/io";
import type { JSX } from "react";
import { motion } from "framer-motion";

const MainAboutDiv = (): JSX.Element => {
  return (
    <div className='pt-33 flex flex-col items-center w-full pb-5'>
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
                <button
                  type="button"
                  aria-label="Previous"
                  title="Previous"
                  className='bg-red-600 border-3 relative right-4 z-40 border-[#efebe5] p-3 rounded-full  text-white'
                >
                  <IoMdArrowDropleft  size={30}/>
                </button>
                <img 
                className='w-60 relative bottom-10 right-[62px] h-20'
                src="/herb.png" alt="claude"/>
              </div>
            </div>
            <div className='flex w-100  justify-center relative items-center'>
              {/* Tanzania Balloon */}
              <motion.img
                className="w-70 relative top-10"
                src="/tanzania_ballon.png"
                alt="Tanzania ballon"
                initial={{ y: 0, x: 0 }}
                animate={{ 
                  y: [0, -15, 0],
                  x: [0, -5, 0]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
              
              {/* Kenya Balloon */}
              <motion.img
                initial={{ y: 0 }}
                animate={{ 
                  y: [0, -25, 0],
                  rotate: [0, -2, 0, 2, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="w-100 will-change-transform"
                src="/ballon.png"
                alt="Kenya ballon"
              />
              
              {/* Uganda Balloon */}
              <motion.img
                className="w-70 relative top-10"
                src="/unganda_ballon.png"
                alt="Uganda ballon"
                initial={{ y: 0, x: 0 }}
                animate={{ 
                  y: [0, -20, 0],
                  x: [0, 5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
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