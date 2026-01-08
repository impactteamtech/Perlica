import { motion } from 'framer-motion';

const CarsFeatures = () => {
  const features = [
    {
      name: "24/7 SERVICE",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      description: "Round-the-clock airport transfers and customer support, ensuring you are never left waiting no matter the time.",
    },
    {
      name: "EXPERT CHAUFFEURS",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      description: "Highly trained, licensed, and professional drivers ensuring a smooth, safe, and polite ride every time.",
    },
    {
      name: "LUXURY VEHICLES",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
        </svg>
      ),
      description: "Experience top-tier comfort with our meticulously inspected fleet, offering a premium travel experience.",
    },
    {
      name: "FLIGHT MONITORING",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12h20"/><path d="M13 2v20"/><path d="M4.93 19.07 19.07 4.93"/><path d="M19.07 19.07 4.93 4.93"/>
        </svg>
      ),
      description: "We proactively track your flight status in real-time and adjust pickup times automatically for any delays.",
    }
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      {/* Header with Decorative Element */}
      <div className="mb-20 text-center">
        <h2 className="text-4xl lg:text-5xl 2xl:text-6xl title-font text-black">
          WHY CHOOSE OUR <span className="color-primary relative">
            SERVICES
            <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
              <path d="M0 7C20 7 30 1 50 1C70 1 80 7 100 7" stroke="#a20419" strokeWidth="2" fill="none" />
            </svg>
          </span>
        </h2>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative flex flex-col bg-white/60 backdrop-blur-xl p-8 border border-white rounded-[2.5rem] transition-all duration-500 hover:border-[#04c41a]/30"
          >
            {/* Animated Icon Container */}
            <div className="relative mb-8">
              <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-gray-900 text-white group-hover:bg-[#04c41a] transition-colors duration-500 group-hover:rotate-6">
                {feature.icon}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-black text-gray-900 tracking-tight transition-colors">
                {feature.name}
              </h3>
              
              <p className="text-gray-600 text-base leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CarsFeatures;