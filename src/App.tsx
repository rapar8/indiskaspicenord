import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OrderOnline from './pages/OrderOnline';
import CookingInterest from './pages/CookingInterest';
import Contact from './pages/ContactUs';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Header from './components/Header';
import Footer from './components/Footer';
import Checkout from "./pages/Checkout.tsx";
import Recall from './pages/Recall.tsx';

function App() {
    return (
        <div className="flex flex-col min-h-screen"> {/* Ensure the app takes at least the full screen height */}
            <Header />
            {/* This div will contain all page content and will have a top padding to clear the fixed header. */}
            {/* pt-16 (64px) is appropriate for a 60px header with a little extra space. */}
            <div className="flex-grow pt-16">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/order-online" element={<OrderOnline />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cooking-interest" element={<CookingInterest />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/contact/recall" element={<Recall />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;