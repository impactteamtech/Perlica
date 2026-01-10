const CarsSecondSection = () => {
  return (
    <section className="px-6 lg:px-15 py-24 mx-auto ">
      <div className="flex flex-col gap-24">
        
        <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
          <div className="relative overflow-hidden h-[400px] md:h-[500px] rounded-2xl shadow-xl group">
            <img
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              src="./carsSection/car_1.jpg"
              alt="Quality Car"
            />
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-4xl lg:text-5xl 2xl:text-6xl title-font mb-5 text-black">
              WE PROVIDE <span className="color-primary relative">
              QUALITY CARS
            <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
              <path d="M0 7C20 7 30 1 50 1C70 1 80 7 100 7" stroke="#a20419" strokeWidth="2" fill="none" />
            </svg>
          </span>
        </h2>
            <p className="text-xl  leading-relaxed text-gray-700 text-font">
              We hold our fleet to uncompromising standards. Every vehicle is meticulously inspected through a comprehensive point check, ensuring a clean, reliable, and smooth journey from pickup to drop-off.
              <br /><br />
              Seamless, punctual, and designed around your schedule, our transfer services are built to remove the stress from travel.
              From airport arrivals to hotel pickups, we make every transfer feel effortless. With comfortable vehicles, professional drivers, and reliable service, your journey begins with confidence and peace of mind.
            </p>
          </div>
        </div>

        <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-6 order-2 md:order-1">
                <h2 className="text-4xl lg:text-5xl 2xl:text-6xl title-font mb-5 text-black">
          WIDE OF RANGE <span className="color-primary relative">
            VEHICLES
            <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
              <path d="M0 7C20 7 30 1 50 1C70 1 80 7 100 7" stroke="#a20419" strokeWidth="2" fill="none" />
            </svg>
          </span>
        </h2>
            <p className="text-xl leading-relaxed text-gray-700 text-font">
              Whether you’re traveling solo, with family, or in a larger group, our fleet offers the perfect option for every journey. From sleek sedans for efficient city transfers to spacious SUVs for added comfort and luggage capacity, we have a vehicle to match your needs.
              <br /><br />
              Our fleet is continually refreshed and maintained to include modern, premium vehicles that deliver reliability, comfort, and style on every ride.
            </p>
          </div>

          {/* Image Container (Order 1 on Mobile, Order 2 on Desktop) */}
          <div className="relative overflow-hidden h-[400px] md:h-[500px] rounded-2xl shadow-xl group order-1 md:order-2">
            <img
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              src="./carsSection/land cruiser.jpg"
              alt="Wide Range of Vehicles"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default CarsSecondSection;