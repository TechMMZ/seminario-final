import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [showConsent, setShowConsent] = useState(false); // El consentimiento no se muestra de inmediato
    const [showForm, setShowForm] = useState(false); // El formulario de Google no se muestra de inmediato
    const [loading, setLoading] = useState(true); // Manejamos el estado de carga del formulario
    const navigate = useNavigate(); // Hook para navegar a otra página

    useEffect(() => {
        // Redirigir inmediatamente al inicio antes de mostrar el consentimiento
        navigate('/');

        // Esperar 5 segundos antes de mostrar el consentimiento
        const timerConsent = setTimeout(() => {
            setShowConsent(true); // Mostrar el modal de consentimiento
        }, 5000); // 5000 ms = 5 segundos

        return () => clearTimeout(timerConsent); // Limpiar el timer cuando el componente se desmonte
    }, [navigate]);

    useEffect(() => {
        // Una vez el consentimiento se ha mostrado, esperar otros 5 segundos para mostrar el formulario
        if (showConsent) {
            const timerForm = setTimeout(() => {
                setShowForm(true); // Mostrar el formulario después de otros 5 segundos
            }, 5000); // Esperar otros 5 segundos para mostrar el formulario

            return () => clearTimeout(timerForm); // Limpiar el timer de mostrar el formulario si el componente se desmonta
        }
    }, [showConsent]);

    const handleAccept = () => {
        setShowConsent(false); // Ocultar el modal de consentimiento
        // Redirigir al inicio mientras se espera el formulario
        navigate('/');
    };

    const handleDecline = () => {
        navigate('/'); // Redirigir al inicio si el usuario rechaza el consentimiento
    };

    const handleCloseForm = () => {
        setShowForm(false); // Cerrar el formulario
        navigate('/'); // Redirigir al inicio
    };

    // Bloqueo de scroll en el body mientras hay un modal abierto
    useEffect(() => {
        const shouldBlockScroll = showConsent || showForm;
        document.body.style.overflow = shouldBlockScroll ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showConsent, showForm]);

    // Accesibilidad: enfocar el botón al mostrar consentimiento
    useEffect(() => {
        if (showConsent) {
            const firstButton = document.querySelector('button');
            firstButton?.focus();
        }
    }, [showConsent]);

    return (
        <>
            {/* Modal de consentimiento */}
            {showConsent && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg w-11/12 max-w-md text-center shadow-lg">
                        <h2 className="text-xl font-semibold">¿Deseas aceptar los beneficios?</h2>
                        <p className="mt-2">Podrás acceder a contenidos y oportunidades exclusivas.</p>
                        <div className="mt-6 flex gap-4 justify-center">
                            <button
                                onClick={handleAccept}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Sí, aceptar
                            </button>
                            <button
                                onClick={handleDecline}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                No, gracias
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal con el formulario */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-11/12 max-w-3xl max-h-[90vh] overflow-auto relative shadow-lg">
                        {/* Botón de cerrar */}
                        <button
                            onClick={handleCloseForm}
                            className="absolute top-4 right-4 bg-transparent text-2xl font-bold cursor-pointer"
                            aria-label="Cerrar formulario"
                        >
                            ×
                        </button>

                        {/* Loader */}
                        {loading && (
                            <div className="text-center mb-4">
                                <p>Cargando formulario...</p>
                            </div>
                        )}

                        {/* Formulario de Google */}
                        <iframe
                            onLoad={() => setLoading(false)}
                            src="https://docs.google.com/forms/d/e/1FAIpQLSeHtaKN7-218pPcd7ZuuqJTFGOEZZLDFhHDdqhDMMMFLHBGJg/viewform?embedded=true"
                            width="100%"
                            height="600px"
                            frameBorder="0"
                            marginHeight="0"
                            marginWidth="0"
                            title="Formulario de Google"
                            className="border-none"
                        >
                            Cargando…
                        </iframe>
                    </div>
                </div>
            )}
        </>
    );
};

export default RegisterForm;
