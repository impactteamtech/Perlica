import type { JSX } from 'react'

const StyledTextCard = (): JSX.Element => {
  return (
    <div className='relative group'>      
      {/* Main Card */}
      <div className='relative bg-white/60 backdrop-blur-sm p-4 mt-6 text-black  rounded-2xl border-2 border-green-800/50 shadow-md transition-all duration-500'>
        
        <div className='absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full' />
        <h4 className='text-lg font-medium font-baskerville leading-relaxed'>
          <span className='text-primary font-semibold   rounded-lg'>
            Perlica
          </span>
          &nbsp;is a leading travel and tour company based in East Africa,
          specializing in tailor-made travel experiences across{' '}
          <span className='text-secondary ml-1  inline-flex items-center'>
            Kenya 
            <img 
              src="/kenya_flag_icon.png" 
              className="w-6 h-6 ml-2 transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm" 
              alt="Kenya Icon" 
            />
          </span>
        </h4>
    </div>
    </div>
  )
}

export default StyledTextCard