import { useState } from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { motion, AnimatePresence, type Variants } from "framer-motion";
interface Hotspot {
  id: string;
  img: string;
  label: string;
  description?: string;
  // tailwind positioning classes relative to container
  position: string; 
  previewOffset?: { x?: number; y?: number }; // fine tune preview placement
}

const hotspots: Hotspot[] = [
  {
    id: "south",
    img: "/good-view-1.jpg",
    label: "Savannah Vista",
    description: "Golden plains & wildlife routes",
    position: "right-16 bottom-44",
    previewOffset: { x: 20, y: -40 }
  },
  {
    id: "north",
    img: "/good-view-2.jpeg",
    label: "Samaia",
    description: "Kenya Old People",
    position: "left-90 top-4",
    previewOffset: { x: -40, y: 20 }
  },
  {
    id: "east",
    img: "/good-view-3.jpg",
    label: "Safari",
    description: "Amazing Safari",
    position: "right-30 bottom-6",
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
    <div className="w-[50%] flex relative items-center justify-center">
      {/* Base imagery */}
      <img src="/trajectory.png" className="w-110 mr-30 z-10 select-none pointer-events-none" alt="trajectory" />
      <img className="w-100 h-75 absolute opacity-50 right-0 z-0 select-none pointer-events-none" src="/kenya_map.png" alt="Kenya map"/>

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
              title={h.label}
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
                      alt={h.label}
                      className="w-48 h-48 object-cover rounded-2xl border-4 border-white shadow-xl shadow-black/30 ring-2 ring-secondary/40"
                      whileHover={{ scale: 1.03 }}
                      transition={{ type:"decay"}}
                    />
                    {/* Glass label */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium bg-white/80 backdrop-blur border border-white/60 shadow-sm text-secondary" id={`hotspot-${h.id}-desc`}>
                      {h.label}
                    </div>
                  </div>
                  {/* Description bubble */}
                  {h.description && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="mt-2 w-44 text-[11px] leading-snug bg-white/75 backdrop-blur-sm border border-white/50 rounded-lg p-2 shadow-md text-black/70"
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