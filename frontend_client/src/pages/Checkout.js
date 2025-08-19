import React, { useState } from 'react';
import { OrdersAPI } from '../services/api';
import { useCart } from '../contexts/CartContext';

export default function Checkout() {
  const { cart, subtotal } = useCart();
  const [placing, setPlacing] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const placeOrder = async () => {
    setPlacing(true);
    setMsg('');
    setErr('');
    try {
      await OrdersAPI.checkout();
      setMsg('Order placed successfully!');
    } catch (e) {
      setErr(e.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="container">
      <h1>Checkout</h1>
      <div className="checkout">
        <div className="checkout__summary">
          <h2>Order Summary</h2>
          {cart.items.length === 0 ? <p className="muted">Your cart is empty</p> : (
            <>
              <ul className="list">
                {cart.items.map((it) => (
                  <li key={it.productId || it.id} className="list__item">
                    <span>{it.name} × {it.quantity}</span>
                    <span>{cart.currency} {(Number(it.price || 0) * (it.quantity || 1)).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="checkout__total">
                <span>Total</span>
                <strong>{cart.currency} {subtotal.toFixed(2)}</strong>
              </div>
            </>
          )}
        </div>
        <div className="checkout__action">
          {err && <div className="alert alert--error">{err}</div>}
          {msg && <div className="alert alert--success">{msg}</div>}
          <button className="btn btn--primary" disabled={placing || cart.items.length === 0} onClick={placeOrder}>
            {placing ? 'Placing order...' : 'Place order'}
          </button>
        </div>
      </div>
    </div>
  );
}
