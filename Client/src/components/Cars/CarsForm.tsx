import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Plane, Car, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CarsForm = () => {
    const navigate = useNavigate();
    // Data
    const airports: string[] = [
        "Jomo Kenyatta International (NBO)",
        "Moi International Airport (MBA)",
        "Eldoret International Airport (EDL)",
        "Kisumu International Airport (KIS)",
        "Wilson Airport (WIL)"
    ];

    const vehiculesTypes: string[] = [
        "Luxury SUV (Mercedes G-Wagon)",
        "7-Seater Van (Toyota Hiace)",
        "Economy Sedan (Toyota Corolla)",
    ];

    const [formData, setFormData] = useState({
        pickupDate: '',
        pickupTime: '',
        fromAirport: airports[0],
        toDestination: '',
        vehicleType: vehiculesTypes[0]
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const queryParams = new URLSearchParams(formData).toString();
        navigate(`/cars/existingcars?${queryParams}`);
    };

    return (
        <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl bg-black/20 border-1 border-white/20  rounded-2xl shadow-xl overflow-hidden"
            >
                {/* Header Section */}
                <div className="bg-transparent p-6 text-white flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">Quick Car Booking</h2>
                        <p className="text-green-100 text-sm mt-1">Premium transfer services</p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Date and Time Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Date Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-100 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-green-500" />
                                    Pickup Date
                                </label>
                                <input 
                                    type="date" 
                                    name="pickupDate"
                                    value={formData.pickupDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-700" 
                                />
                            </div>

                            {/* Time Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-100 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-green-500" />
                                    Pickup Time
                                </label>
                                <input 
                                    type="time" 
                                    name="pickupTime" 
                                    value={formData.pickupTime}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-700" 
                                />
                            </div>
                        </div>

                        {/* From (Airport) */}
                        <div className="space-y-2 group">
                            <label className="text-sm font-semibold text-gray-100 flex items-center gap-2">
                                <Plane className="w-4 h-4 text-green-500" />
                                Pick Up Location
                            </label>
                            <div className="relative">
                                <select 
                                    name="fromAirport" 
                                    value={formData.fromAirport}
                                    onChange={handleChange}
                                    className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none transition-all text-gray-700 cursor-pointer"
                                >
                                    {airports.map((airport, index) => (
                                        <option key={index} value={airport}>{airport}</option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-100 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-green-500" />
                                Drop Off Destination
                            </label>
                            <input 
                                type="text" 
                                name="toDestination"
                                value={formData.toDestination}
                                onChange={handleChange} 
                                placeholder="e.g. Nairobi CBD, Westlands..." 
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400" 
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-100 flex items-center gap-2">
                                <Car className="w-4 h-4 text-green-500" />
                                Prefergreen Vehicle
                            </label>
                            <div className="grid grid-cols-1 gap-3">
                                <div className="relative">
                                     <select 
                                        name="vehicleType"
                                        value={formData.vehicleType}
                                        onChange={handleChange} 
                                        className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none transition-all text-green-700 cursor-pointer"
                                    >
                                        {vehiculesTypes.map((type, index) => (
                                            <option key={index} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-secondary text-white font-bold py-4 rounded-lg s flex items-center justify-center gap-2 transition-colors mt-4"
                        >
                            Book Now
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>

                    </form>
                </div>
            </motion.div>
    );
}

export default CarsForm;