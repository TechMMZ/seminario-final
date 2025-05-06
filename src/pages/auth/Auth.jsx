import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { login, register } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setErrorMessage('');
        if (!email || !password) {
            setErrorMessage('Por favor, completa todos los campos');
            return;
        }

        try {
            const loggedUser = await login(email, password);
            if (loggedUser) {
                setUser(loggedUser);
                navigate('/');
            }
        } catch (error) {
            setErrorMessage(error.message || 'Error al iniciar sesión');
        }
    };

    const handleRegister = async () => {
        setErrorMessage('');
        if (!email || !password || !confirmPassword) {
            setErrorMessage('Por favor, completa todos los campos');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }

        try {
            const newUser = await register(email, password);
            console.log('Usuario registrado:', newUser);
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setIsLogin(true);
        } catch (error) {
            setErrorMessage(error.message || 'Error al registrar');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        isLogin ? handleLogin() : handleRegister();
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('');
    };

    return (
        <div className="flex justify-center items-center min-h-screen -mt-15">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-center mb-6">
                    {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                </h1>

                <form onSubmit={handleSubmit} autoComplete="off">
                    {errorMessage && (
                        <p className="text-red-600 mb-4 text-sm text-center">
                            {errorMessage}
                        </p>
                    )}

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        autoComplete="off"
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        autoComplete="off"
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {!isLogin && (
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirmar Contraseña"
                            autoComplete="off"
                            className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}

                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm">
                        {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                        <button
                            onClick={toggleMode}
                            className="text-blue-600 ml-2 font-semibold"
                        >
                            {isLogin ? 'Registrarse' : 'Iniciar Sesión'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
