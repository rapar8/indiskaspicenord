import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>

            <div style={{ marginTop: '2rem' }}>
                <Link to="/order-online">
                    <button style={{ margin: '1rem', padding: '1rem 2rem' }}>🛒 Order Online</button>
                </Link>

                <Link to="/cooking-interest">
                    <button style={{ margin: '1rem', padding: '1rem 2rem' }}>👩‍🍳 Want to Learn Cooking?</button>
                </Link>
            </div>

            <footer style={{ marginTop: '4rem', fontSize: '0.9rem', color: '#666' }}>
                <p>📍 Regementsvägen 4A, 254 57 Helsingborg</p>
                <p>🕒 Open: Weekdays & Weekends</p>
                <p>📧 <Link to="/contact">Contact Us</Link></p>
            </footer>
        </div>
    );
}
