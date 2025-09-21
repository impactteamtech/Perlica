import React from 'react';
import {motion} from 'framer-motion';



const HeroCTA: React.FC = () => {
  return (
    <div>
       <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      style={{
        backgroundColor: 'transparent',
        color: 'white',
        border: '1px, solid',
        padding: '16px 32px',
        borderRadius: '50px',
        cursor: 'pointer',
        fontSize: '18px',
        fontWeight: 'bold',
      }}
    >
      Book Now
    </motion.button>
    </div>
  );
};

export default HeroCTA