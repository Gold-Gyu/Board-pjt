import React from 'react';
import './Navbar.css';
import Profile from '../Profile/Profile';
import useMovePage from '@/hooks/useMovePage';

const Navbar = () => {
  const { movePage } = useMovePage();

  return (
    <header className="navbar">
      <div
        className="logo"
        onClick={() => {
          movePage('/', null);
          location.reload();
        }}
      >
        GOLDGYU'S Board
      </div>

      {/* <Profile isLoggedIn={isLoggedIn} username={username} profileImage={profileImage} /> */}
    </header>
  );
};

export default Navbar;
