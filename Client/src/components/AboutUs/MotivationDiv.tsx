import { IoIosArrowRoundForward } from "react-icons/io";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";
const MotivationDiv = ():JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full md:w-[100%] rounded-2xl bg-secondary/15 p-5 sm:p-6 md:p-4 lg:p-6 flex flex-col min-h-[1rem]">
      <h1 className="relative z-10 text-4xl leading-tight title-font font-semibold tracking-wide text-[#00d404]">
        EXPLORE
        <br />
        KENYA
      </h1>

      <div className="relative z-10 mt-4 flex flex-1 items-start">
        <div className="w-full sm:w-[65%] md:w-[50%] flex flex-col gap-5 pr-0 sm:pr-4">
          <p className="text-md leading-relaxed text-gray-700 font-sans">
            Discover breathtaking landscapes, vibrant cultures, and timeless safari adventures with Perlica.
          </p>
          <button 
            onClick={()=>navigate('/hotels')}
            className="group cursor-pointer relative inline-flex items-center justify-center w-44 h-12 rounded-md font-semibold tracking-wide text-white bg-[#0cce10] hover:bg-secondary/70 transition-colors overflow-hidden">
            <div className="flex items-center gap-2">
              <span className="relative z-10">Book Now</span>
              <IoIosArrowRoundForward size={30}/>
            </div>
            <span className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-500 origin-center bg-gradient-to-r from-secondary/40 to-secondary/60 mix-blend-overlay" />
          </button>
        </div>

      </div>
      <div className="absolute md:bottom-20 md:w-[100%] md:right-0 z-100 hidden md:block xl:w-[100%] pointer-events-none ">
        <img
          src="/kenya_airplane.png"
          alt="air-plane"
          className="drop-shadow-xl h-full w-full animate-[float_6s_ease-in-out_infinite]" />
      </div>
      <style>{`
        @keyframes float { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-10px);} }
      `}</style>
    </div>
  )
}

export default MotivationDiv