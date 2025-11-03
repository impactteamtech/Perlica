import type { Review } from '../../lib/types'
import type { JSX } from 'react'
import { IoMdQuote } from 'react-icons/io'

const ReviewCard = ({ review }: { review: Review }): JSX.Element => {
    const initial = review.name?.trim()?.charAt(0)?.toUpperCase() || '?'
    const stars = Array.from({ length: 5 }, (_, i) => i < review.rate)
    return (
        <div className="group relative w-full h-full">
            {/* Gradient border wrapper to match OptionCard */}
            <div className="rounded-xl p-[1px] w-full h-full bg-gradient-to-br from-secondary/30 via-secondary/10 to-transparent">
                {/* Card body */}
                <article
                    aria-label={`Review by ${review.name}`}
                    className="relative rounded-xl bg-white/30 backdrop-blur-sm p-5 sm:p-6 md:p-7 shadow-sm transition-all h-75 md:h-75 duration-500 ease-out hover:shadow-xl hover:translate-y-[-2px] overflow-hidden flex flex-col"
                >
                    {/* Soft glow decorations */}
                    <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-secondary/10 blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="pointer-events-none absolute -left-8 -bottom-8 h-20 w-20 rounded-full bg-secondary/10 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />

                    {/* Header: avatar + name/email + quote icon */}
                    <div className="relative flex items-start gap-3 sm:gap-4 mb-4 md:mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-secondary/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
                            <div
                                className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-sm sm:text-base font-extrabold text-white shadow-lg bg-gradient-to-br from-secondary/60 to-secondary/40 border border-white/20 group-hover:scale-110 group-hover:shadow-xl transition-transform"
                                aria-hidden="true"
                                title={review.name}
                            >
                                {initial}
                                <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors truncate">
                                {review.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 truncate">{review.email}</p>
                        </div>
                        <IoMdQuote className="text-3xl sm:text-4xl text-secondary/30 -mt-1" aria-hidden="true" />
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-secondary/20 via-secondary/10 to-transparent mb-5 md:mb-6" />

                    {/* Review text */}
                    <div className="relative flex-1">
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg line-clamp-5 group-hover:line-clamp-none transition-all duration-300">
                            {review.text}
                        </p>
                    </div>

                    {/* Footer: stars + rate */}
                    <div className="mt-5 md:mt-6 flex items-center justify-between">
                        <div className="flex gap-1">
                            {stars.map((filled, i) => (
                                <span
                                    key={i}
                                    className={`text-lg sm:text-xl ${filled ? 'text-amber-400' : 'text-neutral-300'}`}
                                    aria-hidden="true"
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <span className="text-[10px] sm:text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">
                            {review.rate}/5
                        </span>
                    </div>
                </article>
            </div>
        </div>
    )
}

export default ReviewCard