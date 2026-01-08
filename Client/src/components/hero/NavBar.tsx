import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; // Assuming you use Router, otherwise use <a>
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import world_translate from "/world_icon.png";

const NavBar = () => {
    const navigate = useNavigate();
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Destinations', path: '/destinations' },
        { name: 'Hotels', path: '/hotels' },
        { name: 'Cars', path: '/cars' },
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


    const handleContactClick = () => {
        navigate('/', { state: { scrollTo: 'contact' } });
        setIsMenuOpen(false);
    };


    // Add these variables at the top of your component scope (outside the function)
    let originalTexts: string[] = [];
    let textNodes: Text[] = [];
    let swahiliTranslations: string[] = []; // Cache for Swahili translations
    let isSwahiliMode = false; // Track current language state

    function collectTextNodes() {
        originalTexts = [];
        textNodes = [];

        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    if (
                        node.nodeValue &&
                        node.nodeValue.trim().length > 1 &&
                        node.parentElement &&
                        !["SCRIPT", "STYLE"].includes(node.parentElement.tagName)
                    ) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_REJECT;
                },
            }
        );

        let node: Text | null;
        while ((node = walker.nextNode() as Text | null)) {
            textNodes.push(node);
            originalTexts.push(node.nodeValue ?? "");
        }

        console.log("Collected text nodes:", textNodes.length);
    }

    // Helper function to apply translations
    function applyTranslations(translations: string[]) {
        requestAnimationFrame(() => {
            translations.forEach((t: string, i: number) => {
                const node = textNodes[i];
                if (node) {
                    node.nodeValue = t || originalTexts[i] || "";
                }
            });
            console.log("Translations applied!");
        });
    }

    // Helper function to revert to English
    function revertToEnglish() {
        requestAnimationFrame(() => {
            textNodes.forEach((node, i) => {
                if (node && originalTexts[i]) {
                    node.nodeValue = originalTexts[i];
                }
            });
        });
        console.log("Reverted to original English text");
    }

    async function translatePage() {
        try {
            console.log(`Current mode: ${isSwahiliMode ? 'Swahili' : 'English'}`);

            // Collect texts if needed (only on first translation)
            if (textNodes.length === 0) {
                collectTextNodes();
            }

            // Toggle between English and Swahili
            if (isSwahiliMode) {
                // Switch back to English
                revertToEnglish();
                isSwahiliMode = false;
                updateButtonText(); // Update button text
                return;
            }

            // We're switching to Swahili
            console.log(`Translating ${originalTexts.length} text nodes to Swahili`);

            // Check if we have cached Swahili translations
            if (swahiliTranslations.length === 0) {
                // No cache - fetch from API
                console.log("No cache found, calling API...");
                console.log("Sending to backend:", originalTexts.slice(0, 3));

                const res = await fetch("https://perlica-backend.onrender.com/translate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        texts: originalTexts,
                        target: "sw"
                    }),
                });

                const data = await res.json();
                console.log("Backend response received");

                // Handle response
                let translations: string[] = [];

                if (data.translations && Array.isArray(data.translations)) {
                    translations = data.translations;
                    // Cache the translations for future use
                    swahiliTranslations = [...translations];
                    console.log("Translations cached for future use");
                } else if (data.error) {
                    console.error("Translation error:", data.error);
                    return;
                }

                console.log(`Received ${translations.length} translations`);

                // Apply the translations
                if (translations.length > 0) {
                    applyTranslations(translations);
                    isSwahiliMode = true;
                    updateButtonText(); // Update button text
                } else {
                    console.error("No translations received");
                }
            } else {
                // Use cached translations
                console.log(`Using cached translations (${swahiliTranslations.length} items)`);
                applyTranslations(swahiliTranslations);
                isSwahiliMode = true;
                updateButtonText(); // Update button text
            }
        } catch (error) {
            console.error("Translation failed:", error);
        }
    }

    // Function to update button text
    function updateButtonText() {
        const button = document.getElementById('translate-sw-button');
        if (button) {
            const icon = button.querySelector('img');
            const textSpan = button.querySelector('span');

            if (textSpan) {
                textSpan.textContent = isSwahiliMode ? 'English' : 'Swahili';
            } else {
                // Create span if it doesn't exist
                const span = document.createElement('span');
                span.textContent = isSwahiliMode ? 'English' : 'Swahili';

                // Remove existing text nodes and add the span
                Array.from(button.childNodes).forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        button.removeChild(node);
                    }
                });

                if (icon) {
                    button.appendChild(icon);
                }
                button.appendChild(span);
            }
        }
    }
    // translate ends

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
                {navLinks.map((link, i) => {
                    if (link.name === 'Contact') {
                        return (
                            <button
                                key={i}
                                type="button"
                                onClick={handleContactClick}
                                className="text-2xl font-semibold text-white hover:text-secondary transition-colors"
                            >
                                {link.name}
                            </button>
                        );
                    }

                    return (
                        <NavLink
                            key={i}
                            to={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-2xl font-semibold text-white hover:text-secondary transition-colors"
                        >
                            {link.name}
                        </NavLink>
                    );
                })}
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

                <div
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 cursor-pointer z-50">
                    <img
                        src="/Perlica_logo.png"
                        alt="Perlica Logo"
                        className="w-20 h-auto object-contain drop-shadow-md"
                    />
                </div>

                {/* --- Desktop Nav --- */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, i) => {
                        const baseClasses = `group relative lg:text-md xl:text-lg font-medium tracking-wide transition-colors duration-300 ${isScrolled ? "text-black hover:text-secondary" : "text-white/90 hover:text-white"
                            }`;

                        const underlineClasses = `absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${isScrolled ? "bg-secondary" : "bg-white"
                            }`;

                        if (link.name === 'Contact') {
                            return (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={handleContactClick}
                                    className={baseClasses}
                                >
                                    {link.name}
                                    <span className={underlineClasses} />
                                </button>
                            );
                        }

                        return (
                            <NavLink
                                key={i}
                                to={link.path}
                                className={baseClasses}
                            >
                                {link.name}
                                <span className={underlineClasses} />
                            </NavLink>
                        );
                    })}

                    {/* Translate Btn */}
                    <button
                        className="translateBtn flex items-center justify-center font-inherit cursor-pointer"
                        id="translate-sw-button"
                        onClick={() => translatePage()}
                    >
                        <img src={world_translate} className="w-5 mr-1" alt="" />
                        <span>Swahili</span>
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

                    {/* Translate Btn */}
                    <button
                        className="translateBtn flex items-center justify-center font-inherit cursor-pointer"
                        id="translate-sw-button"
                        onClick={() => translatePage()}
                    >
                        <img src={world_translate} className="w-5 mr-1" alt="" />
                        <span>Swahili</span>
                    </button>
                </div>

            </nav>
            {isClient ? createPortal(mobileMenuOverlay, document.body) : null}
        </>
    );
}

export default NavBar;
