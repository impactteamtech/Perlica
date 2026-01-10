import type { JSX } from "react";
import { motion } from "framer-motion";
import { tourGuides } from "../../lib/staticData";
import TourGuideCard from "./TourGuideCard";
import PingDot from "./PingDot";

const PerlicaTeam = (): JSX.Element => {
  return (
    <motion.div
      className="w-full px-4 sm:px-6 lg:px-16 flex flex-col gap-16 lg:gap-24 overflow-x-clip"
    >
      {/* First part */}
      <motion.div
        className="flex flex-col  py-8 md:py-10 lg:flex-row gap-12 lg:gap-10 items-center"
      >
        <motion.div
          className="relative w-full  lg:w-[40%] flex justify-center lg:justify-start"
        >
          <img
            className="w-44 sm:w-64 lg:w-75 2xl:w-96 max-w-full h-auto hover:scale-105 transition-transform duration-200 hover:z-10 rounded-lg border-[#efebe5]/90 border-4"
            src="/tour_guides/perlica_team1.jpg"
            alt="team-member-1"
          />
          <img
            className="w-50 sm:w-72 lg:w-75 2xl:w-96 max-w-full h-auto top-8 sm:top-10 hover:scale-105 transition-transform duration-200 relative -ml-6 sm:-ml-10 lg:ml-0 lg:top-24 lg:right-40 rounded-lg border-[#efebe5]/90 border-4"
            src="/tour_guides/perlica_team2.jpg"
            alt="team-member-2"
          />
        </motion.div>

        <motion.div
          className="flex w-full lg:w-[60%] flex-col gap-6 lg:gap-10 items-center justify-center"
        >
          <div className="flex flex-col gap-3 items-center justify-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl   2xl:text-6xl text-center color-primary title-font font-mono">
              MEET OUR EXPERT TOUR GUIDES
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black/80 title-font font-mono text-center">
              Let's Make Your Next Journey Extraordinary
            </h3>
          </div>
          <div className="w-full flex flex-col gap-2 items-center justify-center">
            <p className="text-font text-center w-full lg:w-[80%]">
              Our expert team combines local knowledge with global experience to provide safe, reliable, and comfortable transportation.
              Whether it’s your first ride with us or your fiftieth, we ensure a smooth journey, exceptional service, and peace of mind every time.
              <br />
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Second part */}
      <motion.div
        className="flex flex-col gap-5"
      >
        <div className="flex items-center gap-3">
          <PingDot />
          <h4 className="text-lg sm:text-xl md:text-2xl title-font font-medium whitespace-nowrap">
            Tour Guides
          </h4>
          <div className="flex-1 h-px bg-black/30" />
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center"
        
        >
          {tourGuides.map((guide, index) => (
            <motion.div
              key={index}
             
            >
              <TourGuideCard guide={guide} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PerlicaTeam;
