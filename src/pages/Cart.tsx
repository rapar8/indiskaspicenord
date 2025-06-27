import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const GITHUB_IMAGES_BASE_URL =
    'https://raw.githubusercontent.com/rapar8/indiskaspicenord/main/images/';

export default function Cart() {
    const {
        cart,
        updateQuantity,
        removeFromCart,
    } = useCart();

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (cart.length === 0) {
        return (
            <div style={{ padding: '2rem' }}>
                <h2>Your Cart is Empty</h2>
                <Link to="/order-online">Back to Shop</Link>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Your Cart</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr style={{ borderBottom: '1px solid #ccc' }}>
                    <th style={{ textAlign: 'left' }}>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>
                {cart.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '1rem 0' }}>
                            <img
                                src={GITHUB_IMAGES_BASE_URL + item.image}
                                alt={item.name}
                                style={{ width: '60px', marginRight: '1rem', verticalAlign: 'middle' }}
                            />
                            {item.name}
                        </td>
                        <td>
                            <button className="button-compact" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                                -
                            </button>
                            <span style={{ margin: '0 0.5rem' }}>{item.quantity}</span>
                            <button className="button-compact" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </td>
                        <td>{(item.price * item.quantity).toFixed(2)}</td>
                        <td>
                            <button className="button-compact" onClick={() => removeFromCart(item.id)}>🗑</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h3>Total: {total.toFixed(2)} kr</h3>

            {/* Placeholder for next step: checkout options */}
            <div style={{ marginTop: '1rem' }}>
                <Link to="/checkout">
                    <button style={{ padding: '0.5rem 1rem' }}>Proceed to Checkout</button>
                </Link>
            </div>
        </div>
    );
}
