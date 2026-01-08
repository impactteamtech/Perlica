import ImageGallery from './ImageGallery'
import Title from './Title'
import ExploreButton from './ExploreButton'
const MainSection = () => {

  return (
    <section className='relative flex items-center justify-center h-[70vh] sm:h-[75vh] md:h-[85vh] lg:h-[90vh]'>
      <ImageGallery />
      <div className='absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-4 w-full text-center px-4 sm:px-6'>
        <Title />
        <p
          className="text-white text-base sm:text-lg md:text-2xl max-w-3xl"
          >Discover breathtaking destinations and plan your perfect getaway with us.</p>
      </div>
      <ExploreButton />
    </section>
  )
}

export default MainSection