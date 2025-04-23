import LandingPage from '@/components/home/LandingPage';
// import MainDoor from '@/components/home/MainDoor';
import React from 'react';

const Home = () => {
  return (
    <div className={`overflow-hidden [&::-webkit-scrollbar]:hidden`}>
      {/* <MainDoor /> */}
      <LandingPage />
    </div>
  );
};

export default Home;
