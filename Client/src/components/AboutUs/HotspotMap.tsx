const HotspotsMap = () => {
  return (
    <div className="w-full  md:w-[100%] flex relative items-center justify-center ">
      {/* Base imagery */}
  <img src="/shining.png" alt="balloon"  className="w-12 sm:w-16 md:w-20 absolute opacity-50 bottom-32 left-28 sm:bottom-40 sm:left-40 md:bottom-50 md:left-50"/>
  <img src="/trajectory.png" className="w-64 sm:w-96 md:w-130 relative right-10 sm:right-16 md:right-28 z-10 select-none pointer-events-none" alt="trajectory" />
      <img
  className="w-72 h-72 sm:w-96 sm:h-96 md:w-120 md:h-120 absolute opacity-100 right-0 z-0 select-none pointer-events-none" 
      src="/kenya_map.png" alt="Kenya map"/>
      <img 
  className="w-16 h-16 sm:w-24 sm:h-24 md:w-30 md:h-30 animate-pulse absolute -bottom-10 sm:-bottom-16 md:-bottom-30 opacity-30"
      src="/compass.png" alt="compass"/>
    </div>
  );
};

export default HotspotsMap;