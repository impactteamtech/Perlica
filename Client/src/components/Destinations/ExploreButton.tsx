import { useNavigate } from 'react-router-dom'
const ExploreButton = () => {
  const navigate = useNavigate();
  return (
    <button
        onClick={()=>{ navigate('/destinations/countries')}} 
        title="Explore Destinations" className='absolute left-1/2 -translate-x-1/2 bottom-20 sm:bottom-16 md:bottom-20 bg-secondary/90 border border-white duration-200 hover:bg-secondary/80 md:px-5 px-3 py-2 sm:py-3 md:py-3 rounded-lg font-medium text-white hover:scale-105 transition-transform shadow-lg'>
        Explore Destinations
    </button>
  )
}

export default ExploreButton