/* eslint-disable react-refresh/only-export-components */
import Skeleton from 'react-loading-skeleton';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../config/firebaseConfig'; // Asegúrate de que esta ruta sea correcta
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getUserFromFirestore } from '../services/authService'; // Asegúrate de que esta ruta sea correcta

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado para el usuario autenticado
    const [loading, setLoading] = useState(true); // Estado para manejar la carga de autenticación

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        // Escuchar cambios en el estado de autenticación
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Si hay un usuario almacenado, lo establecemos
            setLoading(false);
        } else {
            const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
                if (currentUser) {
                    // Si hay un usuario autenticado, obtenemos más datos de Firestore
                    const userData = await getUserFromFirestore(currentUser.uid);
                    const fullUser = { ...currentUser, ...userData };
                    setUser(fullUser);
                    // Guardar el usuario en sessionStorage
                    sessionStorage.setItem('user', JSON.stringify(fullUser));
                } else {
                    setUser(null); // Si no hay un usuario, lo ponemos como null
                }
                setLoading(false);
            });

            return () => unsubscribe(); // Limpiar el listener cuando el componente se desmonte
        }
    }, []);

    if (loading) {
        return (
            <div className="space-y-6 max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
                <Skeleton height={32} width="75%" />
                <Skeleton height={24} width="50%" />
                <Skeleton height={40} width="33%" />
            </div>
        );
    }

    // Función para cerrar sesión
    const logout = async () => {
        try {
            await signOut(auth);  // Desconecta al usuario de Firebase
            setUser(null);         // Limpiar el estado de usuario
            sessionStorage.removeItem('user'); // Eliminar usuario de sessionStorage
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Función personalizada para consumir el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};
