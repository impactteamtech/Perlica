import { BsArrowUp } from "react-icons/bs";
import { GoShareAndroid } from "react-icons/go";
import { motion} from 'framer-motion';

const GoTopAndShare = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Perlica Safaris',
          text: 'Discover amazing Kenyan adventures with Perlica Safaris',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className='absolute left-6 bottom-80 z-50'
    >
      {/* Share Button */}
      <motion.button 
        title="Share this page"
        className='w-14 h-14 flex items-center justify-center bg-gradient-to-br from-green-600/60 to-green-700/50 text-white rounded-full shadow-2xl shadow-green-600/30 mb-3 border-2 border-white/20 backdrop-blur-sm'
        whileHover={{ 
          scale: 1.1, 
          boxShadow: "0 10px 30px rgba(22, 163, 74, 0.4)"
        }}
        whileTap={{ scale: 0.95 }}
        onClick={handleShare}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.div
          whileHover={{ rotate: 15 }}
          transition={{ duration: 0.2 }}
        >
          <GoShareAndroid size={24} />
        </motion.div>
        
        {/* Pulse Effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-green-400"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Go to Top Button */}
      <motion.button 
        title="Scroll to top"
        className='w-14 h-14 flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-50 text-black rounded-full shadow-2xl shadow-orange-500/30 border-2 border-white/20 backdrop-blur-sm'
        whileHover={{ 
          scale: 1.1, 
        }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToTop}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <BsArrowUp size={24} />
        </motion.div>
        
        {/* Pulse Effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-black/30"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </motion.button>

      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 bg-secondary/30 rounded-full blur-xl -z-10"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  )
}

export default GoTopAndShare