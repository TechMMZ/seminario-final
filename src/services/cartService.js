// src/services/cartService.js

const CART_KEY = 'cart';

export const getCart = () => {
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
};

export const saveCart = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (product) => {
    const cart = getCart();
    const existingItem = cart.find((item) => item.id === product.id);

    let updatedCart;
    if (existingItem) {
        updatedCart = cart.map((item) =>
            item.id === product.id
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
        );
    } else {
        updatedCart = [...cart, { ...product, cantidad: 1 }];
    }

    saveCart(updatedCart);
    return updatedCart;
};

export const removeFromCart = (productId) => {
    const cart = getCart();
    const updatedCart = cart.filter((item) => item.id !== productId);
    saveCart(updatedCart);
    return updatedCart;
};

export const clearCart = () => {
    saveCart([]);
};

export const updateQuantity = (productId, cantidad) => {
    const cart = getCart();
    const updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, cantidad } : item
    );
    saveCart(updatedCart);
    return updatedCart;
};
