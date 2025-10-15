import { useEffect, useState, useRef } from 'react';
import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
const Layout: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const timeoutRef = useRef<number|null>(null);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // When scrolls down past 100px, hide the header (yp)
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setIsVisible(true);
      }, 2500);
    } else {
      
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [lastScrollY]);

  return (
    <div>
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
          zIndex: 40,
        }}
      >
        <Header />
      </div>
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Layout;
