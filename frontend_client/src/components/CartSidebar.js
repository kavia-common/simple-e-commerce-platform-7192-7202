import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function CartSidebar({ open, onClose }) {
  const { cart, updateItem, removeItem, clear, subtotal } = useCart();

  return (
    <aside className={`cart ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="cart__header">
        <h2>Your Cart</h2>
        <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
      </div>
      <div className="cart__content">
        {cart.items.length === 0 ? (
          <p className="muted">Your cart is empty</p>
        ) : (
          cart.items.map((it) => (
            <div key={it.productId || it.id} className="cart__item">
              <div className="cart__item-info">
                <div className="cart__item-title">{it.name || it.title}</div>
                <div className="cart__item-price">{(it.currency || cart.currency || 'USD')} {Number(it.price || 0).toFixed(2)}</div>
              </div>
              <div className="cart__item-actions">
                <div className="qty">
                  <button onClick={() => updateItem(it.productId || it.id, Math.max(1, (it.quantity || 1) - 1))} aria-label="Decrease">−</button>
                  <span>{it.quantity || 1}</span>
                  <button onClick={() => updateItem(it.productId || it.id, (it.quantity || 1) + 1)} aria-label="Increase">+</button>
                </div>
                <button className="btn btn--text danger" onClick={() => removeItem(it.productId || it.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart__footer">
        <div className="cart__subtotal">
          <span>Subtotal</span>
          <strong>{cart.currency} {subtotal.toFixed(2)}</strong>
        </div>
        <div className="cart__buttons">
          <button className="btn btn--light" onClick={clear} disabled={cart.items.length === 0}>Clear</button>
          <Link className={`btn btn--primary ${cart.items.length === 0 ? 'is-disabled' : ''}`} to="/checkout" onClick={onClose}>
            Checkout
          </Link>
        </div>
      </div>
    </aside>
  );
}
