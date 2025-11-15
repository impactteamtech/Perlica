import type { City } from "../../lib/types";

const CityCard = ({city, index}:{city:City, index:number}) => {
    // Placeholder images for demonstration
    const placeholderImages = [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ];

    return (
    <div 
      key={city.name}
      className="w-100 h-110 rounded-xl relative overflow-hidden transition-all duration-300 transform hover:-translate-y-1">
        <img 
          src={city.image || placeholderImages[index % placeholderImages.length]} 
          alt={city.name}
          className="w-full h-full object-cover"
      />

      <div className="absolute justify-start gap-4 flex flex-col bottom-2 p-2">
        <h1 className="text-2xl text-white font-medium">
          {city.name}
        </h1>
        <p className="text-gray-100">
          {city.description}</p>
        <button className="p-2 w-[40%] rounded-lg font-medium bg-secondary text-white ">
          Explore More
        </button>

      </div>
    </div>
  )
}

export default CityCard