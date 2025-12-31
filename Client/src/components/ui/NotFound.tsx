import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Home} from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    // Use h-screen to ensure it takes full viewport height
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-stone-900">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover opacity-60" // Reduced opacity so it's not too distracting
          src="/not-found.png" 
          alt="Safari landscape" 
        />
        // A gradient overlay makes text at the bottom/center easier to read than a flat color
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/50 to-stone-900/20" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl mx-auto text-white">
        <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
          Off the Beaten Path?
        </h2>
        <p className="text-lg text-stone-300 mb-10 max-w-md">
          It looks like you've ventured a little too far into the wild. The page you are looking for doesn't exist or has been moved.
        </p>

        {/* Button Group */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-stone-400 text-stone-200 hover:bg-stone-800 hover:border-white transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
          
          <Link 
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary/70 hover:from-primary/80 hover:to-primary/60 text-white  transition-all font-medium"
          >
            <Home size={20} />
            Back to Home Page
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound;