import type { JSX } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";
import { services } from "../../lib/staticData";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import ImageTrail from "./ImageTrail";
import TravelInformation from "./TravelInformation";

const Services = (): JSX.Element => {
  const PAGE_SIZE = 4;
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

        {/* <ImageTrail
          items={[
            "/services/hotel_reservation.jpg",
            "/services/get_ticket.jpg",
            "/services/group_travel.jpg",
            "/services/safari_tour_package2.jpg",
            "/services/safari_tour_package1.jpg",
            "/services/conference.jpg",
          ]}
          variant={1}
        /> */}
      </motion.div>


      {/* Buttons */}
      <motion.div
        className="flex w-full justify-end my-6 mt-10 lg:relative lg:bottom-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex gap-4 items-center">
          <button
            onClick={handlePrev}
            title="previous"
            className=" bg-black text-white  cursor-pointer hover:scale-105 rounded-full duration-150 transition-transform p-4"
          >
            <IoMdArrowBack size={20} />
          </button>
          <button
            onClick={handleNext}
            title="next"
            className=" bg-secondary text-white  cursor-pointer hover:scale-105 rounded-full duration-150 transition-transform p-4"
          >
            <IoMdArrowForward size={20} />
          </button>
        </div>
      </motion.div>

      {/* Services Cards */}
      <motion.div
        className="w-full relative flex  gap-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        viewport={{ once: true }}
      >
      
        <div className="gap-4 w-full flex">
          {visibleServices.map((service) => (
            <motion.div
              key={service._idx}
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
