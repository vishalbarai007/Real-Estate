import React from 'react';
import HeroSection from '../components/home/HeroSection';
import OurPromise from '../components/home/OurPromise';
import PurposeSection from '../components/home/PurposeSection';
import FeaturedProjects from '../components/home/FeaturedProjects';

const Home = () => {
  return (
    <div className="bg-lodha-white">
      <HeroSection />
      <OurPromise />
      <PurposeSection />
      <FeaturedProjects />
    </div>
  );
};

export default Home;
