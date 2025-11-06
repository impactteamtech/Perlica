import { useState } from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { motion, AnimatePresence, type Variants } from "framer-motion";
interface Hotspot {
  id: string;
  img: string;
  description?: string;
  position: string; 
  previewOffset?: { x?: number; y?: number }; // fine tune preview placement
}

const hotspots: Hotspot[] = [
  {
    id: "south",
    img: "/good-view-1.jpg",
    description: "WAJIR",
    position: "right-20 bottom-45",
    previewOffset: { x: 20, y: -40 }
  },
  {
    id: "north",
    img: "/good-view-2.jpg",
    description: "GREAT RIFT VALLEY ",
    position: "left-86 -top-10",
    previewOffset: { x: -40, y: 20 }
  },
  {
    id: "east",
    img: "/good-view-3.jpg",
    description: "MALINDI",
    position: "right-29 -bottom-10",
    previewOffset: { x: 30, y: -30 }
  },
];

const previewVariants: Variants = {
  initial: { opacity: 0, scale: 0.6, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
  exit: { opacity: 0, scale: 0.6, y: 10, transition: { duration: 0.25 } }
};

const ringPulse = "after:content-[''] after:absolute after:inset-0 after:rounded-full after:border after:border-secondary/40 after:animate-ping";

const HotspotsMap = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="w-full  md:w-[100%] flex relative items-center justify-center ">
      {/* Base imagery */}
  <img src="/shining.png" alt="balloon"  className="w-12 sm:w-16 md:w-20 absolute opacity-50 bottom-32 left-28 sm:bottom-40 sm:left-40 md:bottom-50 md:left-50"/>
  <img src="/trajectory.png" className="w-64 sm:w-96 md:w-130 relative right-10 sm:right-16 md:right-28 z-10 select-none pointer-events-none" alt="trajectory" />
      <img
  className="w-72 h-72 sm:w-96 sm:h-96 md:w-120 md:h-120 absolute opacity-100 right-0 z-0 select-none pointer-events-none" 
      src="/kenya_map.png" alt="Kenya map"/>
      <img 
  className="w-16 h-16 sm:w-24 sm:h-24 md:w-30 md:h-30 animate-pulse absolute -bottom-10 sm:-bottom-16 md:-bottom-30 opacity-30"
      src="/compass.png" alt="compass"/>

      {/* Hotspot buttons */}
      {hotspots.map(h => {
        const isActive = activeId === h.id;
        return (
          <div key={h.id} className={`absolute ${h.position} z-20`}
            onMouseEnter={() => setActiveId(h.id)}
            onMouseLeave={() => setActiveId(a => (a === h.id ? null : a))}
            onFocus={() => setActiveId(h.id)}
            onBlur={() => setActiveId(a => (a === h.id ? null : a))}
          >
            <button
              title={h.description ?? h.id}
              className={`relative size-14 rounded-full flex items-center justify-center bg-white backdrop-blur-sm shadow-md border border-secondary/30 text-secondary cursor-pointer transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${isActive ? 'scale-110' : 'animate-pulse'} ${ringPulse}`}
              aria-describedby={`hotspot-${h.id}-desc`}
            >
              <FaLocationCrosshairs size={28} />
            </button>
            <AnimatePresence>
              {isActive && (
                <motion.div
                  key={h.id + '-preview'}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={previewVariants}
                  className="absolute z-30 -top-4 left-1/2 -translate-x-1/2"
                  style={{
                    transformOrigin: 'center',
                    marginLeft: h.previewOffset?.x ?? 0,
                    marginTop: h.previewOffset?.y ?? 0
                  }}
                >
                  <div className="relative group">
                    <motion.img
                      src={h.img}
                      alt={h.description ?? h.id}
                      className="w-48 h-48 object-cover rounded-2xl border-4 border-white shadow-xl shadow-black/30 ring-2 ring-secondary/40"
                      whileHover={{ scale: 1.03 }}
                      transition={{ type:"decay"}}
                    />
                    {/* Glass label */}
                   
                  </div>
                  {/* Description bubble */}
                  {h.description && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="mt-2 w-44 text-[13px] leading-snug  bg-white/75 backdrop-blur-sm border text-center border-white/50 rounded-lg p-2 shadow-md text-black/80 font-bold"
                    >
                      {h.description}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default HotspotsMap;