import type { JSX } from "react"
import type { ServiceCardProps } from '../../lib/types'


const ServiceCard = ({ name, img, index, description }: ServiceCardProps): JSX.Element => {
  return (
    <figure aria-label={name} className="group relative w-full h-55 md:h-60 rounded-xl overflow-hidden">
      <img
        src={img}
        loading="lazy"
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" aria-hidden="true" />


      {/* Text overlay */}
      <figcaption className="absolute inset-x-4 bottom-4">
        <h3 className="title-font text-white text-xl sm:text-2xl font-semibold leading-snug">
          {name}
        </h3>
        <p className="mt-2 text-white/90 text-sm sm:text-base leading-relaxed line-clamp-3">
          {description}
        </p>
      </figcaption>
    </figure>
  )
}

export default ServiceCard