import type { Car } from "../../lib/types";
import { Briefcase, User, Check } from "lucide-react";

type CarCardProps = {
    car:Car
}
const CarCard = ({ car }: CarCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img src={car.image} alt={car.name} className="w-full h-56 object-cover" />
      <div className="p-6">
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
        <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-green-600">${car.price}<span className="text-lg font-normal text-gray-500">/day</span></p>
            <button className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300">
                Book Now
            </button>
        </div>
      </div>
    </div>
  )
}

export default CarCard;