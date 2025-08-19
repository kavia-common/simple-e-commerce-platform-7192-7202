import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CartAPI } from '../services/api';
import { useAuth } from './AuthContext';

// PUBLIC_INTERFACE
export const CartContext = createContext(null);

/** PUBLIC_INTERFACE
 * CartProvider manages the user's cart by syncing with the backend and exposing cart actions.
 */
export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState({ items: [], total: 0, currency: 'USD' });
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setCart({ items: [], total: 0, currency: 'USD' });
      return;
    }
    setLoading(true);
    try {
      const data = await CartAPI.get();
      setCart({
        items: data?.items || [],
        total: data?.total ?? 0,
        currency: data?.currency || 'USD'
      });
    } catch (e) {
      // ignore for now
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addItem = useCallback(async (productId, quantity = 1) => {
    await CartAPI.add({ productId, quantity });
    await refresh();
  }, [refresh]);

  const updateItem = useCallback(async (productId, quantity) => {
    await CartAPI.update(productId, quantity);
    await refresh();
  }, [refresh]);

  const removeItem = useCallback(async (productId) => {
    await CartAPI.remove(productId);
    await refresh();
  }, [refresh]);

  const clear = useCallback(async () => {
    await CartAPI.clear();
    await refresh();
  }, [refresh]);

  const derived = useMemo(() => {
    const count = cart.items.reduce((sum, it) => sum + (it.quantity || 0), 0);
    const subtotal = cart.items.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 0), 0);
    return { count, subtotal };
  }, [cart]);

  const value = useMemo(() => ({
    cart, loading, refresh, addItem, updateItem, removeItem, clear, ...derived
  }), [cart, loading, refresh, addItem, updateItem, removeItem, clear, derived]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// PUBLIC_INTERFACE
export function useCart() {
  /** Hook to access cart state and actions */
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
