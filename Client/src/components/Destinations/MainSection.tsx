import ImageGallery from './ImageGallery'
import Title from './Title'
import ExploreButton from './ExploreButton'
const MainSection = () => {

  return (
    <section className='h-160  px-10 py-6 flex items-center  justify-center  relative'>
      <ImageGallery />
      <div className='absolute flex flex-col gap-4 top-[40%] w-full text-center px-4'>
        <Title />
        <p
          className="text-white text-3xl text-font"
          >Discover breathtaking destinations and plan your perfect getaway with us.</p>
      </div>
      <ExploreButton />
    </section>
  )
}

export default MainSection