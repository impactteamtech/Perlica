import React from 'react';
import Hero from '../Hero/Hero';
import AboutUs from '../AboutUs/AboutUs';
import Services from '../Services/Services';
import Reviews from '../Reviews/Reviews';
import PartnerWithUs from '../PartnerWithUs/PartnerWithUs';
import Events from '../Events/Events';

const Home: React.FC = () => {
    return (
        <div>
            <Hero />
            <AboutUs />
            <Services />
            <Events />
            <Reviews />
            <PartnerWithUs />

        </div>
    );
};

export default Home;