//src/pages/OrderOnine.tsx
import { useEffect, useState, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import FlashMessage from '../components/FlashMessage';

const GITHUB_IMAGES_BASE_URL = 'https://raw.githubusercontent.com/rapar8/indiskaspicenord/main/images/';
const ITEMS_PER_PAGE = 20;

type Product = {
    id: number;
    name: string;
    image: string | null;
    price: number;
    category: string | null;
};

export default function OrderOnline() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const [showCategories, setShowCategories] = useState(false); // State to control category menu visibility
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // State for selected category
    const { addToCart } = useCart();
    const [flashMessage, setFlashMessage] = useState<string | null>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    // Fetch categories dynamically
    const [categories, setCategories] = useState<string[]>([]);
    useEffect(() => {
        const fetchCategories = async () => {
            const { data, error } = await supabase
                .from('product_categories')
                .select('category');
            if (error) {
                console.error('Error fetching categories:', error.message);
            } else {
                // Ensure categories are unique and sorted alphabetically
                const uniqueCategories = Array.from(new Set(data.map(item => item.category as string)))
                    .sort((a, b) => a.localeCompare(b));
                setCategories(uniqueCategories);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            let query = supabase
                .from('products')
                .select('id, name, price, image, category')
                .order('id', { ascending: true })
                .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);

            if (searchQuery) {
                query = query.ilike('name', `%${searchQuery}%`);
            }
            if (selectedCategory) {
                query = query.eq('category', selectedCategory);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching products:', error.message);
                setProducts([]);
                setHasMore(false);
            } else {
                setProducts(data || []);
                setHasMore((data && data.length === ITEMS_PER_PAGE) || false);
            }
            setLoading(false);
            // Removed searchRef.current?.focus(); as it can be distracting on every render.
        };

        fetchProducts();
    }, [page, searchQuery, selectedCategory]);

    const handleAddToCart = (product: Product) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
        });
        setFlashMessage(`${product.name} added to cart!`);
        setTimeout(() => setFlashMessage(null), 3000);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setPage(1); // Reset to first page on new search
    };

    const handleCategoryClick = (category: string | null) => { // Allow null for "All Products"
        setSelectedCategory(category);
        setPage(1); // Reset to first page on category change
        setShowCategories(false); // Hide menu after selection
    };

    const clearCategoryFilter = () => {
        setSelectedCategory(null);
        setPage(1);
        setShowCategories(false);
    };

    return (
        // The overall container for the page content. No pt-x needed here because App.tsx handles it now.
        <div className="container mx-auto p-4">
            {flashMessage && <FlashMessage message={flashMessage} onClose={() => setFlashMessage(null)} />}

            {/* Mobile Category Toggle and Search */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <button
                    onClick={() => setShowCategories(!showCategories)}
                    // Added text-white here for visibility if bg is blue
                    className="sm:hidden px-4 py-2 bg-blue-500 text-white rounded mb-2 sm:mb-0 hover:bg-blue-600 transition"
                >
                    ☰ Categories
                </button>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    ref={searchRef}
                    className="w-full sm:w-auto p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                {/* Collapsible Category Menu for Mobile, always visible on larger screens */}
                <aside className={`w-full sm:w-1/4 bg-gray-100 p-4 rounded ${showCategories ? 'block' : 'hidden'} sm:block`}>

                    <ul>
                        <li className="mb-2">
                            <button
                                onClick={clearCategoryFilter}
                                className={`text-blue-600 hover:underline ${!selectedCategory ? 'font-bold text-blue-800' : ''}`}
                                // Changed className to be a full Tailwind button styling
                                // Added `w-full text-left` to make buttons fill space and align left
                                style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem 0' }}
                            >
                                All Products
                            </button>
                        </li>
                        {categories.map((category) => (
                            <li key={category} className="mb-2">
                                <button
                                    onClick={() => handleCategoryClick(category)}
                                    className={`text-blue-600 hover:underline ${selectedCategory === category ? 'font-bold text-blue-800' : ''}`}
                                    // Changed className to be a full Tailwind button styling
                                    style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem 0' }}
                                >
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Main Content - Products Display */}
                <main className="flex-1">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Products</h2> {/* Added text-gray-800 for visibility */}
                    {loading ? (
                        <p className="text-center text-gray-600">Loading products...</p>
                    ) : products.length === 0 ? (
                        <p className="text-center text-gray-600">No products found.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="border border-gray-200 p-4 rounded-lg shadow-md flex flex-col w-full bg-white
                                               hover:border-blue-500 hover:shadow-lg transition-all duration-200 ease-in-out" // Added bg-white
                                >
                                    <Link to={`/product/${product.id}`} className="flex-grow flex flex-col items-center"> {/* Added flex and items-center for image centering */}
                                        <img
                                            src={GITHUB_IMAGES_BASE_URL + product.image}
                                            alt={product.name}
                                            className="w-full h-40 object-contain mb-4 rounded-md" // Changed object-cover to object-contain to prevent cropping
                                        />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{product.name}</h3> {/* Added text-center */}
                                    </Link>
                                    <div className="text-base mt-auto flex justify-between items-center pt-2 w-full">
                                        <span className="font-boldtext-gray-700">{product.price} kr</span>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="mt-6 flex justify-center items-center space-x-4">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
                        >
                            Previous
                        </button>
                        <span className="text-lg text-gray-700">Page {page}</span>
                        <button
                            disabled={!hasMore}
                            onClick={() => setPage(p => p + 1)}
                            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
                        >
                            Next
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}