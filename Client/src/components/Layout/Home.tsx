import React from 'react';
import AboutUs from '../AboutUs/AboutUs';
import Services from '../Services/Services';
import Reviews from '../Reviews/Reviews';
import PartnerWithUs from '../PartnerWithUs/PartnerWithUs';
import Events from '../Events/Events';
import ContactUs from '../contact/ContactUs';
import HeroSection from '../Hero/HeroSection';
const Home: React.FC = () => {
    return (
        <div>
            <HeroSection />
            <AboutUs />
            <Services />
            <Events />
            <Reviews />
            <PartnerWithUs />
            <ContactUs />
        </div>
    );
};

export default Home;