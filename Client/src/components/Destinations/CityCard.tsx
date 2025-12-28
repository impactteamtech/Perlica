import type { City } from "../../lib/types";
import { MapPin } from 'lucide-react';

const CityCard = ({ city, index }: { city: City; index: number }) => {
    const placeholderImages = [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1000&q=80",
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1000&q=80",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1000&q=80"
    ];

    // The specific green requested used in arbitrary tailwind values
    const greenHex = "#0cce10";

    return (
        <div 
            className="group relative w-full h-[400px] rounded-2xl overflow-hidden cursor-pointer bg-slate-900 transition-all duration-500"
        >
            <img 
                src={city.image || placeholderImages[index % placeholderImages.length]} 
                alt={city.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform ease-out"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            

            <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end min-h-[50%]">
                
                <div className={`flex items-center gap-1 text-[${greenHex}] mb-2 transform transition-transform duration-500 group-hover:-translate-y-1`}>
                    <MapPin className="w-3 h-3" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
                        {city.countryName || 'Destination'}
                    </span>
                </div>

                <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight transform transition-all duration-500 group-hover:-translate-y-2">
                    {city.name}
                </h2>
                

                <div className="overflow-hidden">
                    <p className="text-gray-300 text-sm leading-relaxed opacity-0 transform translate-y-10 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
                        {city.description || "Discover the hidden gems and vibrant culture of this breathtaking East African destination."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CityCard;