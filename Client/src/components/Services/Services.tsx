import type { JSX } from "react"
import { useState } from "react"
import ServiceCard from "./ServiceCard";
import { services} from "../../lib/staticData";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";


const Services = ():JSX.Element => {
   const PAGE_SIZE = 3
  const [startIndex, setStartIndex] = useState(0)

  const visibleServices = Array.from({ length: Math.min(PAGE_SIZE, services.length) }, (_, i) => {
    const realIdx = (startIndex + i) % services.length
    return { ...services[realIdx], _idx: realIdx }
  })

  const handleNext = () => setStartIndex(prev => (prev + 1) % services.length)
  const handlePrev = () => setStartIndex(prev => (prev - 1 + services.length) % services.length)

  return (
    <section className="background-color px-15 py-10">
      {/* div 1 */}
      <div className="w-full flex items-center justify-between">
        <div className="w-[60%] relative">
          <img src="/shild.png"  className="w-20 opacity-70 top-18 absolute right-22" alt="kenya-shild"/>
          <h1 className="text-7xl absolute [-webkit-text-stroke:4px_#efebe5] top-20 z-100 color-primary left-27 title-font  text-wrap font-bold">
            TOP NOTCH QUALITY 
            <br/>
            SERVICES WE PROVIDE
          </h1>
          {/* make the bg image darker with tailwindcss :  */}
          <div 
          className="w-[40%] p-10 relative opacity-70 h-full bg-[url('/decorator_bg.png')] bg-cover bg-center">
            <div className="w-40 background-color  h-80">
              <img src="/airplane.png" className="w-14 left-12 rotate-270 top-60 relative" alt="airplane"/>
            </div>
          </div>
        </div>
        <div className="w-[40%] border-l-2 pl-20  border-black">
          <p className="text-font text-gray-900/80 lg:leading-8 text-xl leading-relaxed">
            We offer a wide range of services to cater to your travel needs,
            ensuring a seamless and memorable experience from start to finish.
            Whether you're planning a solo adventure, a family vacation, or a corporate trip,
            our dedicated team is here to assist you every step of the way.
          </p>
        </div>

      </div>
      <div className="flex relative bottom-20 w-full justify-end">
        <div className="flex gap-4 items-center">
          <button 
          onClick={handlePrev}
          title="previous"
          className="border-black/70 border-1 cursor-pointer hover:scale-105 rounded-full duration-150 transition-transform p-4">
            <IoMdArrowBack size={20}/>
          </button>
          <button 
          onClick={handleNext}
          title="next"
          className="border-black/70 border-1 cursor-pointer hover:scale-105 rounded-full duration-150 transition-transform p-4">
            <IoMdArrowForward size={20}/>
          </button>
        </div>
      </div>
      {/* div 2 */}
      <div className="w-full relative flex gap-3">
        <img src="/curve_arrow.png" className="w-30 h-30  ml-20  mr-10 -rotate-20" alt="curve_arrow" />
        <div className="flex relative  bottom-8  gap-4 w-full justify-between">
          {visibleServices.map((service) => (
            <ServiceCard
              index={service._idx}
              img={service.img}
              description={service.description}
              name={service.name}
              key={service._idx}
            />
          ))}
        </div>
      </div>
     
    </section>
  )
}

export default Services