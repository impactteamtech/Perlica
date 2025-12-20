import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';
import SearchForm from './SearchForm';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <img 
          src="/bg-images-destination/bg-1.jpg" 
          alt="Breathtaking Destination" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center gap-12">
          
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full text-white space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-sm font-medium backdrop-blur-sm">
              <Star className="w-3.5 h-3.5 fill-current" />
              Explore the World with Perlica
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                Discover Your <span className="text-green-400">Next</span> <br />
                Adventure
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Find the most amazing destinations in East Africa and create unforgettable memories.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full max-w-3xl backdrop-blur-md border-gray-50/30 border rounded-3xl shadow-2xl p-4"
          >
            <SearchForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero;
