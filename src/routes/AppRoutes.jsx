import { Routes, Route, Navigate } from "react-router-dom";

// Páginas
import ProductForm from '../pages/ProductForm'
import Producto from "../pages/Producto";
import Tecnologia from '../pages/Tecnologia'
import Auth from '../pages/auth/Auth'
import Perfil from '../pages/auth/Perfil'
import Cart from "../pages/Cart";

function AppRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Producto />} />
                <Route path="/tecnologia" element={<Tecnologia />} />
                {/* <Route path="/form" element={<ProductForm />} /> */}
                {/* Solo una ruta para /login que maneja el login y registro */}
                <Route path="/login" element={<Auth />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </>
    );
}

export default AppRoutes;
