import React from 'react'

const ImageGallery = () => {
  const imagePaths = [
    'bg-1.jpg',
    'bg-2.jpg',
    'bg-3.jpg'
  ]

  const [selectedImage, setSelectedImage] = React.useState<string>(imagePaths[0])

  const prev = () => {
    const idx = imagePaths.indexOf(selectedImage)
    const nextIdx = (idx - 1 + imagePaths.length) % imagePaths.length
    setSelectedImage(imagePaths[nextIdx])
  }

  const next = () => {
    const idx = imagePaths.indexOf(selectedImage)
    const nextIdx = (idx + 1) % imagePaths.length
    setSelectedImage(imagePaths[nextIdx])
  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-full  relative">
        {/* keep image element exactly as before */}
        <img 
        src={`/bg-images-destination/${selectedImage}`} alt="Destination" 
        className='w-full  rounded-2xl brightness-50 object-cover h-full' /> 

        {/* Left button */}
        <button
          type="button"
          aria-label="Previous image"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 hover:scale-110 h-10 md:w-14 md:h-14 rounded-full bg-black/80  border-white/70 hover:border-white border-2 text-white flex items-center  duration-300 justify-center hover:bg-black  transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        {/* Right button */}
        <button
          type="button"
          aria-label="Next image"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 rounded-full bg-black/80 border-2 hover:scale-110  border-white/70 hover:border-white text-white flex items-center duration-300 justify-center hover:bg-black transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-10 z-30 flex items-center gap-3">
        {imagePaths.map((path) => {
          const active = selectedImage === path
          return (
            <button
              key={path}
              type="button"
              aria-label={`Show image ${path}`}
              onClick={() => setSelectedImage(path)}
              className={`flex items-center justify-center w-5 h-5 rounded-full transition-shadow duration-200 ${active ? 'bg-white shadow-lg scale-105' : 'bg-white/30 hover:bg-white/50'}`}
            >
              <span className={`block w-3 h-3 rounded-full ${active ? 'bg-green-500' : 'bg-transparent'}`} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery