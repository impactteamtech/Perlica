import type { JSX } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";
import { services } from "../../lib/staticData";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import TravelInformation from "./TravelInformation";

const Services = (): JSX.Element => {
  const [startIndex, setStartIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const onChange = () => setIsSmallScreen(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const PAGE_SIZE = isSmallScreen ? 1 : 4;

  const visibleServices = Array.from(
    { length: Math.min(PAGE_SIZE, services.length) },
    (_, i) => {
      const realIdx = (startIndex + i) % services.length;
      return { ...services[realIdx], _idx: realIdx };
    }
  );

  const handleNext = () => setStartIndex((prev) => (prev + 1) % services.length);
  const handlePrev = () =>
    setStartIndex((prev) => (prev - 1 + services.length) % services.length);

  return (
    <motion.section
      className="px-4 sm:px-6 lg:px-15 py-10"
    >
      {/* Hero Section */}
      <h1 className="text-4xl lg:text-5xl xl:text-6xl color-primary font-mono title-font leading-tight md:hidden text-center w-full">SERVICES</h1>
      <motion.div
        className="relative hidden  md:block overflow-hidden h-64 sm:h-80 md:h-[500px]"
   
      >
        {/* Decorative vertical lines */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute  left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
            <div className="h-25 w-[3px] rounded-full bg-gradient-to-b from-transparent via-green-600/40 to-transparent shadow-[0_0_16px_rgba(22,163,74,0.25)]" />
            <div className="h-22 w-[2px] rounded-full bg-gradient-to-b from-transparent via-black/30 to-transparent" />
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
            <div className="h-22 w-[2px] rounded-full bg-gradient-to-t from-transparent via-black/30 to-transparent" />
            <div className="h-25 w-[3px] rounded-full bg-gradient-to-t from-transparent via-green-600/40 to-transparent shadow-[0_0_16px_rgba(22,163,74,0.25)]" />
          </div>
        </div>

        {/* Big ghost title */}
        <motion.h1
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center title-font font-extrabold tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-black/10 [text-shadow:_0_2px_0_rgba(0,0,0,0.05)]"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-700/20 via-green-600/20 to-black/20">
            SERVICES.
          </span>
        </motion.h1>

      </motion.div>


      {/* Buttons */}
      <motion.div
        className="flex w-full justify-center sm:justify-end my-6 mt-6 sm:mt-10 lg:relative lg:bottom-10"
      >
        <div className="flex gap-4 items-center">
          <button
            onClick={handlePrev}
            title="previous"
            className="bg-black text-white cursor-pointer hover:scale-105 rounded-full duration-150 transition-transform p-3 sm:p-4"
          >
            <IoMdArrowBack size={20} />
          </button>
          <button
            onClick={handleNext}
            title="next"
            className="bg-secondary text-white cursor-pointer hover:scale-105 rounded-full duration-150 transition-transform p-3 sm:p-4"
          >
            <IoMdArrowForward size={20} />
          </button>
        </div>
      </motion.div>

      {/* Services Cards */}
        <div
          className={
            isSmallScreen
              ? "flex w-full justify-center"
              : "flex md:px-30 xl:px-25 w-full flex-nowrap justify-center gap-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible"
          }
        >
          {visibleServices.map((service) => (
            <div
              key={service._idx}
              className={
                isSmallScreen
                  ? "w-full max-w-[420px]"
                  : "flex-none w-[65%] md:w-[50%] lg:w-[30%]"
              }
            >
              <ServiceCard
                index={service._idx}
                img={service.img}
                description={service.description}
                name={service.name}
              />
            </div>
          ))}
        </div>

      {/* Travel Info */}
      <motion.div
       className="w-full"
      >
        <TravelInformation />
      </motion.div>
    
    </motion.section>
  );
};

export default Services;
