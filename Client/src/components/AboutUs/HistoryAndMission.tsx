import type { JSX } from "react";
import MotivationDiv from "./MotivationDiv";
import TickerColumn from "./TickerColumn";
import HotspotsMap from "./HotspotMap";
const HistoryAndMission = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-10 min-h-screen py-10 px-4 md:px-15 mt-32" id='about-us'>
      {/* div 1 */}
     <div className="flex gap-3">
        <div className="w-[50%] flex-col gap-4 flex">
          <h1 className="color-primary text-6xl font-mono title-font">WE'RE DEDICATED TO MAKE EVERY JOURNEY EXCEPTIONAL</h1>
          <p className="text-xl text-font text-black/70">
            Established in <span className="font-medium title-font">2007</span>, We deliver high-quality travel services through a
            strong, enthusiastic, and professional multinational team.
            With extensive expertise in regional and international travel, tourism, and hospitality.
            Our mission is to provide exceptional travel experiences that exceed our clients' expectations.
            We are committed to delivering personalized services, ensuring every journey is memorable and unique.
          </p>
       
        </div>
      
        <TickerColumn  />        
     </div>

      {/* div 2 */}
      <div className="flex mt-13 gap-4">
        <MotivationDiv />
        {/* part 2 */}
        <HotspotsMap />
      </div>
    </div>
  );
};

export default HistoryAndMission;


