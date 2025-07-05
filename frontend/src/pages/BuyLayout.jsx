import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './BuyLayout.css';

const categories = [
  'Electronics', 'Jewelry', 'Antiques', 'Watches', 'Home & Garden', 'Automobiles'
];

export default function BuyLayout() {
  return (
    <div className="buy-layout">
      <aside className="sidebar">
        <h3>Categories</h3>
        <ul>
          {categories.map(cat => (
            <li key={cat}>
              <Link to={`/buy/${cat.toLowerCase().replace(/\s+/g, '-')}`}>{cat}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="buy-content">
        <Outlet />
      </main>
    </div>
  );
}

