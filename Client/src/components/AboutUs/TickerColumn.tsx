import { motion, useAnimationFrame, useMotionValue } from "framer-motion"  
import { useRef, useState, useCallback } from "react" 
import type { JSX } from "react"    
import { IoLocation } from "react-icons/io5";
import { kenyaImages } from "../../lib/staticData";

const TickerColumn = (): JSX.Element => {
  const baseY = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const SPEED = 20
  const doubled = [...kenyaImages, ...kenyaImages]
  
  useAnimationFrame((_, delta) => {
    if (isPaused) return
    const dy = (SPEED * (delta / 1000))
    const height = containerRef.current?.scrollHeight || 0
    const singleHeight = height / 2
    let next = baseY.get() - dy
    if (Math.abs(next) >= singleHeight) next = 0
    baseY.set(next)
  })

  const pause = useCallback(() => setIsPaused(true), [])
  const resume = useCallback(() => setIsPaused(false), [])

  return (
    <motion.div
      className="w-full lg:w-[50%] h-96 overflow-hidden relative group"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
    >
 

      {/* Enhanced motion container */}
      <motion.div
        ref={containerRef}
        className="flex flex-col gap-4 will-change-transform p-2"
        style={{ y: baseY }}
      >
        {doubled.map((item, i) => (
          <div 
            key={i} 
            className="relative h-80 w-full overflow-hidden rounded-lg shadow-2xl shadow-black/30 group/item transition-all duration-300 hover:shadow-red-500/20"
          >
            {/* Enhanced image with better hover effects */}
            <img
              src={item.path}
              alt={item.placeName}
              loading="lazy"
              className="h-full w-full object-cover transition-all duration-500 group-hover/item:scale-110 group-hover/item:brightness-110"
            />
            
            {/* Enhanced overlay with better typography and background */}
            <div className="absolute inset-x-0 bottom-0 p-4 pointer-events-none">
              <div className="bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-xl p-4 backdrop-blur-sm ">
                <h3 className="text-white font-bold tracking-wide text-lg flex items-center gap-2 mb-1">
                  <IoLocation className="text-green-400 animate-pulse" size={20} /> 
                  {item.placeName}
                </h3>
                <p className="text-white/90 text-sm leading-tight font-medium">
                  {item.location}
                </p>
              </div>
            </div>

            {/* Enhanced top gradient overlay */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </motion.div>


      
    </motion.div>
  )
} 

export default TickerColumn