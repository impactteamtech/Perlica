import { motion } from "framer-motion";
import React from "react";
import Marquee from "react-fast-marquee";

const HeroMarquee: React.FC = () => {
  const servicesMarquee = ["Transportation", "Accommodation", "Tour Guide"];

  return (
    <motion.section
      id="banner"
      aria-label="Perlica services"
      className="w-full h-15 text-white mx-5 text-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <Marquee
        className="h-full whitespace-nowrap"
        speed={50}
        gradient={true}
        gradientColor="black"  
        gradientWidth={24}
        pauseOnHover
        autoFill
      >
        {servicesMarquee.map((item, i) => (
          <span key={`${item}-${i}`} className="inline mx-8">
            {item}
          </span>
        ))}
      </Marquee>
    </motion.section>
  );
};

export default HeroMarquee;
