/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, Facebook, User, ChevronDown, ChevronUp } from "lucide-react";
import { FaSearch, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useAuth } from '../../context/AuthContext';
import Cart from '../../pages/Cart';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showCategorias, setShowCategorias] = useState(false);
    const [showOpciones, setShowOpciones] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [showCart, setShowCart] = useState(false);
    const { user } = useAuth();

    const toggleMenu = () => setMenuOpen(!menuOpen);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [menuOpen]);

    return (
        <header className="bg-white shadow-md h-25">
            <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">

                {/* Botón Hamburguesa */}
                <button onClick={toggleMenu}>
                    <Menu />
                </button>

                {/* Logo */}
                <Link to='/' className="text-2xl font-bold">
                    <span className="text-black">Quick</span>
                    <span className="text-blue-600">Delivery</span>
                </Link>

                {/* BUSCADOR */}
                <motion.div
                    className="hidden md:flex items-center space-x-2 w-80 bg-gray-100 rounded-full px-4 py-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <FaSearch className="text-blue-600" />
                    <input
                        type="text"
                        placeholder="Buscar restaurantes..."
                        className="bg-transparent w-full outline-none text-gray-900"
                    />
                </motion.div>

                {/* Íconos + botón hamburguesa en móvil */}
                <div className="flex items-center space-x-4 md:hidden">
                    <button>
                        <FaSearch className="w-5 h-5 hover:text-black" />
                    </button>
                    {user ? (
                        <Link to="/perfil">
                            <User className="w-5 h-5 hover:text-black" />
                        </Link>
                    ) : (
                        <Link to="/login">
                            <User className="w-5 h-5 hover:text-black" />
                        </Link>
                    )}
                    <button onClick={() => setShowCart(true)}>
                        <ShoppingCart className="w-5 h-5 hover:text-black" />
                    </button>
                </div>

                {/* Menú navegación escritorio */}
                <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
                    {/* Categorías */}
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <button className="hover:text-black">Categorías</button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                            <DropdownMenu.Content className="bg-white shadow-lg rounded-md p-2 space-y-1 text-sm text-gray-800" sideOffset={5}>
                                <DropdownMenu.Item className="px-3 py-1 hover:bg-gray-100 cursor-pointer" onSelect={() => navigate('/tecnologia')}>Tecnologia</DropdownMenu.Item>
                                <DropdownMenu.Item className="px-3 py-1 hover:bg-gray-100 cursor-pointer" onSelect={() => navigate('/comida')}>comida</DropdownMenu.Item>
                                <DropdownMenu.Item className="px-3 py-1 hover:bg-gray-100 cursor-pointer" onSelect={() => navigate('/mascotas')}>Mascotas</DropdownMenu.Item>
                                <DropdownMenu.Item className="px-3 py-1 hover:bg-gray-100 cursor-pointer" onSelect={() => navigate('/farmacia')}>Farmacia</DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>

                    {user ? (
                        <Link to="/perfil">
                            <User className="w-5 h-5 hover:text-black" />
                        </Link>
                    ) : (
                        <Link to="/login">
                            <User className="w-5 h-5 hover:text-black" />
                        </Link>
                    )}

                    {/* Carrito */}
                    <button onClick={() => setShowCart(true)}>
                        <ShoppingCart className="w-5 h-5 hover:text-black" />
                    </button>
                </nav>

                {/* Menú móvil desplegable */}
                {menuOpen && (
                    <>
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setMenuOpen(false)} />
                        <div className="fixed top-0 left-0 h-full w-64 bg-neutral-50 shadow-lg z-50 p-6 flex flex-col justify-between font-medium text-gray-800">
                            <div className="space-y-6">
                                <div className="flex justify-start">
                                    <button onClick={() => setMenuOpen(false)}>
                                        <X className="w-6 h-6 text-gray-600 hover:text-black" />
                                    </button>
                                </div>

                                {/* Logo */}
                                <Link to='/' className="text-2xl font-bold" onClick={() => setMenuOpen(false)}>
                                    <span className="text-black">Quick</span><span className="text-blue-600">Delivery</span>
                                </Link>

                                <div className="h-6" />

                                {/* Categorías */}
                                <div>
                                    <button onClick={() => setShowCategorias(!showCategorias)} className="flex items-center justify-between w-full px-2 py-1 hover:bg-gray-100 rounded">
                                        Categorías
                                        {showCategorias ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>
                                    {showCategorias && (
                                        <div className="pl-4 mt-2 space-y-2">
                                            <Link to="/tecnologia" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">Tecnologia</Link>
                                            <Link to="/comida" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">Comida</Link>
                                            <Link to="/mascotas" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">Mascotas</Link>
                                            <Link to="/farmacia" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">Farmacia</Link>
                                        </div>
                                    )}
                                </div>

                                {/* Opciones */}
                                <div>
                                    <button onClick={() => setShowOpciones(!showOpciones)} className="flex items-center justify-between w-full px-2 py-1 hover:bg-gray-100 rounded">
                                        Opciones
                                        {showOpciones ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>
                                    {showOpciones && (
                                        <div className="pl-4 mt-2 space-y-2">
                                            <Link to="/account" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">Mi Cuenta</Link>
                                            <button onClick={() => { console.log('Cerrar sesión'); setMenuOpen(false); }} className="block text-red-600 hover:text-red-800">Cerrar sesión</button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Redes sociales */}
                            <div className="flex justify-center space-x-6 pt-6 border-t mt-6">
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram className="w-5 h-5" /></a>
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><Facebook className="w-5 h-5" /></a>
                                <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer"><FaWhatsapp className="w-5 h-5" /></a>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
        </header>
    )
}

export default Navbar;