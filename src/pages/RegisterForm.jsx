import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [showConsent, setShowConsent] = useState(false); // El consentimiento no se muestra de inmediato
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Aquí puedes hacer algo cuando la página se carga después de escanear el QR
        // Por ejemplo, se puede navegar a la página donde se desea mostrar el contenido
        // Si ya se accedió al enlace del QR, no necesitas hacer nada para navegar,
        // ya que la página ya está cargada

        // Esperar 5 segundos antes de mostrar el consentimiento
        const timerConsent = setTimeout(() => {
            setShowConsent(true);
        }, 5000); // 5000 ms = 5 segundos

        // Limpiar el timer si el componente se desmonta antes de los 5 segundos
        return () => clearTimeout(timerConsent);
    }, []);

    useEffect(() => {
        // Mostrar el formulario después de otros 5 segundos (una vez se acepte el consentimiento)
        if (showConsent) {
            const timerForm = setTimeout(() => {
                setShowForm(true); // Mostrar el formulario después de otros 5 segundos
            }, 5000); // Esperar otros 5 segundos para mostrar el formulario

            // Limpiar el timer de mostrar el formulario si el componente se desmonta
            return () => clearTimeout(timerForm);
        }
    }, [showConsent]);

    const handleAccept = () => {
        setShowConsent(false); // Ocultar el modal de consentimiento
    };

    const handleDecline = () => {
        navigate('/'); // Redirigir al inicio si declina
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
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    zIndex: 999
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '30px',
                        borderRadius: '10px',
                        width: '90%',
                        maxWidth: '400px',
                        textAlign: 'center',
                        boxShadow: '0 0 20px rgba(0,0,0,0.3)'
                    }}>
                        <h2>¿Deseas aceptar los beneficios?</h2>
                        <p>Podrás acceder a contenidos y oportunidades exclusivas.</p>
                        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <button onClick={handleAccept}>Sí, aceptar</button>
                            <button onClick={handleDecline}>No, gracias</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal con el formulario */}
            {showForm && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    zIndex: 999
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        width: '95%',
                        maxWidth: '800px',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        position: 'relative',
                        boxShadow: '0 0 20px rgba(0,0,0,0.3)'
                    }}>
                        {/* Botón de cerrar */}
                        <button
                            onClick={handleCloseForm}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: 'transparent',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer'
                            }}
                            aria-label="Cerrar formulario"
                        >
                            ×
                        </button>

                        {/* Loader */}
                        {loading && (
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
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
                            title="Google Form"
                            style={{ border: 'none' }}
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
