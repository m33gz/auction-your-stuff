import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BuyLayout from './pages/BuyLayout';
import SellCategory from './pages/SellCategory';
import CategoryItems from './pages/CategoryItems'; 
import ItemDetail from './pages/ItemDetail';
import PlaceBid from './pages/PlaceBid';

function App() {
  return (
    <Router>
      <Header /> {/* Always visible */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Selling route (goes directly to category-based page) */}
        <Route path="/sell/:category" element={<SellCategory />} />

        <Route path="/buy" element={<BuyLayout />}>
          <Route index element={<p>Select a category to begin browsing.</p>} />
          <Route path=":category" element={<CategoryItems />} />
          <Route path="items/:itemId" element={<ItemDetail />} />
          <Route path="items/:itemId/bid" element={<PlaceBid />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;


