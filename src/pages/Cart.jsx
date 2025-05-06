/* eslint-disable no-unused-vars */
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CartContext } from '../context/CartContext'; // Asegúrate de importar el CartContext
import { ChevronLeft, Trash2, Plus, Minus, X, ShoppingBag } from 'react-feather'; // O los iconos que uses
import { useNavigate } from 'react-router-dom';

const Cart = ({ isOpen, onClose }) => {

    const { cartItems, removeItem, updateItemQuantity, clearCart } = useContext(CartContext);
    const { user } = useAuth();
    const navigate = useNavigate();
    // Calcular el total
    const total = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const cantidadTotal = cartItems.reduce((acc, item) => acc + item.cantidad, 0);
    const [notaPedido, setNotaPedido] = useState('');

    // Bloquear scroll del body cuando el carrito está abierto
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const aumentarCantidad = (id) => {
        const item = cartItems.find((producto) => producto.id === id);
        if (item) {
            updateItemQuantity(id, item.cantidad + 1);
        }
    };

    const disminuirCantidad = (id) => {
        const item = cartItems.find((producto) => producto.id === id);
        if (item && item.cantidad > 1) {
            updateItemQuantity(id, item.cantidad - 1);
        }
    };

    const eliminarProducto = (id) => {
        removeItem(id);
    };

    // const finalizarCompra = () => {
    //     alert('Proceso de compra finalizado');
    //     clearCart();
    //     onClose();
    // };

    const finalizarCompra = () => {
        if (!user) {
            alert('Debes iniciar sesión para finalizar la compra.');
            onClose();
            navigate('/login');
            return;
        }

        // clearCart();
        onClose(); // Cierra el carrito
        navigate('/checkout'); // Redirige al checkout
    };

    return (
        <Fragment>
            {/* Overlay con animación de fade */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Panel lateral con animación mejorada */}
            <div
                className={`fixed top-0 right-0 h-full w-full md:w-96 max-w-full bg-white shadow-xl z-50 transform transition-all duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    } flex flex-col`}
                aria-modal="true"
                role="dialog"
                aria-labelledby="cart-heading"
            >
                {/* Encabezado con mejor espaciado y diseño */}
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={onClose}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Cerrar carrito"
                        >
                            <ChevronLeft size={20} className="text-gray-500" />
                        </button>
                        <h2
                            id="cart-heading"
                            className="text-lg font-medium text-gray-900 flex items-center"
                        >
                            Tu carrito
                            {cantidadTotal > 0 && (
                                <span className="ml-2 text-sm font-medium text-gray-500">
                                    ({cantidadTotal} {cantidadTotal === 1 ? 'artículo' : 'artículos'})
                                </span>
                            )}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Cerrar carrito"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Contenido del carrito con mejores espacios y estilo */}
                {cartItems.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                            <ShoppingBag size={28} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">Tu carrito está vacío</h3>
                        <p className="text-sm text-gray-500 max-w-xs">
                            Parece que no has agregado ningún producto a tu carrito todavía.
                        </p>
                        <button
                            onClick={onClose}
                            className="mt-6 px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Continuar comprando
                        </button>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto">
                        <ul className="divide-y divide-gray-200">
                            {cartItems.map((producto, index) => (
                                <li key={index} className="px-4 sm:px-6 py-5">
                                    <div className="flex gap-4">
                                        {/* Imagen del producto con mejor presentación */}
                                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                                            <img
                                                src={producto.img}
                                                alt={producto.nombre}
                                                className="h-full w-full object-contain object-center p-1"
                                            />
                                        </div>

                                        {/* Información del producto */}
                                        <div className="flex flex-1 flex-col">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3 className="line-clamp-2 text-sm">{producto.nombre}</h3>
                                            </div>

                                            <div className="flex items-end justify-between text-sm mt-auto pt-2">
                                                <div className="flex items-center">
                                                    <button
                                                        className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                                                        onClick={() => disminuirCantidad(producto.id)}
                                                        disabled={producto.cantidad <= 1}
                                                        aria-label="Reducir cantidad"
                                                    >
                                                        <Minus size={14} className={producto.cantidad <= 1 ? "text-gray-300" : "text-gray-500"} />
                                                    </button>
                                                    <span className="mx-3 w-5 text-center">{producto.cantidad || 1}</span>
                                                    <button
                                                        className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                                                        onClick={() => aumentarCantidad(producto.id)}
                                                        aria-label="Aumentar cantidad"
                                                    >
                                                        <Plus size={14} className="text-gray-500" />
                                                    </button>
                                                </div>

                                                <div className="flex items-center">
                                                    <p className="font-medium">S/ {(producto.precio * (producto.cantidad || 1)).toFixed(2)}</p>
                                                    <button
                                                        type="button"
                                                        className="ml-4 p-1 text-gray-400 hover:text-gray-500 transition-colors"
                                                        onClick={() => eliminarProducto(producto.id)}
                                                        aria-label={`Eliminar ${producto.nombre} del carrito`}
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Pie del carrito con resumen y checkout */}
                {cartItems.length > 0 && (
                    <div className="border-t border-gray-200 px-4 sm:px-6 py-4">
                        <div className="space-y-4">
                            {/* Nota opcional de pedido con mejor diseño */}
                            <div className="rounded-md border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-gray-400 focus-within:border-transparent">
                                {/* <textarea
                                    className="w-full text-sm text-gray-700 p-3 bg-gray-50 placeholder-gray-400 border-none focus:outline-none resize-none"
                                    placeholder="Añadir instrucciones especiales para tu pedido"
                                    rows={2}
                                ></textarea> */}

                                <textarea
                                    value={notaPedido}
                                    onChange={(e) => setNotaPedido(e.target.value)}
                                    className="w-full text-sm text-gray-700 p-3 bg-gray-50 placeholder-gray-400 border-none focus:outline-none resize-none"
                                    placeholder="Añadir instrucciones especiales para tu pedido"
                                    rows={2}
                                ></textarea>
                            </div>

                            {/* Desglose del costo */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-500">
                                    <p>Subtotal</p>
                                    <p>S/ {total.toFixed(2)}</p>
                                </div>

                                <div className="border-t border-gray-200 pt-2 flex justify-between font-medium text-gray-900">
                                    <p>Total estimado</p>
                                    <p>S/ {total.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="mt-5 space-y-3">
                            <button
                                onClick={finalizarCompra}
                                className="w-full bg-gray-900 border border-transparent rounded-lg py-3 px-4 flex items-center justify-center text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors">
                                CONTINUAR CON LA COMPRA
                            </button>

                            <button
                                onClick={onClose}
                                className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 flex items-center justify-center text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
                            >
                                SEGUIR COMPRANDO
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Fragment >
    );
};

export default Cart;
