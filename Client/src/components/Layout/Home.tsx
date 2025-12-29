import React, { Suspense, lazy } from 'react';
import HeroSection from '../hero/HeroSection';
import { Loading } from '../ui/loading';

const AboutUs = lazy(() => import('../AboutUs/AboutUs'));
const Services = lazy(() => import('../Services/Services'));
const Events = lazy(() => import('../Events/Events'));
const Reviews = lazy(() => import('../Reviews/Reviews'));
const PartnerWithUs = lazy(() => import('../PartnerWithUs/PartnerWithUs'));
const ContactUs = lazy(() => import('../contact/ContactUs'));
const Home: React.FC = () => {
    return (
        <div>
            <HeroSection />
            <Suspense fallback={<Loading label="Loading sections..." />}>
                <AboutUs />
                <Services />
                <Events />
                <Reviews />
                <PartnerWithUs />
                <ContactUs />
            </Suspense>
        </div>
    );
};

export default Home;