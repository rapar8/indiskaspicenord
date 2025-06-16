import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Header() {
    const { cart } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #ccc' }}>
            <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Indiska Spice Nord</Link>
            <Link to="/cart" style={{ textDecoration: 'none' }}>
                🛒 Cart ({totalItems})
            </Link>
        </header>
    );
}
