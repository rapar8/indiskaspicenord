import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const GITHUB_IMAGES_BASE_URL = 'https://raw.githubusercontent.com/rapar8/indiskaspicenord/main/images/';

type Product = {
    id: number;
    name: string;
    image: string | null;
    price: number;
    description: string | null;
    category: string | null;
    // Add more fields if needed later (like youtube_url, nutrition)
};

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('id, name, price, image, description, category')
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

    if (loading) return <p>Loading...</p>;

    if (!product) return <p>Product not found.</p>;

    return (
        <div style={{ padding: '1rem' }}>
            <Link to="/order-online">&larr; Back to products</Link>

            <h2>{product.name}</h2>
            {product.image && (
                <img
                    src={GITHUB_IMAGES_BASE_URL + product.image}
                    alt={product.name}
                    style={{ width: '300px', height: 'auto', marginBottom: '1rem' }}
                />
            )}
            <p><strong>Price:</strong> {product.price} kr</p>
            <p><strong>Category:</strong> {product.category || 'N/A'}</p>

            {product.description && (
                <>
                    <h4>Description & Uses:</h4>
                    <p>{product.description}</p>
                </>
            )}

            {/* Future enhancements like nutrition info or embedded YouTube link can be added here */}
        </div>
    );
}
