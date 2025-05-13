import React, { useState } from 'react';
import useProducts from '../services/useProducts';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

function Tecnologia() {
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const products = useProducts();
    const categories = ['Todos', ...new Set(products.map(p => p.categoria))];

    // Filtrar productos válidos (con nombre, precio e imagen)
    const filteredProducts = products.filter(product =>
        product.Nombre && product.precio && product.imgUrl
    );

    // Filtrar por categoría seleccionada
    const filteredByCategory = selectedCategory === 'Todos'
        ? filteredProducts
        : filteredProducts.filter(product => product.categoria === selectedCategory);

    // Obtener funciones del contexto de carrito
    const { addItem } = useCart();

    const handleAddToCart = (product) => {
        if (product.stock <= 0) {
            toast.error('Producto sin stock');
            return;
        }

        addItem(product);
        toast.success(`¡${product.Nombre} añadido al carrito! 🛒`);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <header className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-2">Tecnología</h2>
                <p className="text-gray-600">Explora nuestros últimos dispositivos y gadgets tecnológicos, entregados directamente en tu puerta.</p>
            </header>

            {/* Botones de categoría */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`px-4 py-2 rounded-full border transition ${selectedCategory === category
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-blue-100'
                            }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Productos */}
            <div className="grid md:grid-cols-3 gap-6">
                <section className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredByCategory.map(product => (
                        <div
                            key={product.id}
                            className="border rounded-xl p-4 flex flex-col items-center shadow hover:shadow-lg transition"
                        >
                            <img
                                src={product.imgUrl}
                                alt={product.Nombre}
                                className="w-32 h-32 object-cover mb-4"
                            />
                            <h4 className="text-lg font-semibold mb-1">{product.Nombre}</h4>
                            <p className="text-blue-600 font-bold mb-1">${product.precio}</p>
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
            </div>
        </div>
    );
}

export default Tecnologia;
