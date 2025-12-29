import  { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; // Assuming you use Router, otherwise use <a>

const NavBar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Destinations', path: '/destinations' },
        { name: 'Hotels', path: '/hotels' },
        {name:'Cars', path:'/cars' },
        { name: 'Contact', path: '/contact' },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    return (
        <nav 
            className={`fixed top-0  right-0 w-full flex items-center justify-between px-6 md:px-16 lg:px-24 transition-all duration-300 z-200 
            ${isScrolled 
                ? "border-gray-600/10 border-b-1 backdrop-blur-md py-2" 
                : "bg-transparent py-2 border-none"
            }`}
        >

            <div className="flex items-center gap-2 cursor-pointer z-50">
                <img 
                    src="/Perlica_logo.png" 
                    alt="Perlica Logo" 
                    className="w-20 h-auto object-contain drop-shadow-md" 
                />
            </div>

            {/* --- Desktop Nav --- */}
            <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link, i) => (
                    <NavLink 
                        key={i} 
                        to={link.path} 
                        className={`group relative lg:text-md xl:text-lg font-medium tracking-wide transition-colors duration-300
                        ${isScrolled ? "text-black hover:text-secondary" : "text-white/90 hover:text-white"}`}
                    >
                        {link.name}
                        <span className={`absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full 
                            ${isScrolled ? "bg-secondary" : "bg-white"}`} 
                        />
                    </NavLink>
                ))}
            </div>

            <div className="hidden md:flex items-center gap-6">
            
                <button className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                    ${isScrolled 
                        ? "bg-[#04c41a] text-white hover:bg-[#04c41a]/90" 
                        : "bg-red-600 text-white hover:bg-red-600/80"}`}
                >
                    Login
                </button>
            </div>

            <div className="flex items-center md:hidden z-50">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
                    {isMenuOpen ? (
                        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className={`h-8 w-8 transition-colors ${isScrolled ? "text-black" : "text-white"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* --- Mobile Menu Overlay --- */}
            <div
                className={`fixed inset-0 z-40 md:hidden overflow-x-hidden transition-opacity duration-300
                ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-xl" />

                <div
                    className={`relative h-full w-full flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out
                    ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
                >
                    {navLinks.map((link, i) => (
                        <NavLink 
                            key={i} 
                            to={link.path} 
                            onClick={() => setIsMenuOpen(false)}
                            className="text-2xl font-semibold text-white hover:text-secondary transition-colors"
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    
                    <button className="bg-secondary text-white text-xl px-10 py-3 rounded-full shadow-lg active:scale-95 transition-transform">
                        Login
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;