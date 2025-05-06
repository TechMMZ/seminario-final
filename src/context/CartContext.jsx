/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    getCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart as clearCartStorage,
    saveCart,
} from '../services/cartService';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = getCart();
        setCartItems(savedCart);
    }, []);

    const addItem = (product) => {
        const updatedCart = addToCart(product);
        setCartItems(updatedCart);
    };

    const removeItem = (productId) => {
        const updatedCart = removeFromCart(productId);
        setCartItems(updatedCart);
    };

    const updateItemQuantity = (productId, cantidad) => {
        const updatedCart = updateQuantity(productId, cantidad);
        setCartItems(updatedCart);
    };

    const clearCart = () => {
        clearCartStorage();
        setCartItems([]);
    };

    // const total = cartItems.reduce((acc, item) => acc + (item.precio * item.quantity), 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addItem,
                removeItem,
                updateItemQuantity,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);