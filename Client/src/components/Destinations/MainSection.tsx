import ImageGallery from './ImageGallery'
import SearchForm from './SearchForm'
import Title from './Title'

const MainSection = () => {

  return (
    <section className='h-135 py-6 px-10 flex items-center  justify-center  relative'>
      <ImageGallery />
      <div className='absolute flex flex-col gap-4 top-[40%] w-full text-center px-4'>
        <Title />
        <p
          className="text-white text-2xl text-font"
          >Discover breathtaking destinations and plan your perfect getaway with us.</p>
      </div>
      <SearchForm />
    </section>
  )
}

export default MainSection