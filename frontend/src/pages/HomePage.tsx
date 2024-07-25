import HomePageContext from '@/components/HomePageCompo/HomePageContext/HomePageContext';
import HomePageNavBar from '@/components/HomePageCompo/HomePageNavBar/HomePageNavBar';
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <HomePageNavBar />
      <HomePageContext />
    </div>
  );
};

export default HomePage;
