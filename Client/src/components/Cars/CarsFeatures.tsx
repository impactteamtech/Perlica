
const CarsFeatures = () => {

  const features = [
    {
      name: "24/7 SERVICE",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      description: "Round-the-clock airport transfers and customer support, ensuring you are never left waiting no matter the time.",
    },
    {
      name: "EXPERT CHAUFFEURS",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      description: "Highly trained, licensed, and professional drivers ensuring a smooth, safe, and polite ride every time.",
    },
    {
      name: "LUXURY VEHICLES",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
        </svg>
      ),
      description: "Experience top-tier comfort with our meticulously inspected fleet, offering a premium travel experience.",
    },
    {
      name: "FLIGHT MONITORING",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12h20"/><path d="M13 2v20"/><path d="M4.93 19.07 19.07 4.93"/><path d="M19.07 19.07 4.93 4.93"/>
        </svg>
      ),
      description: "We proactively track your flight status in real-time and adjust pickup times automatically for any delays.",
    }
  ];

  return (
    <section className="py-10 px-15">         
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-5xl title-font font-mono ">
            WHY CHOOSE OUR <span className="color-primary">SERVICES</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col bg-white/40 p-5 border-black/10 border rounded-xl items-start gap-4 group">
              
              {/* Icon - Using the requested Green color */}
              <div className="p-3 mb-2 rounded-xl border border-green-100 text-white shadow-xs bg-secondary/30 transition-all duration-300">
                {feature.icon}
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold uppercase color-primary font-sans tracking-wide">
                  {feature.name}
                </h3>
                
                <p className="text-gray-800 text-font text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

    </section>
  );
};

export default CarsFeatures;