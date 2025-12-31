import  { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; // Assuming you use Router, otherwise use <a>
import { createPortal } from "react-dom";

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
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

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

    const mobileMenuOverlay = (
        <div
            className={`fixed inset-0 z-50 md:hidden overflow-x-hidden transition-opacity duration-300 h-[100dvh]
            ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-xl"
                onClick={() => setIsMenuOpen(false)}
            />

            <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-6 z-10 md:hidden"
            >
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

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
            </div>
        </div>
    );

    return (
        <>
        <nav 
            className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-16 lg:px-24 transition-all duration-300 z-40 
            ${isScrolled 
                ? "border-gray-600/10 border-b backdrop-blur-md py-2" 
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
        </nav>
        {isClient ? createPortal(mobileMenuOverlay, document.body) : null}
        </>
    );
}

export default NavBar;