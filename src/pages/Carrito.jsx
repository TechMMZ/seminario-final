import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Carrito.css'; // Asegúrate de que esta ruta sea correcta

function Carrito() {
  const [cart, setCart] = useState([
    { id: 1, name: "Pizza Margarita", price: 8.99, quantity: 1, time: "30" },
    { id: 2, name: "Hamburguesa", price: 5.49, quantity: 2, time: "15" },
    { id: 3, name: "Ensalada César", price: 4.99, quantity: 1, time: "10" }
  ]);
  const [step, setStep] = useState(2);  // Empieza directamente en el carrito
  const [formData, setFormData] = useState({
    address: "",
    notes: "",
    payment: { method: "", details: {} },
    contact: { name: "", phone: "" }
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cvv: "",
    expiry: "",
    email: ""
  });

  const navigate = useNavigate();

  const updateQuantity = (id, action) => {
    setCart(cart.map(item =>
      item.id === id ? {
        ...item,
        quantity: action === 'increase'
          ? (item.quantity || 1) + 1
          : Math.max((item.quantity || 1) - 1, 1)
      } : item
    ));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const maxTime = Math.max(...cart.map(item => parseInt(item.time) || 0), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      contact: {
        ...formData.contact,
        [name]: value
      }
    });
  };

  const handlePaymentDetailChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      ...formData,
      payment: {
        method: formData.payment.method,
        details: paymentDetails
      },
      cart,
      total: (total + 3.99).toFixed(2),
      estimatedTime: `${maxTime} minutos`
    };
    console.log("Pedido confirmado:", orderData);
    setStep(4);
  };

  return (
    <div className="app-container">
      {step === 2 && (
        <div className="cart-view">
          <h2>🛒 Tu Pedido</h2>

          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>${item.price} c/u</p>
                </div>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.id, 'decrease')}>-</button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => updateQuantity(item.id, 'increase')}>+</button>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => setCart(cart.filter(i => i.id !== item.id))}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Envío:</span>
              <span>$3.99</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${(total + 3.99).toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>⏱️ Tiempo estimado:</span>
              <span>{maxTime} minutos</span>
            </div>
          </div>

          <div className="action-buttons">
            <button className="back-btn" onClick={() => setStep(1)}>
              ← Seguir comprando
            </button>
            <button className="checkout-btn" onClick={() => setStep(3)}>
              Continuar al pago →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="checkout-view">
          <h2>💳 Completa tu pedido</h2>

          <form onSubmit={handleSubmit}>
            <div className="section">
              <h3>📍 Dirección de entrega</h3>
              <input
                type="text"
                name="address"
                placeholder="Calle, número, departamento"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="section">
              <h3>📱 Contacto</h3>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre completo"
                  value={formData.contact.name}
                  onChange={handleContactChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono"
                  value={formData.contact.phone}
                  onChange={handleContactChange}
                  required
                />
              </div>
            </div>

            <div className="section">
              <h3>🔒 Método de pago</h3>
              <div className="payment-methods">
                <div
                  className={`payment-card ${formData.payment.method === "Tarjeta" ? 'selected' : ''}`}
                  onClick={() => setFormData({
                    ...formData,
                    payment: { ...formData.payment, method: "Tarjeta" }
                  })}
                >
                  <span className="payment-icon">💳</span>
                  <span>Tarjeta</span>
                </div>
                <div
                  className={`payment-card ${formData.payment.method === "PayPal" ? 'selected' : ''}`}
                  onClick={() => setFormData({
                    ...formData,
                    payment: { ...formData.payment, method: "PayPal" }
                  })}
                >
                  <span className="payment-icon">🔵</span>
                  <span>PayPal</span>
                </div>
                <div
                  className={`payment-card ${formData.payment.method === "Efectivo" ? 'selected' : ''}`}
                  onClick={() => setFormData({
                    ...formData,
                    payment: { ...formData.payment, method: "Efectivo" }
                  })}
                >
                  <span className="payment-icon">💵</span>
                  <span>Efectivo</span>
                </div>
              </div>

              {formData.payment.method === "Tarjeta" && (
                <div className="card-fields">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Número de tarjeta"
                    value={paymentDetails.cardNumber}
                    onChange={handlePaymentDetailChange}
                    required
                  />
                  <div className="small-inputs">
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={paymentDetails.cvv}
                      onChange={handlePaymentDetailChange}
                      required
                    />
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/AA"
                      value={paymentDetails.expiry}
                      onChange={handlePaymentDetailChange}
                      required
                    />
                  </div>
                </div>
              )}

              {formData.payment.method === "PayPal" && (
                <input
                  type="email"
                  name="email"
                  placeholder="Correo de PayPal"
                  value={paymentDetails.email}
                  onChange={handlePaymentDetailChange}
                  required
                />
              )}
            </div>

            <div className="section">
              <h3>✏️ Notas adicionales</h3>
              <textarea
                name="notes"
                placeholder="Ej: Sin cebolla, tocar timbre 3 veces..."
                value={formData.notes}
                onChange={handleInputChange}
              />
            </div>

            <div className="checkout-actions">
              <button
                type="button"
                className="back-btn"
                onClick={() => setStep(2)}
              >
                ← Volver al carrito
              </button>
              <button
                type="submit"
                className="confirm-btn"
                disabled={
                  !formData.address ||
                  !formData.contact.name ||
                  !formData.contact.phone ||
                  (formData.payment.method === "Tarjeta" &&
                    (!paymentDetails.cardNumber || !paymentDetails.cvv || !paymentDetails.expiry)) ||
                  (formData.payment.method === "PayPal" && !paymentDetails.email)
                }
              >
                Confirmar pedido →
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 4 && (
        <div className="confirmation-view">
          <div className="confirmation-card">
            <div className="confirmation-header">
              <span className="emoji">🎉</span>
              <h3>¡Pedido Confirmado!</h3>
            </div>
            <p>Tu pedido está siendo procesado. ¡Gracias por comprar en DeliveLux!</p>
            <button onClick={() => setStep(1)}>Volver a inicio</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;
