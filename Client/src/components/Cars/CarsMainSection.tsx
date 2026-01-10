import { motion } from 'framer-motion';
import {Star } from 'lucide-react';
import CarsForm from './CarsForm';

const CarsMainSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <img 
          src="./carsSection/hero-car.jpg" 
          alt="Luxury Car Chauffeur" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
      </div>

      <div className="container mx-auto px-4 pt-10 pb-5 lg:pb-10 lg:pt-20 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Column: Text & Value Proposition */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 text-white space-y-8 pt-20 lg:pt-0"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/30 border border-secondary/70 text-white text-sm font-medium backdrop-blur-sm">
              <Star className="w-3.5 h-3.5 fill-current" />
              #1 Rated Chauffeur Service
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                Luxury <span className="text-red-500">Airport</span> <br />
                Transfers
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed">
                Experience seamless travel with our professional chauffeur service in Nairobi. Punctual, comfortable, and discreet.
              </p>
            </div>

          </motion.div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end pb-20 lg:pb-0">
                <CarsForm />
          </div>

        </div>
      </div>
    </section>
  )
}

export default CarsMainSection;