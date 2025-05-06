/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
    FaShoppingCart,
    FaBars,
    FaTimes,
    FaSearch,
    FaUser,
    FaChevronRight,
    FaSignOutAlt
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; // Importamos Link para navegación
import '../assets/Navbar.css';

function Navbar({ onLogout }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <>
            {/* Navbar Principal */}
            <motion.nav
                className={`navbar ${scrolled ? 'scrolled' : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <div className="navbar-container">
                    <div className="navbar-brand">
                        <motion.button className="menu-button" onClick={toggleSidebar} whileTap={{ scale: 0.9 }}>
                            <FaBars />
                        </motion.button>
                        <motion.div className="logo" whileHover={{ scale: 1.05 }}>
                            <span>Quick</span>
                            <span>Delivery</span>
                        </motion.div>
                    </div>

                    <motion.div className="search-bar" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                        <FaSearch className="search-icon" />
                        <input type="text" placeholder="Buscar restaurantes..." />
                    </motion.div>

                    <ul className="nav-links">
                        <motion.li whileHover={{ y: -2 }}>
                            <a href="#">
                                <FaUser />
                                <span>Mi cuenta</span>
                            </a>
                        </motion.li>
                        <motion.li
                            className="cart"
                            whileHover={{ y: -2 }}
                            animate={{ scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 3 } }}
                        >
                            <Link to="/carrito" className="cart-link">
                                <FaShoppingCart className="cart-icon" />
                                <span className="cart-text">Carrito</span>
                                <motion.span
                                    className="cart-badge"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                >
                                    3
                                </motion.span>
                            </Link>
                        </motion.li>

                        {/* Botón de cerrar sesión */}
                        <motion.li whileHover={{ y: -2 }}>
                            <button className="logout-button-navbar" onClick={onLogout}>
                                <FaSignOutAlt className="logout-icon" />
                                <span>Cerrar sesión</span>
                            </button>
                        </motion.li>
                    </ul>
                </div>
            </motion.nav>

            {/* Sidebar */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div className="sidebar-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={toggleSidebar} />

                        <motion.div
                            className="sidebar"
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            <div className="sidebar-header">
                                <h2>Menú</h2>
                                <motion.button className="close-sidebar" onClick={toggleSidebar} whileHover={{ rotate: 90 }}>
                                    <FaTimes />
                                </motion.button>
                            </div>

                            <div className="sidebar-sections">
                                <Section title="Categorías" items={['Tecnologia', 'Comida', 'Mascotas', 'Farmacia']} icon="🍔" />
                                <Section title="Mi Cuenta" items={['Carrito', 'Favoritos', 'Direcciones', 'Pagos']} icon="👤" />
                                <Section title="Soporte" items={['Ayuda', 'Chat']} icon="🛟" />
                            </div>

                            {/* Agregar enlace al carrito en el Sidebar */}
                            <motion.div
                                className="sidebar-section"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 }}
                            >
                                <Link to="/carrito">
                                    <FaShoppingCart className="sidebar-icon" />
                                    Carrito
                                    <FaChevronRight className="link-arrow" />
                                </Link>
                            </motion.div>

                            {/* Cerrar Sesión */}
                            <motion.div
                                className="logout-container"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <button className="logout-button" onClick={onLogout}>
                                    <FaSignOutAlt className="logout-icon" />
                                    Cerrar sesión
                                </button>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

function Section({ title, items, icon }) {
    return (
        <div className="sidebar-section">
            <motion.h3 initial={{ x: -20 }} animate={{ x: 0 }} transition={{ delay: 0.1 }}>
                <span className="section-icon">{icon}</span>
                {title}
            </motion.h3>
            <ul>
                {items.map((item, index) => (
                    <motion.li key={item} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + index * 0.05 }}>
                        <a href="#">
                            {item}
                            <FaChevronRight className="link-arrow" />
                        </a>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
}

export default Navbar;
