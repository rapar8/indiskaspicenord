export type CartItem = {
    id: number;
    name: string;
    price: number;
    image: string | null;
    quantity: number;
};

export type CartContextType = {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    updateQuantity: (id: number, quantity: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
};
