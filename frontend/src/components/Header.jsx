import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">Auction Your Stuff</h1>
      <nav className="nav-buttons">
        <Link to="/signup" className="nav-btn">Sign Up</Link>
        <Link to="/login" className="nav-btn">Login</Link>
        <Link to="/sell" className="nav-btn">Sell</Link>
        <Link to="/buy" className="nav-btn">Buy</Link>
      </nav>
    </header>
  );
};

export default Header;
