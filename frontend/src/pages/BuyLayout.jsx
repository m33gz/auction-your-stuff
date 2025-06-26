import React from 'react';
import { Outlet } from 'react-router-dom';
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
            <li key={cat}>{cat}</li>
          ))}
        </ul>
      </aside>
      <main className="buy-content">
        <Outlet /> {/* Nested route content goes here */}
      </main>
    </div>
  );
}
