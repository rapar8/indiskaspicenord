import { Link } from 'react-router-dom';

export default function Header() {

    return (
        <footer className="mt-10 text-sm text-gray-600 space-y-1">
            <p></p>
            <p>🕒 Open: Weekdays: 8:30 - 19:30
                   & Weekends: 10:30 - 19:30</p>
            <p>📧 <Link to="/contact" className="text-blue-600 underline">Contact Us</Link></p>
        </footer>

    );
}