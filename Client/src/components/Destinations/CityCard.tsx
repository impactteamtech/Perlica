import type { City } from "../../lib/types";

const CityCard = ({ city, index }: { city: City; index: number }) => {
    // Placeholder images for demonstration
    const placeholderImages = [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ];

    return (
        <div 
            className="group w-full h-80 rounded-2xl relative overflow-hidden transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
        >
            {/* Image with overlay and hover effect */}
            <img 
                src={city.image || placeholderImages[index % placeholderImages.length]} 
                alt={city.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-all duration-500 group-hover:translate-y-0">
                {/* City Name */}
                <h1 className="text-2xl font-bold mb-2 transform transition-transform duration-500 group-hover:translate-y-0">
                    {city.name}
                </h1>
                
                {/* Description with fade-in on hover */}
                <p className="text-gray-200 mb-4 opacity-0 transform translate-y-4 max-h-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:max-h-20 transition-all duration-500 delay-200 overflow-hidden">
                    {city.description}
                </p>
                
                {/* Explore Button */}
                <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-600 text-white font-semibold rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-blue-500 hover:to-purple-500 border border-white/20 backdrop-blur-sm">
                    Explore More
                </button>
            </div>
        </div>
    );
};

export default CityCard;