import type { JSX } from "react"
import type { ServiceCardProps } from '../../lib/types'


const ServiceCard = ({ name, img, index, description }: ServiceCardProps): JSX.Element => {
  const accentClass = index % 2 === 0 ? 'bg-primary' : 'bg-secondary'
  const ringClass = index % 2 === 0 ? 'ring-primary/60' : 'ring-secondary/60'

  return (
    <article
      aria-label={name}
      className={`group relative w-full max-w-[560px] md:w-140 rounded-xl overflow-hidden flex items-stretch gap-6 p-5 bg-secondary/5  transition-all duration-500
        shadow-sm shadow-black/15 hover:shadow-md
        hover:-translate-y-1`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.35),transparent_60%)]" />

      <span className={`absolute left-0 top-0 h-full w-1 ${accentClass}`} />

      <div className="relative shrink-0">
        <div className={`relative p-2 w-33 h-33 md:w-33 md:h-33 rounded-lg overflow-hidden ring-2 ${ringClass} shadow-inner shadow-black/20`}>
          <img
            src={img}
            loading="lazy"
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-black" />
        </div>
       
      </div>

      <div className="flex flex-col gap-3 pr- flex-1">
        <h3 className="title-font text-2xl  leading-snug flex items-center gap-2">
          <span className={`inline-block h-2 w-2 rounded-full ${accentClass}`} />
          {name}
        </h3>
        <p className="text-md leading-relaxed opacity-90">
          {description.length > 100 ? description.slice(0, 100) + '...' : description }
        </p>

        <div className="mt-auto pt-1">
          <div className="h-1 w-full bg-black/10 rounded-full overflow-hidden">
            <span className={`block h-full w-0 group-hover:w-full transition-all duration-700 ease-out ${accentClass}`} />
          </div>
        </div>
      </div>

      <span className="absolute inset-0 rounded-xl ring-0 group-focus-within:ring-2 ring-offset-2 ring-primary/60 pointer-events-none" />
    </article>
  )
}

export default ServiceCard