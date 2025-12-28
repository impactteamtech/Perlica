import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import NavBar from '.NavBar';
const Layout: React.FC = () => {
  return (
    <div>
      {/* <NavBar /> */}
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Layout;
