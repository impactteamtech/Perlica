import type { JSX } from "react"
import type { ServiceCardProps } from '../../lib/types'

const ServiceCard = ({ name, img, index, description }: ServiceCardProps): JSX.Element => {
  const formattedIndex = (index + 1).toString().padStart(2, '0');

  return (
    <div className="group relative w-full h-64 md:h-64 lg:h-60 overflow-hidden rounded-3xl bg-white/60 cursor-pointer transition-shadow hover:shadow-2xl hover:shadow-secondary/10">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={img}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110"
        />
        {/* Gradient Overlay: Darker at bottom for text readability, lighter at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
      </div>
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
          <span className="text-xs font-bold text-white tracking-widest font-mono">
            {formattedIndex}
          </span>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end z-20">
        
        {/* Header Row: Title + Action Icon */}
        <div className="flex items-center justify-between gap-4 transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
          <h3 className="title-font text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-sm">
            {name}
          </h3>
          
        </div>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <div className="pt-3 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
               <p className="text-slate-200 text-sm sm:text-base leading-relaxed line-clamp-3 font-medium">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard