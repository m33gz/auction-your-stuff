import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import './Home.css';

const categories = [
  'Electronics',
  'Jewelry',
  'Antiques',
  'Watches',
  'Home & Garden',
  'Automobiles'
];

const Home = () => {
  const navigate = useNavigate();

  const handleSellClick = (category, e) => {
    const user = auth.currentUser;
    if (!user) {
      e.preventDefault();
      alert("To buy or sell, you need to register. It takes 5 minutes to do it and then you can conveniently buy/Sell. Have fun.");
    } else {
      navigate(`/sell/${category.toLowerCase().replace(/\s+/g, '-')}`);
    }
  };

  return (
    <div className="home-container">
      <h2>Welcome to the Auction Site!</h2>
      <p>Select a category to buy or sell items:</p>
      <div className="category-list">
        {categories.map((category) => (
          <div key={category} className="category-card">
            <h3>{category}</h3>
            <Link to={`/buy/${category.toLowerCase().replace(/\s+/g, '-')}`} className="home-btn">Buy</Link>
            <button
              className="home-btn"
              onClick={(e) => handleSellClick(category, e)}
            >
              Sell
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
