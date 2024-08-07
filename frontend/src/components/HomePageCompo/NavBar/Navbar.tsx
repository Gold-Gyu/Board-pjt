import React from 'react';
import './Navbar.css';
import Profile from '../Profile/Profile';

const Navbar = () => {
  

  return (
    <header className="navbar">
      <div className="logo">GOLDGYU'S Board</div>
      {/* <input type="text" placeholder="Search..." className="search-bar" /> */}
      {/* <Profile isLoggedIn={isLoggedIn} username={username} profileImage={profileImage} /> */}
    </header>
  );
};

export default Navbar;
