import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsAdmin(currentUser?.email === 'admin@gmail.com');
    });

    return () => unsubscribe();
  }, []);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSellClick = (e) => {
    if (!auth.currentUser) {
      e.preventDefault();
      alert("To buy or sell, you need to register. It takes 5 minutes to do it and then you can conveniently buy/Sell. Have fun.");
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Failed to log out.");
    }
  };

  return (
    <header className="header">
      <h1 className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        Auction Your Stuff
      </h1>
      <nav className="nav-buttons">
        {!user ? (
          <>
            <Link to="/signup" className="nav-btn">Sign Up</Link>
            <Link to="/login" className="nav-btn">Login</Link>
          </>
        ) : (
          <>
            {isAdmin && (
              <Link to="/admin/reports" className="nav-btn">Admin Reports</Link>
            )}
            <button onClick={handleLogout} className="nav-btn">Log Out</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;



