import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Header() {
    const location = useLocation();
    const { cart } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // This condition will hide the text only on the cooking-interest page
    const hideUnderConstruction = ['/', '/cooking-interest', '/contact', '/contact/recall'].includes(location.pathname);

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #ddd' }}>
            <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold',  }}><img
                src="/indi1.2.png"
                alt="Indiska SpiceNord"
                style={{ height: '50px' }} // Adjust height as needed
            /></Link>
            {!hideUnderConstruction && (
                <div className="text-4xl text-amber-700">Webbplatsen är under uppbyggnad</div>
            )}
            <Link to="/cart" style={{ textDecoration: 'none' }}>
                🛒 Cart ({totalItems})
            </Link>

        </header>

    );
}