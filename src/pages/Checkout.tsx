// src/pages/Checkout.tsx

import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';

// const GITHUB_IMAGES_BASE_URL =
   // 'https://raw.githubusercontent.com/rapar8/indiskaspicenord/main/images/';

export default function Checkout() {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('click-and-collect'); // or 'postnord'
    const [orderPlaced, setOrderPlaced] = useState(false);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !phone) {
            alert('Please fill in all required fields.');
            return;
        }

        // Simulate order submission
        console.log({
            name,
            email,
            phone,
            address: deliveryMethod === 'postnord' ? address : 'N/A',
            deliveryMethod,
            cart,
            total,
        });

        setOrderPlaced(true);

        // Clear cart after order placed
        clearCart();

        // Optionally redirect after a delay
        setTimeout(() => {
            navigate('/');
        }, 4000);
    };

    if (cart.length === 0 && !orderPlaced) {
        return (
            <div style={{ padding: '2rem' }}>
                <h2>Your Cart is Empty</h2>
                <Link to="/order-online">Back to Shop</Link>
            </div>
        );
    }

    if (orderPlaced) {
        return (
            <div style={{ padding: '2rem' }}>
                <h2>Thank you for your order!</h2>
                <p>We have received your order and will contact you shortly.</p>
                <p>Redirecting to home...</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Checkout</h2>

            <h3>Order Summary</h3>
            <ul>
                {cart.map((item) => (
                    <li key={item.id} style={{ marginBottom: '0.5rem' }}>
                        {item.name} x {item.quantity} = {(item.price * item.quantity).toFixed(2)} kr
                    </li>
                ))}
            </ul>
            <h4>Total: {total.toFixed(2)} kr</h4>

            <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                        Name* <br />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem' }}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>
                        Email* <br />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem' }}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>
                        Phone* <br />
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem' }}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>
                        Delivery Method* <br />
                        <select
                            value={deliveryMethod}
                            onChange={(e) => setDeliveryMethod(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem' }}
                        >
                            <option value="click-and-collect">Click and Collect (Pay online)</option>
                            <option value="postnord">Parcel Delivery via PostNord</option>
                        </select>
                    </label>
                </div>

                {deliveryMethod === 'postnord' && (
                    <div style={{ marginBottom: '1rem' }}>
                        <label>
                            Delivery Address* <br />
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required={deliveryMethod === 'postnord'}
                                rows={3}
                                style={{ width: '100%', padding: '0.5rem' }}
                            />
                        </label>
                    </div>
                )}

                <button type="submit" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
                    Place Order
                </button>
            </form>
        </div>
    );
}
