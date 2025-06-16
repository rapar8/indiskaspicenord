import { createContext, useContext } from 'react';
import type {CartContextType} from "./CartTypes.ts";

export const CartContext = createContext<CartContextType | undefined>(undefined);


export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart.tsx must be used within CartProvider');
    return context;
}
