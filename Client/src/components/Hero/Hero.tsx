/* ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                      DEV CARD (yp)                 ┃
   ┣━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
   ┃ Initials ┃ Use // [yp] to tag any inline changes   ┃
   ┣━━━━━━━━━━╋━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
   ┃ Stack    ┃ TS → JS → Tailwind → React              ┃
   ┣━━━━━━━━━━╋━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
   ┃ Cadence  ┃ Weekly tasks · Weekly review pre-merge  ┃
   ┣━━━━━━━━━━╋━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
   ┃ Cleanup  ┃ Remove ALL comments at completion       ┃
   ┣━━━━━━━━━━╋━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
   ┃ Commits  ┃ feat(scope): message  [yp]              ┃
   ┗━━━━━━━━━━┻━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ */

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform,  } from "framer-motion";
import heroImg from "../../../public/heroSafari.mp4";
import Heropng from "/Perlica_logo.png";
import textImg from "/kenya.jpg";
import HeroShades from "./HeroShades";
import SearchPackages from "../SearchPackages/SearchPackages";


const Hero: React.FC = () => {
  const text = "Perlica";

  // Stagger containers
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
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.75,
        ease: [0.25, 0.1, 0.25, 1],
        type: 'spring',
        damping: 18,
        stiffness: 140,
      },
    },
  };

  // Scroll-based parallax effect
  const { scrollY } = useScroll();
  const yVideo = useTransform(scrollY, [0, 500], [0, 250]); 
  const yText = useTransform(scrollY, [0, 500], [0, -100]); 

  // Mouse-based parallax
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 30); 
      setMouseY((e.clientY / window.innerHeight - 0.5) * 30);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden  flex flex-col items-center justify-center">
      {/* Logo  top left (yp) */}
      <motion.img
        src={Heropng}
        alt="Perlica"
        className="absolute top-0 left-2 z-40 w-20 h-auto md:w-68"
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      />

      {/*  */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={{ clipPath: "circle(150% at 50% 50%)" }}
        transition={{ duration: 5.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          willChange: "clip-path",
        }}
      >
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
          className="w-full h-full object-cover "
          style={{
            y: yVideo,
            scale: 1.12,
          }}
          initial={{ scale: 0.96, opacity: 0.8, filter: "blur(10px)" }} 
          animate={{ scale: 1.15, opacity: 1, filter: "blur(0px)" }} 
          transition={{ duration: 12, ease: "easeOut" }} 
        >
          <source src={heroImg} type="video/mp4" />
        </motion.video>
        
      </motion.div>

      {/* Glows */}
      <HeroShades />

      {/* Content (yp) */}
      <div
        className="relative z-30 px-4 text-center"
        style={{ transform: `translate(${mouseX}px, ${mouseY}px)` }}
      >
        {/* Welcome (yp) */}
        <motion.span
          className="hero-font text-black text-[clamp(1.25rem,4vw,3rem)] leading-tight"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
        >
          Welcome to
        </motion.span>

        {/* Perlica (yp) */}
        <motion.h1
          variants={container}
          initial="hidden"
          animate="visible"
          className="
            m-0 text-center leading-[0.92] font-extrabold
            text-[clamp(3.5rem,12vw,10rem)] tracking-[-0.02em]
            bg-clip-text text-transparent
            [-webkit-text-stroke:3px_rgba(0,0,0,0.35)]
            [text-shadow:0_0_14px_rgba(255,255,255,0.35)]
          "
          style={{
            backgroundImage: `url(${Heropng})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            y: yText,
          }}
        >
          {text.split("").map((c, i) => (
            <motion.span key={i} variants={char} className="inline-block">
              {c}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tours & Travel (yp) */}
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="
            mt-2 hero-font font-bold leading-[0.95]
            text-[clamp(3rem,10vw,12rem)] tracking-[-0.01em]
            bg-clip-text text-transparent bg-cover bg-center bg-no-repeat
            [-webkit-text-stroke:2px_rgba(255,255,255,1)]
          "
          style={{ backgroundImage: `url(${textImg})`, y: yText }}
        >
          Tours &amp; Travel
        </motion.h2>

        {/* CTA  (yp) */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 inline-block"
        >
        
          <SearchPackages/>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
