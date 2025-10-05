import { motion} from "framer-motion";
import type { JSX } from "react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { kenyaImages } from "../../lib/staticData";
const YouMaySee = (): JSX.Element => {

  const [currentCenterIndex, setCurrentCenterIndex] = useState(0);
  
  const handleNext = () => {
    setCurrentCenterIndex((prev) => (prev + 1) % kenyaImages.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentCenterIndex(index);
  };

  const getVisibleImages = () => {
    const totalImages = kenyaImages.length;
    const indices = [];
    
    for (let i = -2; i <= 2; i++) {
      const index = (currentCenterIndex + i + totalImages) % totalImages;
      indices.push(index);
    }
    
    return indices;
  };

  const visibleIndices = getVisibleImages();
  
  const positions = ["left", "left1", "center", "right1", "right"];
  
  const imageVariants = {
    center: { x: "0%", scale: 1, zIndex: 5, opacity: 1 },
    left1: { x: "-50%", scale: 0.8, zIndex: 3, opacity: 0.8 },
    left: { x: "-90%", scale: 0.6, zIndex: 2, opacity: 0.6 },
    right1: { x: "50%", scale: 0.8, zIndex: 3, opacity: 0.8 },
    right: { x: "90%", scale: 0.6, zIndex: 2, opacity: 0.6 },
    hidden: { opacity: 0, scale: 0.5 }
  };

  return (
    <div className="flex relative flex-col items-center background-color gap-10 min-h-screen py-10 px-4 md:px-15">
      <h2 className="title-font text-center font-mono text-3xl md:text-6xl color-primary max-w-4xl">
        FEATURED SUITES <span className="">&</span> EXPERIENCES
      </h2>
      
      <div className="overflow-hidden w-full relative">
        {/* dots indicator */}
        <div className="flex gap-3 z-100 text-white items-center relative left-160 top-14">
          {kenyaImages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleDotClick(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-transform duration-200 hover:scale-110 focus:outline-none"
            >
              <GoDotFill className={i === currentCenterIndex ? 'text-white scale-135' : 'text-white/60'} />
            </button>
          ))}
        </div>
        
        <div className="w-full flex top-30 z-100 items-center flex-col absolute">
          <h1 className="text-8xl title-font text-center text-white">
            READY TO EXPLORE <br/>
            <span className="kenya-name-font ">KENYA</span>
          </h1>
        </div>
        <img 
          src="/motivation_image.jpg" 
          className="h-170 w-full brightness-60"
          alt="motivation_image" 
        />
      </div>

      {/* Image Carousel */}
      <div className="flex items-center justify-center absolute top-140 h-125 w-full overflow-visible">
          {visibleIndices.map((imageIndex, positionIndex) => (
            <motion.img
              key={`${imageIndex}-${currentCenterIndex}`}
              src={kenyaImages[imageIndex].path}
              alt={`kenya-place-${imageIndex + 1}`}
              className="absolute h-125 w-90 object-cover rounded-lg shadow-xl"
              variants={imageVariants}
              initial="hidden"
              animate={positions[positionIndex] as keyof typeof imageVariants}
              exit="hidden"
              transition={{                
                duration: 0.1,
                ease: "easeIn",
                stiffness:10,
                type: "spring"
              }}
              
              style={{ 
                width: '60%', 
                maxWidth: '500px' 
              }}
            />
          ))}
      </div>

      <button 
        onClick={handleNext}
        title="Next" 
        className="bg-white/80 text-xl cursor-pointer hover:scale-105 transition-all ease-in flex items-center justify-center top-130 z-100 absolute text-black rounded-full w-20 h-20"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default YouMaySee;