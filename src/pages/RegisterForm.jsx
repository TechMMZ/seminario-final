// RegisterForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [showConsent, setShowConsent] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const handleAccept = () => {
        setShowConsent(false);
        setShowForm(true);
    };

    const handleDecline = () => {
        navigate('/'); // Redirige si no acepta los beneficios
    };

    const handleCloseForm = () => {
        setShowForm(false);
        navigate('/'); // Redirige al cerrar el formulario
    };

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
                        overflow: 'hidden',
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

                        {/* Formulario de Google */}
                        <iframe
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
