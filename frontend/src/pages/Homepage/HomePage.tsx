import React from 'react';
import './HomePage.css';
import Board from '@/components/HomePageCompo/BoardIntro/BoardIntro';

const HomePage = () => {
  return (
    <div className="homepage">
      <Board category={'전체게시글'} />
    </div>
  );
};

export default HomePage;
