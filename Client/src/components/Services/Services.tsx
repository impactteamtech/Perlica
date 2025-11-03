import type { JSX } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";
import { services } from "../../lib/staticData";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import ImageTrail from "./ImageTrail";
import TravelInformation from "./TravelInformation";

const Services = (): JSX.Element => {
  const PAGE_SIZE = 3;
  const [startIndex, setStartIndex] = useState(0);

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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Hero Section */}
      <motion.div
        className="relative overflow-hidden h-80 md:h-[500px]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: true }}
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-700/20 via-green-600/20 to-black/20">
            SERVICES.
          </span>
        </motion.h1>

        <ImageTrail
          items={[
            "/services/hotel_reservation.jpg",
            "/services/get_ticket.jpg",
            "/services/group_travel.jpg",
            "/services/safari_tour_package2.jpg",
            "/services/safari_tour_package1.jpg",
            "/services/conference.jpg",
          ]}
          variant={1}
        />
      </motion.div>

      {/* Description Section */}
      <motion.div
        className="w-full flex flex-col lg:flex-row items-start gap-6 lg:gap-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="w-full lg:w-[60%] flex flex-col relative">
          <img
            src="/shild.png"
            className="w-14 sm:w-16 opacity-100 top-10 md:top-14 absolute md:right-20 sm:right-30"
            alt="kenya-shild"
          />
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl absolute lg:[-webkit-text-stroke:3px_#efebe5] top-16 sm:top-13 z-100 color-primary left-6 sm:left-17 md:left-20 lg:left-27 title-font lg:font-bold font-mono">
            TOP NOTCH QUALITY
            <br />
            SERVICES WE PROVIDE
          </h1>
          <div className="w-full hidden brightness-70 lg:block lg:w-[40%] p-6 lg:p-10 relative opacity-100 h-full bg-[url('/decorator_bg.png')] bg-cover bg-center mt-48 sm:mt-40 lg:mt-0">
            <div className="w-32 sm:w-40 h-60 sm:h-72 lg:h-80"></div>
          </div>
        </div>

        <motion.div
          className="w-full lg:w-[40%] lg:border-l-2 lg:pl-12 border-black mt-36 lg:mt-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-font text-gray-900/80 leading-relaxed sm:text-lg md:text-xl lg:leading-8">
            We offer a wide range of services to cater to your travel needs,
            ensuring a seamless and memorable experience from start to finish.
            Whether you're planning a solo adventure, a family vacation, or a
            corporate trip, our dedicated team is here to assist you every step
            of the way.
          </p>
        </motion.div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="flex w-full justify-end my-6 lg:relative lg:bottom-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex gap-4 items-center">
          <button
            onClick={handlePrev}
            title="previous"
            className="border-black/70 border-1 cursor-pointer hover:scale-105 rounded-full duration-150 transition-transform p-4"
          >
            <IoMdArrowBack size={20} />
          </button>
          <button
            onClick={handleNext}
            title="next"
            className="border-black/70 border-1 cursor-pointer hover:scale-105 rounded-full duration-150 transition-transform p-4"
          >
            <IoMdArrowForward size={20} />
          </button>
        </div>
      </motion.div>

      {/* Services Cards */}
      <motion.div
        className="w-full relative flex flex-col gap-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        viewport={{ once: true }}
      >
        <img
          src="/curve_arrow.png"
          className="hidden md:block w-20 md:w-30 h-20 md:h-30 opacity-55 ml-10 md:ml-20 mr-6 md:mr-10 -rotate-20"
          alt="curve_arrow"
        />
        <div className="absolute top-10 lg:bottom-0 lg:left-60 lg:top-0 gap-4 w-full flex">
          {visibleServices.map((service, i) => (
            <motion.div
              key={service._idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.7 + i * 0.1,
              }}
              viewport={{ once: true }}
            >
              <ServiceCard
                index={service._idx}
                img={service.img}
                description={service.description}
                name={service.name}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Travel Info */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
        viewport={{ once: true }}
      >
        <TravelInformation />
      </motion.div>
    </motion.section>
  );
};

export default Services;
