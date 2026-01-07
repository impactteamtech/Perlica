import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin,ArrowRight, User, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GooglePlacesInput from './GooglePlacesInput';

interface FormData {
    pickupDate: string;
    pickupTime: string;
    toDestination: string;
    email: string;
    phoneNumber: string;
    fullName: string;
}

const CarsForm = () => {
    const navigate = useNavigate();
  

    const [formData, setFormData] = useState<FormData>({
        pickupDate: '',
        pickupTime: '',
        toDestination: '',
        email: '',
        phoneNumber: '',
        fullName: ''
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleDestinationChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            toDestination: value
        }));
        if (errors.toDestination) {
            setErrors(prev => ({
                ...prev,
                toDestination: undefined
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
        else if (!/^\+?[\d\s\-()]+$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Invalid phone number';
        if (!formData.pickupDate) newErrors.pickupDate = 'Date is required';
        if (!formData.pickupTime) newErrors.pickupTime = 'Time is required';
        if (!formData.toDestination.trim()) newErrors.toDestination = 'Destination is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const queryParams = new URLSearchParams({
            pickupDate: formData.pickupDate,
            pickupTime: formData.pickupTime,
            toDestination: formData.toDestination,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            fullName: formData.fullName
        }).toString();
        navigate(`/cars/existingcars?${queryParams}`);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl mx-auto"
        >
            {/* Main Card Container */}
            <div className="bg-black/20 rounded-xl shadow-2xl overflow-hidden border border-gray-100">
                
                {/* Header Section - Minimal & Clean */}
                <div className="bg-primary px-8 py-6 text-white">
                    <div>
                        <h2 className="text-3xl w-full text-center font-bold">Book Your Ride</h2>
                    </div>
                </div>

                {/* Form Section */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Personal Information Section */}
                        <div className="rounded-xl p-6 space-y-5">
                            <h3 className="text-sm font-bold text-gray-50 uppercase tracking-wider">Your Information</h3>
                            
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label htmlFor="car-fullName" className="text-sm font-semibold text-gray-50 flex items-center gap-2">
                                    <User className="w-4 h-4 text-green-600" />
                                    Full Name
                                </label>
                                <input 
                                    id="car-fullName"
                                    type="text" 
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="John Doe" 
                                    autoComplete="name"
                                    className={`w-full px-4 py-3  border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-700 ${
                                        errors.fullName ? 'border-red-500' : 'border-gray-200'
                                    }`}
                                />
                                {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
                            </div>

                            {/* Email and Phone Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Email */}
                                <div className="space-y-2">
                                    <label htmlFor="car-email" className="text-sm font-semibold text-gray-50 flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-green-600" />
                                        Email
                                    </label>
                                    <input 
                                        id="car-email"
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com" 
                                        autoComplete="email"
                                        className={`w-full px-4 py-3  border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-700 ${
                                            errors.email ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label htmlFor="car-phone" className="text-sm font-semibold text-gray-50 flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-green-600" />
                                        Phone Number
                                    </label>
                                    <input 
                                        id="car-phone"
                                        type="tel" 
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="+254 712 345 678" 
                                        autoComplete="tel"
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-700 ${
                                            errors.phoneNumber ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    />
                                    {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Trip Details Section */}
                        <div className="rounded-2xl p-6 space-y-5">
                            <h3 className="text-sm font-bold text-gray-50 uppercase tracking-wider">Trip Details</h3>
                            
                            {/* Date and Time Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Date Input */}
                                <div className="space-y-2">
                                    <label htmlFor="car-pickupDate" className="text-sm font-semibold text-gray-50 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-green-600" />
                                        Pickup Date
                                    </label>
                                    <input 
                                        id="car-pickupDate"
                                        type="date" 
                                        name="pickupDate"
                                        value={formData.pickupDate}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3  border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-700 ${
                                            errors.pickupDate ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    />
                                    {errors.pickupDate && <p className="text-red-500 text-xs">{errors.pickupDate}</p>}
                                </div>

                                {/* Time Input */}
                                <div className="space-y-2">
                                    <label htmlFor="car-pickupTime" className="text-sm font-semibold text-gray-50 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-green-600" />
                                        Pickup Time
                                    </label>
                                    <input 
                                        id="car-pickupTime"
                                        type="time" 
                                        name="pickupTime" 
                                        value={formData.pickupTime}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-700 ${
                                            errors.pickupTime ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    />
                                    {errors.pickupTime && <p className="text-red-500 text-xs">{errors.pickupTime}</p>}
                                </div>
                            </div>

                            {/* Google Places Drop Off - With Autocomplete */}
                            <div className="space-y-2">
                                <label htmlFor="car-toDestination" className="text-sm font-semibold text-gray-50 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-green-600" />
                                    Drop Off Destination
                                </label>
                                <GooglePlacesInput
                                    inputId="car-toDestination"
                                    value={formData.toDestination}
                                    onChange={handleDestinationChange}
                                    placeholder="Search for your destination..."
                                    ariaLabel="Drop off destination"
                                    icon={<MapPin className="w-5 h-5" />}
                                />
                                {errors.toDestination && <p className="text-red-500 text-xs">{errors.toDestination}</p>}
                            </div>
                        </div>

                        {/* Submit Button - Uber Style */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-secondary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-lg active:shadow-md"
                        >
                            Book Your Ride
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>

                    </form>
                </div>
            </div>
        </motion.div>
    );
}

export default CarsForm;