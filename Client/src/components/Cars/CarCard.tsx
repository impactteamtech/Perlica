import { useState } from 'react';
import { motion} from "framer-motion";
import { Briefcase, User, Check, Info, RotateCw } from "lucide-react";
import type { Car } from "../../lib/types";

type CarCardProps = {
    car: Car;
};

// --- Animation Variants ---
const cardVariants = {
    front: { rotateY: 0, scale: 1 },
    back: { rotateY: 180, scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.3 } } // Subtle lift on hover
};


const CardFront = ({ car }: { car: Car }) => (
    <motion.div
        className="absolute w-full h-full bg-white rounded-2xl shadow-lg overflow-hidden group"
        style={{ backfaceVisibility: "hidden" }}
    >
        <div className="absolute top-4 right-4 z-10 bg-black animate-pulse border border-secondary text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <RotateCw className="w-3 h-3" />
            Click to flip
        </div>

        <img 
            src={car.image} 
            alt={car.name} 
            className="w-full h-full object- transition-transform duration-500 group-hover:scale-110" 
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
            <h3 className="text-2xl font-bold text-white">{car.name}</h3>
            <p className="text-secondary text-sm flex items-center gap-1 mt-1">
                <Info className="w-4 h-4" /> View full specs
            </p>
        </div>
    </motion.div>
);

const CardBack = ({ car }: { car: Car }) => (
    <motion.div
        className="absolute w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 flex flex-col"
        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
    >
        <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-bold text-gray-800">{car.name}</h3>
            <span className="text-[10px] uppercase tracking-widest bg-gray-100 px-2 py-1 rounded text-gray-400">
                Back to photo
            </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                <User className="w-5 h-5 mr-3 text-secondary" />
                <span className="text-sm font-medium">{car.numberOfPassengers} Seats</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                <Briefcase className="w-5 h-5 mr-3 text-secondary" />
                <span className="text-sm font-medium">{car.numberOfBags} Bags</span>
            </div>
        </div>

        <div className="flex-grow">
            <h4 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-3">Key Features</h4>
            <ul className="space-y-2">
                {car.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                        <Check className="w-4 h-4 mr-2 text-secondary flex-shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>

        <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
            <div>
                <span className="block text-gray-400 text-xs uppercase font-bold">Daily Rate</span>
                <p className="text-2xl font-black text-secondary">${car.price}</p>
            </div>
            <button className="bg-secondary text-white font-bold py-3 px-6 rounded-xl hover:bg-secondary-dark hover:shadow-lg hover:shadow-secondary transition-all duration-300 active:scale-95">
                Book Now
            </button>
        </div>
    </motion.div>
);

// --- Main Component ---

const CarCard = ({ car }: CarCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div 
            className="relative w-full h-[450px] cursor-pointer [perspective:1200px]" 
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
                initial={false}
                animate={isFlipped ? "back" : "front"}
                whileHover="hover"
                variants={cardVariants}
                transition={{ 
                    rotateY: { duration: 0.6, ease: "circOut" },
                    scale: { duration: 0.2 }
                }}
            >
                <CardFront car={car} />
                <CardBack car={car} />
            </motion.div>
        </div>
    );
};

export default CarCard;