import { motion, useAnimationFrame, useMotionValue } from "framer-motion"  
import { useRef, useState, useCallback } from "react" 
import type { JSX } from "react"    
import { IoLocation } from "react-icons/io5";
import { kenyaImages } from "../../lib/staticData";
const TickerColumn = ():JSX.Element => {
  
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
    <div 
      className="w-[50%] h-96 overflow-hidden relative rounded-md group"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
    
    >
      <motion.div
        ref={containerRef}
        className="flex flex-col gap-2 will-change-transform"
        style={{ y: baseY }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="relative h-80 w-full overflow-hidden rounded-md shadow-sm shadow-black/20 group/item">
            <img
              src={item.path}
              alt={item.placeName}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover/item:scale-105"
            />
            {/* Persistent overlay card */}
            <div className="absolute inset-x-0 bottom-0 p-3 pointer-events-none">
              <div className="bg-gradient-to-r from-black/50 to-transparent rounded-md px-3 py-2 ">
                <h3 className="text-white font-semibold tracking-wide text-sm md:text-2xl flex items-center gap-2">
                  <IoLocation className="text-green-500" size={25} /> {item.placeName}
                </h3>
                <p className="mt-0.5 text-white/80 text-[12px] md:text-[15px] leading-snug line-clamp-2">
                  {item.location}
                </p>
              </div>
              {/* subtle gradient fade behind text for readability */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 via-black/20 to-transparent -z-10" />
            </div>
          </div>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background-color to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background-color to-transparent" />
  
    </div>
  )
} 

export default TickerColumn