import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../../services/orderService';

const Perfil = () => {
    const { user, logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('cuenta');
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                setLoading(true);
                try {
                    const userOrders = await getOrders(user.uid);
                    setOrders(Array.isArray(userOrders) ? userOrders : []);
                } catch (error) {
                    console.error("Error al cargar pedidos:", error);
                    setOrders([]);
                }
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
                    <h1 className="text-2xl font-semibold text-gray-700">No has iniciado sesión</h1>
                    <p className="text-gray-500 mt-2">Para acceder a tu perfil, inicia sesión.</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
                    <p className="text-lg text-gray-500">Cargando tus pedidos...</p>
                </div>
            </div>
        );
    }

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Mi Perfil</h1>

            {/* Tabs */}
            <div className="flex space-x-8 mb-6">
                <button
                    onClick={() => handleTabClick('cuenta')}
                    className={`text-xl font-semibold ${activeTab === 'cuenta' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                >
                    Cuenta
                </button>
                <button
                    onClick={() => handleTabClick('pedidos')}
                    className={`text-xl font-semibold ${activeTab === 'pedidos' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                >
                    Pedidos
                </button>
                <button
                    onClick={() => handleTabClick('configuracion')}
                    className={`text-xl font-semibold ${activeTab === 'configuracion' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                >
                    Configuración
                </button>
            </div>

            {/* Contenido */}
            {activeTab === 'cuenta' && (
                <div>
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="flex-shrink-0">
                            <img
                                className="h-16 w-16 rounded-full"
                                src={user.photoURL || '/img/OIP2.jpg'}
                                alt={user.displayName || 'Usuario'}
                            />
                        </div>
                        <div>
                            <p className="text-xl font-semibold text-gray-700">{user.displayName || 'Nombre no disponible'}</p>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        Cerrar sesión
                    </button>
                </div>
            )}

            {activeTab === 'pedidos' && (
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Mis Pedidos</h2>
                    <ul>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <li key={order.id} className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-lg font-medium text-gray-700">
                                                <strong>Fecha:</strong> {order.fecha?.seconds ? new Date(order.fecha.seconds * 1000).toLocaleDateString() : 'Fecha no disponible'}
                                            </p>
                                            <p className="text-sm text-gray-500"><strong>Estado:</strong> {order.estado}</p>
                                        </div>
                                        <div className="text-lg font-semibold text-gray-800">${order.total}</div>
                                    </div>
                                    <div className="mt-2">
                                        <strong>Productos:</strong>
                                        <ul className="ml-6 list-disc">
                                            {order.productos?.map((product, index) => (
                                                <li key={index} className="text-sm text-gray-700">
                                                    {product.nombre ?? 'Producto sin nombre'} - ${product.precio ?? 0} x {product.quantity ?? 1}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button
                                        onClick={() => navigate('/boleta', { state: { order } })}
                                        className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                                    >
                                        Ver/Descargar Boleta en PDF
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-500">No tienes pedidos realizados.</li>
                        )}
                    </ul>
                </div>
            )}

            {activeTab === 'configuracion' && (
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Configuración</h2>
                    <p className="text-gray-500">Aquí puedes actualizar tu configuración, como la dirección, preferencias, etc.</p>
                </div>
            )}
        </div>
    );
};

export default Perfil;
