import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

const GITHUB_IMAGES_BASE_URL = 'https://raw.githubusercontent.com/rapar8/indiskaspicenord/main/images/';

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

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('id, name, price, image, category')
                .order('id', { ascending: true })
                .limit(20); // later: paginate

            if (error) {
                console.error('Error fetching products:', error.message);
            } else {
                setProducts(data);
            }

            setLoading(false);
        };

        fetchProducts();
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            {/* Categories - future implementation */}
            <aside style={{ width: '200px', padding: '1rem', borderRight: '1px solid #ccc' }}>
                <h3>Categories</h3>
                {/* Later: make categories dynamic */}
                <ul>
                    <li>All</li>
                    <li>Spices</li>
                    <li>Snacks</li>
                    <li>Pulses</li>
                </ul>
            </aside>

            <main style={{ flexGrow: 1, padding: '1rem' }}>
                <h2>Products</h2>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {products.map(product => (
                            <div key={product.id} style={{ border: '1px solid #ccc', padding: '1rem', width: '180px' }}>
                                <Link to={`/product/${product.id}`}>
                                    <img
                                        src={GITHUB_IMAGES_BASE_URL + product.image}
                                        alt={product.name}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                    <h4>{product.name}</h4>
                                </Link>
                                <p>Price: {product.price} kr</p>
                                <button>Add to Cart</button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
