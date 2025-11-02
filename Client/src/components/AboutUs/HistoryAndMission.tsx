import type { JSX } from "react";
import { motion } from "framer-motion";
import MotivationDiv from "./MotivationDiv";
import TickerColumn from "./TickerColumn";
import HotspotsMap from "./HotspotMap";

const HistoryAndMission = (): JSX.Element => {
  return (
    <motion.div
      className="flex flex-col gap-10 md:gap-34 min-h-screen py-10 px-4 md:px-15"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* div 1 */}
      <motion.div
        className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="w-full lg:w-1/2 flex flex-col gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h1 className="color-primary title-font font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            WE'RE DEDICATED TO MAKE EVERY JOURNEY EXCEPTIONAL
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-font text-black/70">
            Established in <span className="font-medium title-font">2007</span>, We deliver high-quality travel services through a
            strong, enthusiastic, and professional multinational team.
            With extensive expertise in regional and international travel, tourism, and hospitality.
            Our mission is to provide exceptional travel experiences that exceed our clients' expectations.
            We are committed to delivering personalized services, ensuring every journey is memorable and unique.
          </p>
        </motion.div>
        <TickerColumn />
       
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row gap-6 md:gap-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        viewport={{ once: true }}
      >
        {/* part 1 */}
        <motion.div
          className="w-full md:w-1/2 min-w-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          viewport={{ once: true }}
        >
          <MotivationDiv />
        </motion.div>

        {/* part 2 */}
        <motion.div
          className="w-full hidden md:block md:w-1/2 min-w-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
          viewport={{ once: true }}
        >
          <HotspotsMap />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HistoryAndMission;
