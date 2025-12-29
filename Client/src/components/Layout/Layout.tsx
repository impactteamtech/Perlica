import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
const Layout: React.FC = () => {
  return (
    <div className='overflow-hidden'>
      {/* <NavBar /> */}
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Layout;
