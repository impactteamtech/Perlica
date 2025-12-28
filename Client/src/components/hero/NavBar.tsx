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

    // Handle Scroll Effect
    useEffect(() => {
        const handleScroll = () => {
            // Change state if scrolled more than 50px
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    return (
        <nav 
            className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-16 lg:px-24 transition-all duration-300 z-50 
            ${isScrolled 
                ? "bg-black/50  backdrop-blur-md py-2" 
                : "bg-transparent py-2"
            }`}
        >

            {/* --- Logo --- */}
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
                        className={`group relative text-lg font-medium tracking-wide transition-colors duration-300
                        ${isScrolled ? "text-white hover:text-emerald-600" : "text-white/90 hover:text-white"}`}
                    >
                        {link.name}
                        {/* Animated Underline */}
                        <span className={`absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full 
                            ${isScrolled ? "bg-emerald-500" : "bg-white"}`} 
                        />
                    </NavLink>
                ))}
            </div>

            {/* --- Desktop Right Actions --- */}
            <div className="hidden md:flex items-center gap-6">
                {/* Search Icon */}
                <button className={`transition-colors duration-300 ${isScrolled ? "text-gray-600 hover:text-emerald-600" : "text-white hover:text-emerald-400"}`}>
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </button>

                {/* Login Button */}
                <button className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                    ${isScrolled 
                        ? "bg-[#04c41a] text-white hover:bg-[#04c41a]/90" 
                        : "bg-red-600 text-white hover:bg-emerald-50"}`}
                >
                    Login
                </button>
            </div>

            {/* --- Mobile Toggle Button --- */}
            <div className="flex items-center md:hidden z-50">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
                    {isMenuOpen ? (
                        <svg className="h-8 w-8 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
            <div className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out md:hidden
                ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {navLinks.map((link, i) => (
                    <NavLink 
                        key={i} 
                        to={link.path} 
                        onClick={() => setIsMenuOpen(false)}
                        className="text-2xl font-semibold text-gray-800 hover:text-emerald-600 transition-colors"
                    >
                        {link.name}
                    </NavLink>
                ))}

                <div className="w-16 h-[1px] bg-gray-300 my-4" />

                <button className="text-xl text-gray-600 font-medium">Search</button>
                
                <button className="bg-emerald-600 text-white text-xl px-10 py-3 rounded-full shadow-lg active:scale-95 transition-transform">
                    Login
                </button>
            </div>
        </nav>
    );
}

export default NavBar;