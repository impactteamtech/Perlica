import React from "react";
import { motion } from "framer-motion";
import heroImg from "../../../public/heroSafari.mp4";
import Heropng from "/Perlica_logo.png";
import textImg from "/kenya.jpg";
import HeroCTA from "./HeroCTA";
import HeroShades from "./HeroShades";

const Hero: React.FC = () => {
  const text = "Perlica";

  // stagger containers
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.25 },
    },
  };
  const char = {
    hidden: { y: 40, opacity: 0, scale: 0.96, filter: "blur(6px)" },
    visible: {
      y: 0, opacity: 1, scale: 1, filter: "blur(0px)",
      transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1], type: "spring", damping: 18, stiffness: 140 }
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Logo – top-left */}
      <motion.img
        src={Heropng}
        alt="Perlica"
        className="absolute top-4 left-4 z-40 w-20 h-auto md:w-28"
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      />

      

      {/* Background video zoomin (yp) */}
      <motion.video
        autoPlay loop muted playsInline aria-hidden
        className="absolute inset-0 w-full h-full object-cover z-0 mask-b-from-30% mask-b-to-95%"
        initial={{ scale: 0.96, opacity: 0.8, filter: "blur(6px)" }}
        animate={{ scale: 1.12, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 9, ease: [0.2, 0, 0.2, 1] }}
        style={{ willChange: "transform, opacity, filter" }}
      >
        <source src={heroImg} type="video/mp4" />
      </motion.video>

      {/* Glows  */}
      <HeroShades />

      {/* Content */}
      <div className="relative z-30 px-4 text-center">
        {/* Welcome */}
        <motion.span
          className="hero-font text-black text-[clamp(1.25rem,4vw,3rem)] leading-tight"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
        >
          Welcome to
        </motion.span>

        {/* Perlica split text (yp) */}
        <motion.h1
          variants={container}
          initial="hidden"
          animate="visible"
          className="
            m-0 text-center leading-[0.92] font-extrabold
            text-[clamp(3.5rem,12vw,16rem)] tracking-[-0.02em]
            bg-clip-text text-transparent
            [-webkit-text-stroke:3px_rgba(0,0,0,0.35)]
            [text-shadow:0_0_14px_rgba(255,255,255,0.35)]
          "
          style={{
            backgroundImage: `url(${Heropng})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {text.split("").map((c, i) => (
            <motion.span key={i} variants={char} className="inline-block">
              {c}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tours & Travel  slides up (yp) */}
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="
            mt-2 hero-font font-bold leading-[0.95]
            text-[clamp(3rem,10vw,12rem)] tracking-[-0.01em]
            bg-clip-text text-transparent bg-cover bg-center bg-no-repeat
            [-webkit-text-stroke:2px_rgba(255,255,255,0.9)]
          "
          style={{ backgroundImage: `url(${textImg})` }}
        >
          Tours &amp; Travel
        </motion.h2>

      
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 inline-block"
        >
          <HeroCTA />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
