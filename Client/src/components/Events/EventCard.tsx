import { motion } from 'framer-motion'

const EventCard = ({name, description, image}:{name:string, description:string, image:string}) => {
  return (
    <div 
      className='group relative w-[400px] h-[500px] overflow-hidden rounded-2xl shadow-2xl cursor-pointer'
    >
      <motion.img 
        className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700'
        src={image} 
        alt={name}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.7 }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />
            
      <motion.div 
        className='absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-0 group-hover:translate-y-[-10px] transition-transform duration-300'
        initial={{ y: 0 }}
        whileHover={{ y: -10 }}
      >
        <motion.h2 
          className='text-3xl font-bold mb-3 leading-tight drop-shadow-lg'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {name}
        </motion.h2>
        
        <motion.p 
          className='text-gray-200 text-lg leading-relaxed mb-4 line-clamp-3 drop-shadow-md'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>
        
        
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-1 bg-gradient-to-r from-green-400 to-transparent rounded-full mt-4"
        />
      </motion.div>

      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400/20 rounded-full blur-sm group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white/10 rounded-full blur-sm group-hover:scale-150 transition-transform duration-700" />
    </div>
  )
}

export default EventCard