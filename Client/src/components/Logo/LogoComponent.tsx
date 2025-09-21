import React from 'react';
import logo from '/Perlica_logo.png'
const LogoComponent: React.FC = () => {
  return (
    <div className='absolute top-0 left-0'>
      <img src={logo} width={60} height={60}/>
      
    </div>
  );
};

export default LogoComponent;