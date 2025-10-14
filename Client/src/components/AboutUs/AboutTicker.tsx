import React from 'react'
import { motion } from 'framer-motion'

const AboutTicker = () => {
  const cities: {
    name: string,
    icon: string,
  }[] = [
    {
      name: "Kenya",
      icon: "/values/kenya.png"
    },
    {
      name: "Tanzania",
      icon: "/values/tanzania.png"
    },
    {
      name: "Uganda",
      icon: "/values/uganda.png"
    },
    {
      name: "Nairobi",
      icon: "/values/nairobi.png"
    },
    {
      name: "National Park",
      icon: "/values/national-park.png"
    },
    {
      name: "Nature Activities",
      icon: "/values/nature_activities.png"
    },
  ];

  // Duplicate the cities for seamless loop
  const duplicatedCities = [...cities, ...cities];

  // Animation variants for the scroll
  const scrollVariants = {
    animate: {
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  // Hover animation for individual items
  const itemVariants = {
    initial: {
      scale: 1,
      y: 0,
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
    },
    hover: {
      scale: 1.05,
      y: -2,
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-red-700 via-black/90 to-white overflow-hidden py-4">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary/30 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary/30 to-transparent z-20 pointer-events-none" />
      
      {/* Scrolling container with Framer Motion */}
      <motion.div
        className="flex whitespace-nowrap"
        variants={scrollVariants}
        animate="animate"
        whileHover={{ animationPlayState: "paused" }}
      >
        {duplicatedCities.map((city, index) => (
          <motion.div
            key={index}
            className="inline-flex items-center mx-6 px-3 py-2 rounded-md bg-white/80 backdrop-blur-md border border-white/40 flex-shrink-0"
            initial="initial"
            whileHover="hover"
            variants={itemVariants}
          >
            <motion.img
              src={city.icon}
              alt={city.name}
              className="w-10 h-10 object-cover"
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                transition: { type: "spring", stiffness: 300 }
              }}
            />
            <motion.span 
              className="text-black font-semibold text-lg ml-4 tracking-wide whitespace-nowrap"
              whileHover={{ color: "#1f2937" }}
            >
              {city.name}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>

      {/* Pulsing border animation */}
      <motion.div 
        className="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none"
        animate={{
          borderColor: ["rgba(255,255,255,0)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0)"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

export default AboutTicker