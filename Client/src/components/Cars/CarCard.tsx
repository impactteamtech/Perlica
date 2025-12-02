import { useState } from 'react';
import type { Car } from "../../lib/types";
import { Briefcase, User, Check } from "lucide-react";
import { motion } from "framer-motion";

type CarCardProps = {
    car: Car
}
const CarCard = ({ car }: CarCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const cardVariants = {
        front: {
            rotateY: 0
        },
        back: {
            rotateY: 180
        }
    };

    return (
        <div className="w-full h-100 [perspective:1000px]" onClick={() => setIsFlipped(!isFlipped)}>
            <motion.div
                className="relative w-full h-full transition-transform duration-700"
                style={{ transformStyle: "preserve-3d" }}
                initial={false}
                animate={isFlipped ? "back" : "front"}
                variants={{
                    front: { rotateY: 0 },
                    back: { rotateY: 180 }
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}

            >
                {/* Front side */}
                <motion.div
                    className="absolute w-full h-full bg-white rounded-lg shadow-lg overflow-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img src={car.image} alt={car.name} className="w-full h-full object-" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-2xl font-bold text-white mb-2">{car.name}</h3>
                    </div>
                </motion.div>

                {/* Back side */}
                <motion.div
                    className="absolute w-full h-full bg-white rounded-lg shadow-lg overflow-hidden p-6"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{car.name}</h3>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-gray-600">
                            <User className="w-5 h-5 mr-2 text-green-500" />
                            <span>{car.numberOfPassengers} Passengers</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Briefcase className="w-5 h-5 mr-2 text-green-500" />
                            <span>{car.numberOfBags} Bags</span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Features</h4>
                        <ul className="space-y-2">
                            {car.features.map((feature, index) => (
                                <li key={index} className="flex items-center text-gray-600">
                                    <Check className="w-4 h-4 mr-2 text-green-500" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                        <p className="text-3xl font-bold text-green-600">${car.price}<span className="text-lg font-normal text-gray-500">/day</span></p>
                        <button className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300">
                            Book Now
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default CarCard;