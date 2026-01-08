import type { JSX } from 'react'

const AdditionalInfo = (): JSX.Element => {
  return (
    <>
      {/* Enhanced Hero Banner Section */}
      <div className='relative bg-gradient-to-br from-secondary/20 via-secondary/10 to-primary/10 w-full min-h-[400px] mt-3 flex-col items-center flex justify-center px-6 py-16 overflow-hidden'>
        {/* Animated background elements */}
        <div className='absolute inset-0 bg-grid-pattern opacity-5'></div>
        <div className='absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl'></div>
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl'></div>
        
        <div className='relative z-10 max-w-4xl mx-auto text-center space-y-8'>
          <div className='inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/10 mb-4'>
            <span className='w-2 h-2 bg-primary rounded-full animate-pulse'></span>
            <span className='text-sm font-mono text-primary font-medium'>RESERVE NOW & PAY LATER</span>
          </div>
          
          <h1 className='text-5xl md:text-6xl lg:text-7xl color-primary title-font font-mono font-bold tracking-tight'>
            KEEP THINGS{' '}
            <span className='relative inline-block'>
              FLEXIBLE
              <span className='absolute bottom-2 left-0 w-full h-3 bg-secondary/30 -z-10 transform rotate-1'></span>
            </span>
          </h1>
          
          <p className='text-gray-700 text-lg md:text-xl max-w-2xl mx-auto font-mono leading-relaxed bg-white/60 backdrop-blur-sm py-4 px-6 rounded-2xl border border-gray-200'>
            Secure your dream activities without commitment. Book now, pay when you're ready.
          </p>
        </div>
      </div>

      {/* Enhanced Travel Tips Section */}
      <div className='flex flex-col gap-12 py-10 px-4 max-w-7xl mx-auto'>
        <div className='text-center space-y-4 mb-8'>
          <h2 className='text-4xl md:text-5xl font-bold color-primary font-mono tracking-tight'>
            Travel Smarter,{' '}
              Not Harder
          </h2>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Enhanced Card 1 */}
          <div className='group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-secondary/50 hover:-translate-y-3 relative overflow-hidden'>
            <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-secondary'></div>
            <div className='relative z-10'>
              <div className='w-16 h-16 bg-secondary/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                </svg>
              </div>
              <h3 className='text-2xl font-bold text-gray-800 mb-4 font-mono'>Best Time to Visit</h3>
              <p className='text-gray-600 leading-relaxed text-lg'>
                Discover the ideal seasons for each destination to maximize your experience and avoid crowds while enjoying perfect weather conditions.
              </p>
            </div>
          </div>

          {/* Enhanced Card 2 */}
          <div className='group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-secondary/50 hover:-translate-y-3 relative overflow-hidden'>
            <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-secondary'></div>
            <div className='relative z-10'>
              <div className='w-16 h-16 bg-secondary/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
              </div>
              <h3 className='text-2xl font-bold text-gray-800 mb-4 font-mono'>Local Experiences</h3>
              <p className='text-gray-600 leading-relaxed text-lg'>
                Go beyond tourist spots with authentic local experiences, hidden gems, and cultural immersion in every city you visit.
              </p>
            </div>
          </div>

          {/* Enhanced Card 3 */}
          <div className='group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-secondary/50 hover:-translate-y-3 relative overflow-hidden'>
            <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-secondary'></div>
            <div className='relative z-10'>
              <div className='w-16 h-16 bg-secondary/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' />
                </svg>
              </div>
              <h3 className='text-2xl font-bold text-gray-800 mb-4 font-mono'>Travel Prepared</h3>
              <p className='text-gray-600 leading-relaxed text-lg'>
                Essential tips on local customs, transportation, must-try foods, and practical advice for each destination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdditionalInfo