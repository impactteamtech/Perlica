const HotspotsMap = () => {
  return (
    <div className="w-full  lg:w-[100%] relative items-center justify-center ">
      {/* Base imagery */}
      <img src="/shining.png" alt="balloon"  
        className="lg:w-10 xl:w-15 absolute opacity-50 xl:right-20  lg:-top-24 lg:right-1"/>
      <img src="/trajectory.png" 
        className="lg:w-130 absolute lg:top-27 xl:top-10 xl:-left-20 lg:right-28 z-10 select-none pointer-events-none" alt="trajectory" />
      <img
        className="lg:w-[80%] lg:h-110 lg:left-30  relative bottom-20  opacity-80 z-0 select-none pointer-events-none" 
        src="/kenya_map.png" alt="Kenya map"/>
      <img 
        className="lg:w-30 lg:h-30 animate-pulse top-1 -left-5 lg:left-20  absolute opacity-30"
        src="/compass.png" alt="compass"/>
    </div>
  );
};

export default HotspotsMap;