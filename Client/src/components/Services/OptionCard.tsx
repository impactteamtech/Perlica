import type { Option } from '../../lib/types'

const OptionCard = ({ option, index }: { option: Option, index: number }) => {
  const isUrl = option.description.startsWith('http://') || option.description.startsWith('https://');
  
  return (
    <div className="group  relative">
      <div className="rounded-xl p-[1px] bg-gradient-to-br from-secondary/30 via-secondary/10 to-transparent">
        {/* Card body */}
        <div 
          className={`
            relative rounded-xl bg-white/30 backdrop-blur-sm
            p-7 md:p-8 shadow-sm transition-all duration-500 ease-out
            hover:shadow-xl hover:translate-y-[-2px]
            overflow-hidden
          `}
        >
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-secondary/10 blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
          <div className="pointer-events-none absolute -left-8 -bottom-8 h-20 w-20 rounded-full bg-secondary/10 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />

          <div className="relative flex items-center gap-4 mb-5 md:mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-secondary/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
              <div 
                className="relative w-12 h-12 rounded-full flex items-center justify-center text-sm font-extrabold text-white shadow-lg bg-gradient-to-br from-secondary/60 to-secondary/40 border border-white/20 group-hover:scale-110 group-hover:shadow-xl transition-transform"
                aria-hidden="true"
              >
                {index + 1}
                <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full" />
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
              {option.optionName}
            </h3>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-secondary/20 via-secondary/10 to-transparent mb-5 md:mb-6" />

          {/* Content */}
          <div className="relative">
            {isUrl ? (
              <div className="flex flex-col gap-3">
                <p className="text-xs md:text-sm text-gray-500 font-medium">Useful resource</p>
                <a
                  href={option.description}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus:outline-none focus:ring-2 focus:ring-secondary/40 rounded-xl"
                >
                  <span 
                    className="inline-flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-secondary/10 hover:bg-secondary/20 text-gray-700 hover:text-gray-900 border border-secondary/20 hover:border-secondary/40 transition-all duration-300 group/link"
                  >
                    <span className="font-medium truncate flex-1">
                      {option.description.replace(/(^\w+:|^)\/\//, '')}
                    </span>
                    <svg
                      className="w-5 h-5 text-secondary flex-shrink-0 transform group-hover/link:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  {option.description.slice(0, 150)}{option.description.length > 150 ? '...' : ''}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OptionCard