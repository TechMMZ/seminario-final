import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Cart from '../pages/Cart';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { Search as SearchIcon } from 'lucide-react';
import { ShoppingCart, User, Menu, X, Facebook } from 'lucide-react';
import SearchPanel from './SearchPanel';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [showCart, setShowCart] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [menuOpen]);

    // const handleLogout = () => {
    //     logout();
    //     navigate("/login");
    // };

    const handleLogout = () => {
        logout();
        sessionStorage.setItem("justLoggedOut", "true");
        navigate("/login");
    };

    return (
        <header className="bg-white shadow-md h-20">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="font-bold text-2xl">
                    <img
                        src="/logos/LOGO_SUNCITY_black_.png"
                        alt="LOGO SUNCITY"
                        className="h-10 w-auto"
                    />
                </Link>

                {/* Íconos + botón hamburguesa en móvil */}
                {/* Botón de búsqueda */}
                <div className="flex items-center space-x-4 md:hidden">
                    <button onClick={() => setSearchOpen(true)}>
                        <SearchIcon className="w-5 h-5 hover:text-black" />
                    </button>

                    {user ? (
                        <>
                            <button onClick={() => navigate("/profile")}>
                                <User className="w-5 h-5 hover:text-black" />
                            </button>
                            <button onClick={handleLogout}>
                                <X className="w-5 h-5 hover:text-black" />
                            </button>
                        </>
                    ) : (
                        <Link to="/login">
                            <User className="w-5 h-5 hover:text-black" />
                        </Link>
                    )}

                    <button onClick={() => setShowCart(true)}>
                        <ShoppingCart className="w-5 h-5 hover:text-black" />
                    </button>
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Menú navegación escritorio */}
                <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
                    <Link to="/shop" className="hover:text-black">Tienda</Link>
                    <Link to="/new" className="hover:text-black">Lo Nuevo</Link>
                    <Link to="/bestsellers" className="hover:text-black">Más vendidos</Link>
                    <Link to="/final-sale" className="hover:text-red-600 font-semibold">FINAL SALE</Link>
                </nav>

                {/* Íconos escritorio */}
                {/* Botón de búsqueda */}
                <div className="hidden md:flex items-center space-x-4 text-gray-700">
                    <button onClick={() => setSearchOpen(true)}>
                        <SearchIcon className="w-5 h-5 hover:text-black" />
                    </button>

                    {user ? (
                        <>
                            <button onClick={() => navigate("/profile")}>
                                <User className="w-5 h-5 hover:text-black" />
                            </button>
                            <button onClick={handleLogout}>
                                <X className="w-5 h-5 hover:text-black" />
                            </button>
                        </>
                    ) : (
                        <Link to="/login">
                            <User className="w-5 h-5 hover:text-black" />
                        </Link>
                    )}

                    <button onClick={() => setShowCart(true)}>
                        <ShoppingCart className="w-5 h-5 hover:text-black" />
                    </button>
                </div>
            </div>

            {/* Menú móvil desplegable */}
            {menuOpen && (
                <>
                    {/* Overlay oscuro con opacidad */}
                    {menuOpen && (
                        <div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
                            onClick={() => setMenuOpen(false)}
                            aria-hidden="true"
                        />
                    )}

                    {/* Menú lateral */}
                    <div className="fixed top-0 right-0 h-full w-64 bg-neutral-50 shadow-lg z-50 p-6 flex flex-col justify-between font-medium text-gray-800 transition-transform duration-300">

                        {/* Menú principal */}
                        <div className="space-y-6">
                            <div className="flex justify-end">
                                <button onClick={() => setMenuOpen(false)}>
                                    <X className="w-6 h-6 text-gray-600 hover:text-black" />
                                </button>
                            </div>
                            <nav className="flex flex-col space-y-2">
                                <Link
                                    to="/"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-2xl font-bold text-black mb-15 cursor-pointer"
                                >
                                    MAX
                                </Link>
                                <Link
                                    to="/shop"
                                    onClick={() => setMenuOpen(false)}
                                    className={`px-2 py-1 rounded-md font-semibold transition-colors ${location.pathname === '/shop'
                                        ? 'bg-gray-200 text-black'
                                        : 'hover:bg-gray-200 hover:text-black'
                                        }`}
                                >
                                    Tienda
                                </Link>
                                <Link
                                    to="/new"
                                    onClick={() => setMenuOpen(false)}
                                    className={`px-2 py-1 rounded-md font-semibold transition-colors ${location.pathname === '/new'
                                        ? 'bg-gray-200 text-black'
                                        : 'hover:bg-gray-200 hover:text-black'
                                        }`}
                                >
                                    Lo Nuevo
                                </Link>
                                <Link
                                    to="/bestsellers"
                                    onClick={() => setMenuOpen(false)}
                                    className={`px-2 py-1 rounded-md font-semibold transition-colors ${location.pathname === '/bestsellers'
                                        ? 'bg-gray-200 text-black'
                                        : 'hover:bg-gray-200 hover:text-black'
                                        }`}
                                >
                                    Más vendidos
                                </Link>
                                <Link
                                    to="/final-sale"
                                    onClick={() => setMenuOpen(false)}
                                    className={`px-2 py-1 rounded-md font-bold transition-colors ${location.pathname === '/final-sale'
                                        ? 'bg-red-100 text-red-700'
                                        : 'text-red-600 hover:bg-red-100 hover:text-red-700'
                                        }`}
                                >
                                    FINAL SALE
                                </Link>
                            </nav>
                        </div>

                        {/* Redes sociales */}
                        <div className="flex justify-center space-x-6 pt-6 border-t mt-6">
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500">
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-500">
                                <FaWhatsapp className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </>
            )}
            <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
            <SearchPanel isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </header>
    );
};


export default Navbar;
