// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OrderOnline from './pages/OrderOnline';
import CookingInterest from './pages/CookingInterest';
import Contact from './pages/ContactUs';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/order" element={<OrderOnline />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cooking-interest" element={<CookingInterest />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </>
    );
}

export default App;
