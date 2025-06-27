import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white">
            <div className="flex flex-col gap-4 w-full max-w-sm">
                <Link to="/order-online">
                    <button className="w-full py-3 px-6 rounded bg-green-600 text-white text-lg shadow hover:bg-green-700 transition">
                        🛒 Order Online
                    </button>
                </Link>

                <Link to="/cooking-interest">
                    <button className="w-full py-3 px-6 rounded bg-yellow-500 text-white text-lg shadow hover:bg-yellow-600 transition">
                        👩‍🍳 Want to Learn Indian Cooking?
                    </button>
                </Link>
            </div>


        </div>
    );
}
