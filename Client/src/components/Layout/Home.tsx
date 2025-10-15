import React from 'react';
import Hero from '../Hero/Hero';
import SearchPackages from '../SearchPackages/SearchPackages';
import AboutUs from '../AboutUs/AboutUs';
import Services from '../Services/Services';
import Reviews from '../Reviews/Reviews';
import PartnerWithUs from '../PartnerWithUs/PartnerWithUs';
import Events from '../Events/Events';

const Home: React.FC = () => {
    return (
        <div>
         
            <Hero />
            {/* <div className="absolute left-1/2 transform -translate-x-1/2 top-[700px]  z-[10]">
             <SearchPackages />
            </div> */}
            <AboutUs />
            <Services />
            <Events />
            <Reviews />
            <PartnerWithUs />

        </div>
    );
};

export default Home;