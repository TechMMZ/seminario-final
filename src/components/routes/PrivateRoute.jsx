// PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';  // Asegúrate de tener este contexto para la autenticación

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);  // Obtén el estado de autenticación desde tu contexto

    if (!user) {
        return <Navigate to="/login" replace />;  // Si el usuario no está autenticado, lo redirige al login
    }

    return children;  // Si el usuario está autenticado, renderiza el contenido
};

export default PrivateRoute;
