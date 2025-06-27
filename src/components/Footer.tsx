import { Link } from 'react-router-dom';

export default function Header() {

    return (
        <footer className="mt-10 text-sm text-gray-600 space-y-1">
            <p>📍 Regementsvägen 4A, 254 57 Helsingborg</p>
            <p>🕒 Open: Weekdays & Weekends</p>
            <p>📧 <Link to="/contact" className="text-blue-600 underline">Contact Us</Link></p>
        </footer>

    );
}