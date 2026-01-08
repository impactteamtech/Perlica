
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
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-black via-black to-white overflow-hidden py-4">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary/30 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary/30 to-transparent z-20 pointer-events-none" />
      {/* WE NEED TO SPECIFY A TYPE FOR THE VARIANTS */}
      {/* Scrolling container with Framer Motion */}
      <motion.div
        className="flex whitespace-nowrap"
        variants={scrollVariants as any}
        animate="animate"
        whileHover={{ animationPlayState: "paused" }}
      >
        {/* adding any type for variant for production (yp) */}
        {duplicatedCities.map((city, index) => (
          <motion.div
            key={index}
            className="inline-flex items-center mx-6 px-3 py-1  flex-shrink-0"
            initial="initial"
            whileHover="hover"
            variants={itemVariants as any}
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
              className="text-white font-bold text-xl ml-4 tracking-wide whitespace-nowrap"
            >
              {city.name}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>

  
    </div>
  )
}

export default AboutTicker