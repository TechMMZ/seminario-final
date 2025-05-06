import React, { useState } from 'react';

function Tecnologia() {
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [cart, setCart] = useState([]);

    const categories = ['Todos', 'Smartphones', 'Laptops', 'Tablets', 'Accesorios'];
    const products = [
        { id: 1, name: 'iPhone 13', category: 'Smartphones', price: 999, img: '../img/iphone 13.png', stock: 5 },
        { id: 2, name: 'MacBook Air', category: 'Laptops', price: 1199, img: '../img/macbook air .png', stock: 3 },
        { id: 3, name: 'iPad Pro', category: 'Tablets', price: 799, img: '../img/ipad pro.png', stock: 4 },
        { id: 4, name: 'Apple Watch', category: 'Accesorios', price: 399, img: '../img/apple watch.jpg', stock: 6 },
    ];

    const filteredProducts =
        selectedCategory === 'Todos'
            ? products
            : products.filter(product => product.category === selectedCategory);

    const handleAddToCart = (product) => {
        if (product.stock <= 0) return alert('Producto sin stock');

        const updatedCart = [...cart];
        const existing = updatedCart.find(item => item.id === product.id);

        if (existing) {
            existing.qty += 1;
        } else {
            updatedCart.push({ ...product, qty: 1 });
        }

        setCart(updatedCart);
        alert(`${product.name} añadido al carrito`);
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Encabezado */}
            <header className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-2">Tecnología</h2>
                <p className="text-gray-600">Explora nuestros últimos dispositivos y gadgets tecnológicos, entregados directamente en tu puerta.</p>
            </header>

            {/* Categorías arriba */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`px-4 py-2 rounded-full border ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-blue-100'} transition`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Productos + Carrito */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Sección de productos */}
                <section className="md:col-span-2 grid sm:grid-cols-2 gap-6">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="border rounded-xl p-4 flex flex-col items-center shadow hover:shadow-lg transition">
                            <img src={product.img} alt={product.name} className="w-32 h-32 object-cover mb-4" />
                            <h4 className="text-lg font-semibold mb-1">{product.name}</h4>
                            <p className="text-blue-600 font-bold mb-1">${product.price}</p>
                            <p className="text-sm text-gray-500 mb-4">Stock: {product.stock}</p>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                                onClick={() => handleAddToCart(product)}
                            >
                                Añadir al carrito
                            </button>
                        </div>
                    ))}
                </section>

                {/* Vista previa del carrito */}
                <section className="border rounded-xl p-4 shadow h-fit">
                    <h3 className="text-2xl font-semibold mb-4">Carrito</h3>
                    {cart.length === 0 ? (
                        <p className="text-gray-500">Tu carrito está vacío.</p>
                    ) : (
                        <>
                            <ul className="space-y-2 mb-4">
                                {cart.map((item, index) => (
                                    <li key={index} className="text-gray-700">
                                        {item.name} x{item.qty} - <span className="font-semibold">${item.price * item.qty}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-lg font-bold">
                                Total: <span className="text-blue-600">${total.toFixed(2)}</span>
                            </p>
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Tecnologia;
