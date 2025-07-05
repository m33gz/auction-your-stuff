import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSellClick = (e) => {
    const user = auth.currentUser;
    if (!user) {
      e.preventDefault(); // prevent navigation
      alert("To buy or sell, you need to register. It takes 5 minutes to do it and then you can conveniently buy/Sell. Have fun.");
    }
  };

  return (
    <header className="header">
      <h1 className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>Auction Your Stuff</h1>
      <nav className="nav-buttons">
        <Link to="/signup" className="nav-btn">Sign Up</Link>
        <Link to="/login" className="nav-btn">Login</Link>
      </nav>
    </header>
  );
};

export default Header;

