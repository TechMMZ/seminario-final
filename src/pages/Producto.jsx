import React from 'react';
import { Link } from 'react-router-dom';

const Producto = () => {
    return (
        <div className="w-full">

            {/* Categorías */}
            <section className="py-12 px-6" id="categorias">
                <h2 className="text-3xl font-bold text-center mb-10">Categorías</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { name: "Tecnología", icon: "💻", path: "/tecnologia", description: "Encuentra los mejores gadgets y dispositivos electrónicos." },
                        { name: "Comida", icon: "🍔", path: "/comida", description: "Disfruta de los mejores platos y comida de calidad." },
                        { name: "Mascotas", icon: "🐶", path: "/mascotas", description: "Todo lo necesario para tus amigos peludos." },
                        { name: "Farmacia", icon: "💊", path: "/farmacia", description: "Productos de salud y bienestar para ti y tu familia." }
                    ].map((category, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                            <Link to={category.path} className="flex flex-col items-center mb-4">
                                <div className="text-5xl mb-3">{category.icon}</div>
                                <h3 className="text-xl font-semibold">{category.name}</h3>
                            </Link>
                            <p className="text-gray-600">{category.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Submenú explicativo */}
            <section className="py-12 px-6 bg-gray-50" id="submenu">
                <h2 className="text-3xl font-bold text-center mb-10">¿Qué ofrecemos?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            title: "Tecnología",
                            text: "Desde smartphones, computadoras, hasta gadgets innovadores. Descubre productos que mejoran tu día a día."
                        },
                        {
                            title: "Comida",
                            text: "Disfruta de un menú delicioso que incluye opciones saludables, rápidas y sabrosas para todos los gustos."
                        },
                        {
                            title: "Mascotas",
                            text: "Encuentra comida, juguetes y artículos de cuidado para tus mascotas, para que siempre estén felices y saludables."
                        },
                        {
                            title: "Farmacia",
                            text: "Productos farmacéuticos esenciales para tu salud, suplementos y productos de cuidado personal a tu alcance."
                        }
                    ].map((item, index) => (
                        <div key={index} className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Preguntas Frecuentes */}
            <section className="py-12 px-6" id="faq">
                <h2 className="text-3xl font-bold text-center mb-10">Preguntas Frecuentes</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            question: "¿Cómo realizar un pedido?",
                            answer: "Simplemente selecciona la categoría de productos que deseas, agrega los productos a tu carrito y sigue el proceso de pago."
                        },
                        {
                            question: "¿Puedo devolver un producto?",
                            answer: "Sí, si el producto no cumple con tus expectativas o está defectuoso, puedes devolverlo siguiendo nuestra política de devoluciones."
                        },
                        {
                            question: "¿Cuánto tiempo tarda el envío?",
                            answer: "Los envíos pueden tardar entre 1 y 5 días hábiles, dependiendo de tu ubicación."
                        }
                    ].map((faq, index) => (
                        <div key={index} className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                            <p className="text-gray-600">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Producto;
