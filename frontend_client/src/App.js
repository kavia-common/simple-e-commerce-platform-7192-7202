import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { applyTheme } from './config';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import ProtectedRoute from './components/ProtectedRoute';

// PUBLIC_INTERFACE
function App() {
  /** Root application component setting up theme, providers, routes, and layout. */
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    applyTheme();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Navbar onToggleCart={() => setCartOpen(true)} />
          <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
              </Route>
            </Routes>
          </main>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
