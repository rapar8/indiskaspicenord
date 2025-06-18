import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useCart } from '../contexts/useCart';

const GITHUB_IMAGES_BASE_URL = 'https://raw.githubusercontent.com/rapar8/indiskaspicenord/main/images/';

type Product = {
    id: number;
    name: string;
    image: string | null;
    price: number;
    category: string | null;
    description?: string | null;
    uses?: string | null;
    nutrition?: string | null;
    youtube?: string | null;
};

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching product:', error.message);
            } else {
                setProduct(data);
            }

            setLoading(false);
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p style={{ padding: '1rem' }}>Loading product details...</p>;
    if (!product) return <p style={{ padding: '1rem' }}>Product not found.</p>;

    return (
        <div style={{ padding: '2rem' }}>
            <Link to="/order-online">← Back to Products</Link>

            <h2>{product.name}</h2>
            <img
                src={GITHUB_IMAGES_BASE_URL + product.image}
                alt={product.name}
                style={{ maxWidth: '300px', height: 'auto' }}
            />
            <p><strong>Price:</strong> {product.price} kr</p>
            {product.category && <p><strong>Category:</strong> {product.category}</p>}

            {product.description && (
                <p><strong>Description:</strong> {product.description}</p>
            )}

            {product.uses && (
                <p><strong>Uses:</strong> {product.uses}</p>
            )}

            {product.nutrition && (
                <p><strong>Nutrition:</strong> {product.nutrition}</p>
            )}

            {product.youtube && (
                <p>
                    <strong>Video:</strong>{' '}
                    <a href={product.youtube} target="_blank" rel="noopener noreferrer">
                        Watch on YouTube
                    </a>
                </p>
            )}

            <button
                style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
                onClick={() =>
                    addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                    })
                }
            >
                Add to Cart
            </button>
        </div>
    );
}
