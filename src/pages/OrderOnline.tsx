import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import FlashMessage from '../components/FlashMessage';

const GITHUB_IMAGES_BASE_URL = 'https://raw.githubusercontent.com/rapar8/indiskaspicenord/main/images/';

type Product = {
    id: number;
    name: string;
    image: string | null;
    price: number;
    category: string | null;
};

const ITEMS_PER_PAGE = 20;

export default function OrderOnline() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const { addToCart } = useCart();
    const [flashMessage, setFlashMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            let query = supabase
                .from('products')
                .select('id, name, price, image, category')
                .order('id', { ascending: true })
                .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);

            if (searchQuery.trim() !== '') {
                query = query.ilike('name', `%${searchQuery.trim()}%`);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching products:', error.message);
            } else {
                setProducts(data || []);
                setHasMore((data?.length || 0) === ITEMS_PER_PAGE);
            }

            setLoading(false);
        };

        fetchProducts();
    }, [page, searchQuery]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setPage(1); // reset to first page when search changes
    };

    const handleAddToCart = (product: Product) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
        });

        setFlashMessage(`${product.name} added to cart!`);
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* Sidebar - Static categories */}
            <aside style={{ width: '200px', padding: '1rem', borderRight: '1px solid #ccc' }}>
                <h3>Categories</h3>
                <ul>
                    <li>All</li>
                    <li>Spices</li>
                    <li>Snacks</li>
                    <li>Pulses</li>
                </ul>
            </aside>

            <main style={{ flexGrow: 1, padding: '1rem' }}>
                <h2>Products</h2>

                {/* Search Box */}
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
                />

                {loading ? (
                    <p>Loading...</p>
                ) : products.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    <>
                        {flashMessage && (
                            <FlashMessage message={flashMessage} onClose={() => setFlashMessage(null)} />
                        )}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                            {products.map(product => (
                                <div
                                    key={product.id}
                                    style={{
                                        border: '1px solid #ccc',
                                        padding: '1rem',
                                        width: '213px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        height: '100%', // ensure stretch
                                        minHeight: '320px', // force consistent height
                                    }}
                                >
                                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <img
                                            src={GITHUB_IMAGES_BASE_URL + product.image}
                                            alt={product.name}
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                        <h4
                                            style={{
                                                margin: '0.5rem 0',
                                                minHeight: '3em', // Optional: space for at least 2 lines
                                            }}
                                        >
                                            {product.name}
                                        </h4>
                                    </Link>

                                    {/* PUSH THIS SECTION TO BOTTOM */}
                                    <div
                                        style={{
                                            marginTop: 'auto',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <span>{product.price} kr</span>
                                        <button onClick={() => handleAddToCart(product)}>Add</button>
                                    </div>
                                </div>

                            ))}

                        </div>

                        {/* Pagination Controls */}
                        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                            >
                                Previous
                            </button>
                            <span>Page {page}</span>
                            <button
                                disabled={!hasMore}
                                onClick={() => setPage(p => p + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </main>
        </div>
    );


}
