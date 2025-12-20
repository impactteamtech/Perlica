import { motion } from 'framer-motion'
import type { JSX } from 'react'
import Stack from './Stack';
const SupDetailsSection = ():JSX.Element => {
  const images = [
  { id: 1, img: "/safari_animals/animal_1.jpg" },
  { id: 2, img: "/safari_animals/animal_2.jpg" },
  { id: 3, img: "/safari_animals/animal_3.jpg" },
  { id: 4, img: "/safari_animals/animal_4.jpg" }
];
  return (
    <section className="px-15 flex  py-10  md:py-12 lg:py-18">
        <div className="flex flex-col lg:flex-row  lg:justify-between gap-18 lg:gap-12 xl:gap-16 ">
          <motion.div 
            className="flex flex-col w-full lg:w-[50%] gap-6 lg:gap-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl color-primary font-mono title-font leading-tight">
                ARE YOU READY TO SEE THE MOST BEAUTIFUL THINGS?
              </h1>
            </div>
            <motion.p 
              className="text-lg lg:text-xl text-font  text-gray-900 leading-relaxed lg:leading-loose"
            >
              At Perlica Safaris, we believe that travel is not just about visiting new places,
              it's about immersing yourself in the culture, history, 
              and natural beauty of each destination. 
              Our team of experienced guides and travel experts are passionate about creating unforgettable experiences that go beyond the ordinary.
            </motion.p>
          </motion.div>
          <div className='hidden md:block'>
            <Stack
            randomRotation={false}
            sensitivity={180}
            sendToBackOnClick={false}
            cardDimensions={{ width: 550, height: 300 }}
            cardsData={images}
          />
          </div>
        
        </div>
    </section>
  )
}

export default SupDetailsSection