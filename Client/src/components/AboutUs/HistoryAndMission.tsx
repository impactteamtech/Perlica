import type { JSX } from "react";
import { motion } from "framer-motion";
import MotivationDiv from "./MotivationDiv";
import TickerColumn from "./TickerColumn";
import HotspotsMap from "./HotspotMap";

const HistoryAndMission = (): JSX.Element => {
  return (
    <motion.div
      className="flex flex-col gap-10 md:gap-7 py- px-6 lg:px-15"
    >
      {/* div 1 */}
      <motion.div
        className="flex flex-col lg:flex-row gap-10 md:gap-15 items-start"
      >
        <motion.div
          className="w-full lg:w-1/2 flex flex-col gap-4"
        >
          <h1 className="text-4xl text-center lg:text-left lg:text-5xl xl:text-6xl color-primary font-mono title-font leading-tight">
            WE'RE DEDICATED TO MAKE EVERY JOURNEY EXCEPTIONAL
          </h1>
          <p className="text-base text-center lg:text-left text-font">
            Established in <span className="font-medium text-secondary title-font">2007</span>, We deliver high-quality travel services through a
            strong, enthusiastic, and professional multinational team.
            With extensive expertise in regional and international travel, tourism, and hospitality.
            Our mission is to provide exceptional travel experiences that exceed our clients' expectations.
            We are committed to delivering personalized services, ensuring every journey is memorable and unique.
          </p>
        </motion.div>
        <TickerColumn />
       
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row gap-6 lg:mt-30 md:gap-8"
      >
        {/* part 1 */}
        <motion.div
          className="w-full lg:w-1/2 min-w-0"
        >
          <MotivationDiv />
        </motion.div>

        {/* part 2 */}
        <motion.div
          className="w-full hidden lg:block md:w-1/2 min-w-0"
        >
          <HotspotsMap />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HistoryAndMission;
