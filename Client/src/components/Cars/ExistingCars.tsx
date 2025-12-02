import { useSearchParams } from 'react-router-dom';
import { perlcaCars } from '@/lib/staticData';
import CarCard from './CarCard';
import { Car } from '@/lib/types';

const ExistingCars = () => {
  const [searchParams] = useSearchParams();

  const fromAirport = searchParams.get('fromAirport');
  const vehicleType = searchParams.get('vehicleType');

  const filteredCars: Car[] = perlcaCars.filter(car => {
    const airportMatch = fromAirport ? car.location === fromAirport : true;
    const typeMatch = vehicleType ? car.type === vehicleType : true;
    return airportMatch && typeMatch;
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
                Available Cars
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Found {filteredCars.length} cars matching your criteria.
            </p>
        </div>

        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car, index) => (
              <CarCard key={index} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-700">No cars found</h2>
            <p className="mt-2 text-gray-500">
              We couldn't find any cars matching your search criteria. Please try different options.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExistingCars;
