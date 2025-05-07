import { useState, useEffect } from 'react';

const RegisterForm = () => {
    const [showConsent, setShowConsent] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Esperar 5 segundos antes de mostrar el consentimiento
        const timerConsent = setTimeout(() => {
            setShowConsent(true);
        }, 5000);

        return () => clearTimeout(timerConsent);
    }, []);

    // Bloqueo de scroll cuando hay un modal abierto
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
            const acceptButton = document.getElementById('accept-button');
            acceptButton?.focus();
        }
    }, [showConsent]);

    const handleAccept = () => {
        setShowConsent(false);
        setShowForm(true);
    };

    const handleDecline = () => {
        setShowConsent(false);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <>
            {/* Modal de consentimiento */}
            {showConsent && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg w-11/12 max-w-md text-center shadow-lg">
                        <h2 className="text-xl font-semibold">¿Deseas acceder a beneficios exclusivos?</h2>
                        <p className="mt-2">Podrás acceder a contenidos y oportunidades exclusivas.</p>
                        <div className="mt-6 flex gap-4 justify-center">
                            <button
                                id="accept-button"
                                onClick={handleAccept}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Sí, continuar al registro
                            </button>
                            <button
                                onClick={handleDecline}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
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
                    <div className="bg-white p-6 rounded-lg w-11/12 max-w-3xl max-h-screen md:max-h-[90vh] overflow-auto relative shadow-lg">
                        {/* Botón de cerrar */}
                        <button
                            onClick={handleCloseForm}
                            className="absolute top-4 right-4 bg-transparent text-2xl font-bold cursor-pointer"
                            aria-label="Cerrar formulario"
                        >
                            ×
                        </button>

                        <h2 className="text-xl font-semibold mb-4 text-center">Completa tu registro</h2>

                        {/* Loader */}
                        {loading && (
                            <div className="flex justify-center items-center py-8">
                                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        )}

                        {/* Formulario de Google */}
                        <iframe
                            onLoad={() => setLoading(false)}
                            src="https://docs.google.com/forms/d/e/1FAIpQLSeHtaKN7-218pPcd7ZuuqJTFGOEZZLDFhHDdqhDMMMFLHBGJg/viewform?embedded=true"
                            width="100%"
                            height="600"
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