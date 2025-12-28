const CarsSecondSection = () => {
  return (
    <section className="px-15 py-24 mx-auto ">
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
            <h2 className="text-4xl md:text-6xl title-font mb-5 text-black">
              WE PROVIDE <span className="color-primary relative">
              QUALITY CARS
            <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
              <path d="M0 7C20 7 30 1 50 1C70 1 80 7 100 7" stroke="#a20419" strokeWidth="2" fill="none" />
            </svg>
          </span>
        </h2>
            <p className="text-xl  leading-relaxed text-gray-700 text-font">
              Our commitment to quality ensures that every car in our inventory meets the highest standards of performance, safety, and reliability. We meticulously inspect each vehicle through a rigorous 150-point check to guarantee that you receive a car that not only looks great but also drives smoothly and efficiently.
              <br /><br />
              We believe that buying a used car should feel like buying a new one. That is why we offer comprehensive warranty options and a transparent history report for every vehicle, giving you total peace of mind on the road.
            </p>
          </div>
        </div>

        <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-6 order-2 md:order-1">
                <h2 className="text-4xl md:text-6xl title-font mb-5 text-black">
          WIDE OF RANGE<span className="color-primary relative">
            VEHICULES
            <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
              <path d="M0 7C20 7 30 1 50 1C70 1 80 7 100 7" stroke="#a20419" strokeWidth="2" fill="none" />
            </svg>
          </span>
        </h2>
            <p className="text-xl leading-relaxed text-gray-700 text-font">
              Whether you're looking for a compact car for efficient city driving, a spacious SUV for comfortable family adventures, or a powerful truck for heavy-duty tasks, our showroom has something for everyone. We constantly update our inventory to include the latest models and hard-to-find classics.
              <br /><br />
              Our expert team is dedicated to helping you find the perfect match for your lifestyle and budget. From fuel-efficient hybrids to high-performance sports cars, explore a diversity of options that cater to every taste and driving requirement without compromising on quality.
            </p>
          </div>

          {/* Image Container (Order 1 on Mobile, Order 2 on Desktop) */}
          <div className="relative overflow-hidden h-[400px] md:h-[500px] rounded-2xl shadow-xl group order-1 md:order-2">
            <img
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              src="./carsSection/car_2.jpg"
              alt="Wide Range of Vehicles"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default CarsSecondSection;