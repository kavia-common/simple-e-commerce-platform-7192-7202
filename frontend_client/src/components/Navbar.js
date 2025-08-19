import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function Navbar({ onToggleCart }) {
  const { isAuthenticated, user, logout } = useAuth();
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__brand">ShopLite</Link>
        <nav className={`nav__links ${mobileOpen ? 'is-open' : ''}`}>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/orders">Orders</NavLink>
        </nav>
        <div className="nav__actions">
          <button className="icon-btn" onClick={onToggleCart} aria-label="Open cart">
            🛒 <span className="badge">{count}</span>
          </button>
          {isAuthenticated ? (
            <div className="nav__user">
              <span className="nav__hello">Hi{user?.name ? `, ${user.name}` : ''}</span>
              <button className="btn btn--text" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="nav__auth">
              <Link to="/login" className="btn btn--text">Login</Link>
              <Link to="/register" className="btn btn--primary">Sign up</Link>
            </div>
          )}
          <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
