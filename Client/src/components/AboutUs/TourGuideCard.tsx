import type { JSX } from "react"
import type { Guide } from '../../lib/types'
const TourGuideCard = ({ guide }: { guide: Guide }): JSX.Element => {
  return (
    <div
      aria-label={guide.name}
      className="group relative w-75 h-100 md:h-120 md:w-90 overflow-hidden 
      rounded-2xl border border-black/10 bg-gray-50 shadow-sm 
      transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md 
      focus:outline-none focus-visible:-translate-y-0.5"
    >
      <img
        src={guide.image}
        alt={guide.name}
        className="h-full object-cover w-full  transition-transform 
        duration-150 ease-out group-hover:scale-105"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-70" />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="translate-y-1 transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="font-baskerville text-xl md:text-2xl font-semibold text-white drop-shadow">
            {guide.name}
          </h3>
          <span className="mt-2 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-900 backdrop-blur-sm">
            {guide.role}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TourGuideCard