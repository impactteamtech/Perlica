import React from 'react';
import CircularGalleryInner from './CircularGallery'

const CircularGallery: React.FC = () => {
  return (

<div style={{ height: '600px', position: 'relative' }}>
  <CircularGalleryInner bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02}/>
</div>
  );
};

export default CircularGallery;