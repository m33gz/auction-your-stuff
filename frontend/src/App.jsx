import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Sell from './pages/Sell';
import Buy from './pages/Buy';
import BuyLayout from './pages/BuyLayout';
import SellCategory from './pages/SellCategory';
import CategoryItems from './pages/CategoryItems'; 
import ItemDetail from './pages/ItemDetail';

function App() {
  return (
    <Router>
      <Header /> {/* Always visible */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/sell/:category" element={<SellCategory />} />
        
        <Route path="/buy" element={<BuyLayout />}>
          <Route index element={<Buy />} /> {/* /buy */}
          <Route path=":category" element={<CategoryItems />} /> {/* /buy/electronics */}
        </Route>

        <Route path="/items/:itemId" element={<ItemDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

