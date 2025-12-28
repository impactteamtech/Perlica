
import { famousDestinations } from '../../lib/staticData'
const PopularDestinations = () => {

  return (
    <section className="w-full flex flex-col gap-6 px-6 md:px-10 py-6">
      <h2 className="text-3xl md:text-5xl title-font color-primary font-mono ">Popular Destinations</h2>
      <div className="grid grid-cols-2 md:h-150 md:grid-cols-4 md:grid-rows-2 gap-4">
        
        {famousDestinations.map((destination, index) => {
          const spanClass = index === 0
            ? 'col-span-2 md:col-span-2 md:row-span-2' // large left feature
            : index === 3
              ? 'col-span-2 md:col-span-2 md:row-span-1' // bottom right wide
              : 'col-span-1 md:col-span-1 md:row-span-1' // smaller tiles

          return (
            <article
              key={destination.name}
              className={`${spanClass} relative rounded-lg overflow-hidden shadow-lg transform transition  hover:shadow-xl`}
              aria-label={destination.name}
            >
              {/* flag badge */}
              <img
                src={destination.countryFlag}
                alt={`${destination.name} flag`}
                className="w-12 h-12 absolute top-3 left-3 rounded-full object-cover  z-10"
              />

              {/* hero image - preserved aspect and behavior */}
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-40 hover:scale-110 duration-150 transition-all brightness-90 md:h-full object-cover block"
              />

              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <h3 className="text-white text-lg md:text-2xl font-semibold drop-shadow">{destination.name}</h3>
                <p className="text-sm text-white/90 mt-1 hidden md:block">Explore tours, guides and local highlights.</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default PopularDestinations