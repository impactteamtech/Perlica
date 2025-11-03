const KenyaMap = () => {
  return (
    <div className="w-full  relative md:px-80 px-15 py-10 group">
    
      <div className="relative rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-[1.02]">
        {/* Loading shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse z-0"></div>
        
        {/* Map with overlay effects */}
        <div className="relative rounded-xl  overflow-hidden h-[200px] md:h-[300px] lg:h-[400px] shadow-inner">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8171114.061361927!2d32.58667041330272!3d0.16494205043189697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182780d08350900f%3A0x403b0eb0a1976dd9!2sKenya!5e0!3m2!1sfr!2sma!4v1761431804451!5m2!1sfr!2sma"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'saturate(1.1) contrast(1.1)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Kenya Map"
            className="relative z-10"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none z-20"></div>
        </div>

        

    
      </div>

  
    </div>
  )
}

export default KenyaMap