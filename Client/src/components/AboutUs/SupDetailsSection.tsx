import { motion } from 'framer-motion'
import type { JSX } from 'react'
const SupDetailsSection = ():JSX.Element => {
  return (
    <section className="background-color px-15 flex min-h-screen items-center">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col w-full lg:w-[50%] gap-6 lg:gap-8"
          >
            <div className="space-y-4">
  
              <h1 className="text-4xl lg:text-5xl xl:text-6xl color-primary font-mono title-font leading-tight">
                ARE YOU READY TO SEE THE MOST BEAUTIFUL THINGS?
              </h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg lg:text-xl text-font  text-gray-900 leading-relaxed lg:leading-loose"
            >
              At Perlica Safaris, we believe that travel is not just about visiting new places,
              it's about immersing yourself in the culture, history, 
              and natural beauty of each destination. 
              Our team of experienced guides and travel experts are passionate about creating unforgettable experiences that go beyond the ordinary.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex w-full lg:w-[40%] relative"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-3xl transform rotate-2 scale-105 group-hover:rotate-1 transition-transform duration-500"></div>
                <img 
                src="/about_section_image.jpg" 
                alt="About Perlica Safaris"
                className="relative rounded-2xl shadow-2xl w-full h-96 lg:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-green-200">
                <span className="text-sm font-semibold text-secondary">Since 2007</span>
              </div>

            </div>
          </motion.div>
        </div>
    </section>
  )
}

export default SupDetailsSection