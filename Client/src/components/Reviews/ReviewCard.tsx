import type { Review } from '../../lib/types'
import type { JSX } from 'react'
import { IoMdQuote } from 'react-icons/io'

const ReviewCard = ({ review }: { review: Review }): JSX.Element => {
    const initial = review.name?.trim()?.charAt(0)?.toUpperCase() || '?'
    const stars = Array.from({ length: 5 }, (_, i) => i < review.rate)
    return (
        <article
            aria-label={`Review by ${review.name}`}
            className="relative group w-120 flex flex-col h-full rounded-xl bg-secondary/5 backdrop-blur-sm shadow-sm shadow-black/15 border border-black/5 overflow-hidden transition-all duration-500 hover:shadow-lg hover:-translate-y-1">


            <div className="flex items-start gap-4 px-5 pt-6 pb-4">
                <div className="relative w-14 h-14 rounded-full bg-green-600/20 text-white flex items-center justify-center font-semibold text-lg shadow-md shadow-black/20">
                    {initial}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-neutral-800 tracking-wide text-base title-font truncate">{review.name}</h3>
                    <p className="text-xs text-neutral-500 truncate">{review.email}</p>
                </div>
                <IoMdQuote className="text-4xl text-secondary/30 -mt-1" />
            </div>

            <div className="px-5 pb-5 flex-1">
                <p className="text-lg leading-relaxed text-neutral-700 line-clamp-5 group-hover:line-clamp-none transition-all duration-300">
                    {review.text}
                </p>
            </div>

            <div className="px-5 pb-4 flex items-center justify-between mt-auto">
                <div className="flex gap-1">
                    {stars.map((filled, i) => (
                        <span
                            key={i}
                            className={`text-xl ${filled ? 'text-amber-400' : 'text-neutral-300'}`}
                            aria-hidden="true"
                        >
                            ★
                        </span>
                    ))}
                </div>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">
                    {review.rate}/5
                </span>
            </div>
        </article>
    )
}

export default ReviewCard