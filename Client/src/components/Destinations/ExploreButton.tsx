import { useNavigate } from 'react-router-dom'
const ExploreButton = () => {
  const navigate = useNavigate();
  return (
    <button
        onClick={()=>{ navigate('/destinations/countries')}} 
        title="Explore Destinations" className='absolute bg-secondary/90 bottom-25 border border-white duration-200  hover:bg-secondary/80 px-6 py-3 rounded-lg  font-medium text-white hover:scale-105 transition-transform shadow-lg'>
        Explore Destinations
    </button>
  )
}

export default ExploreButton