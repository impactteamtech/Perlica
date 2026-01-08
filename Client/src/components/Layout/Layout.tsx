import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import NavBar from '../hero/NavBar';

const Layout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (!state?.scrollTo) return;

    const targetIds: Record<string, string> = {
      contact: 'contact-section',
      partner: 'partner-section',
      about: 'about-section',
    };

    const targetId = targetIds[state.scrollTo];
    if (!targetId) return;

    const timeoutId = window.setTimeout(() => {
      const section = document.getElementById(targetId);
      if (section) {
        const yOffset = -100;
        const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 150);

    return () => window.clearTimeout(timeoutId);
  }, [location]);

  return (
    <div className='overflow-hidden'>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
