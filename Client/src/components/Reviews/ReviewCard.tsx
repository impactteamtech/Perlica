import type { Review } from '../../lib/types'
import type { JSX } from 'react'
import { IoMdQuote, IoMdStar, IoMdStarOutline } from 'react-icons/io'

const ReviewCard = ({ review }: { review: Review }): JSX.Element => {
    const initial = review.name?.trim()?.charAt(0)?.toUpperCase() || '?'
    
    // Create arrays for filled and empty stars based on rating
    const filledStars = Array.from({ length: review.rate })
    const emptyStars = Array.from({ length: 5 - review.rate })

    return (
        <div className="group relative h-full w-full isolate">
            <article
                className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl 
                           bg-white/50 backdrop-blur-xl border border-black/20
                           transition-all duration-300 ease-out 
                           p-6 sm:p-8"
            >
                <IoMdQuote className="absolute top-4 right-6 text-8xl text-secondary/5 pointer-events-none rotate-12" />

                <div className="relative z-10 flex items-center gap-4 mb-6">
                    <div className="relative shrink-0">
                        <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-secondary to-secondary/60 p-[2px] shadow-md">
                            <div className="h-full w-full rounded-full bg-white flex items-center justify-center text-secondary font-bold text-xl">
                                {initial}
                            </div>
                        </div>
                        {/* Decorative subtle dot */}
                        <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-400 ring-2 ring-white" title="Verified Buyer" />
                    </div>

                    {/* User Details */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-secondary transition-colors duration-300">
                            {review.name}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium">
                            {review.email}
                        </p>
                    </div>
                </div>

                {/* ===== Body Text ===== */}
                <div className="relative z-10 mb-6 flex-grow">
                    <p className="text-slate-600 leading-relaxed text-[15px] italic">
                        "{review.text}"
                    </p>
                </div>

                <div className="relative z-10 flex items-center justify-between pt-6 border-t border-slate-100">
                    <div className="flex gap-0.5 text-amber-400 text-lg sm:text-xl">
                        {filledStars.map((_, i) => (
                            <IoMdStar key={`filled-${i}`} />
                        ))}
                        {emptyStars.map((_, i) => (
                            <IoMdStarOutline key={`empty-${i}`} className="text-slate-300" />
                        ))}
                    </div>

                    {/* Rating Badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                        <span className="text-xs font-bold text-slate-700">
                            {review.rate}.0
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                            / 5
                        </span>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default ReviewCard