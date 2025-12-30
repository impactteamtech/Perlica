import type { JSX } from "react"
import type { Guide } from '../../lib/types'
import { FaWhatsapp, FaInstagram, FaPhoneAlt } from "react-icons/fa";

const TourGuideCard = ({ guide }: { guide: Guide }): JSX.Element => {
  return (
    <div
      aria-label={`View profile of ${guide.name}`}
      className="group bg-white/60 relative w-full aspect-[3/4] overflow-hidden rounded-3xl  shadow-md transition-all duration-150"
    >
      <img
        src={guide.image}
        alt={guide.name}
        className="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110 group-hover:saturate-110"
      />

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 translate-y-6 transition-transform duration-500 ease-out group-hover:translate-y-0">
        
        <div className="absolute inset-0 -z-10 bg-white/10 backdrop-blur-md border-t border-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10 flex flex-col items-center text-center">
          
          <span className="mb-2 inline-block rounded-full bg-secondary/90 px-3 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white shadow-sm">
            {guide.role}
          </span>

          {/* Name */}
          <h3 className="font-baskerville text-2xl sm:text-3xl font-medium text-white drop-shadow-md">
            {guide.name}
          </h3>

          {/* Decorative Divider */}
          <div className="my-3 h-px w-12 bg-white/30 transition-all duration-500 group-hover:w-full group-hover:bg-white/50" />
          <div className="flex items-center gap-4 opacity-0 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
            <SocialButton icon={<FaWhatsapp />} label="WhatsApp" />
            <SocialButton icon={<FaInstagram />} label="Instagram" />
            <SocialButton icon={<FaPhoneAlt size={14} />} label="Call" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper component for the social buttons
const SocialButton = ({ icon, label }: { icon: JSX.Element, label: string }) => (
  <button 
    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-secondary hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
    aria-label={label}
    title={label}
  >
    {icon}
  </button>
)

export default TourGuideCard