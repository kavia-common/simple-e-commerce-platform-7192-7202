import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthAPI, health } from '../services/api';

// PUBLIC_INTERFACE
export const AuthContext = createContext(null);

/** PUBLIC_INTERFACE
 * AuthProvider manages user authentication state, token persistence, and provides auth actions.
 */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    try { return raw ? JSON.parse(raw) : null; } catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const res = await AuthAPI.login({ email, password });
      if (res && res.token) setToken(res.token);
      if (res && res.user) setUser(res.user);
      return res;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    setLoading(true);
    try {
      const res = await AuthAPI.register({ name, email, password });
      // Some APIs return token on register; if so, set it
      if (res && res.token) setToken(res.token);
      if (res && res.user) setUser(res.user);
      return res;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  // Optional: probe health on mount
  useEffect(() => {
    health().catch(() => {});
  }, []);

  const value = useMemo(() => ({
    token, user, loading, login, register, logout, isAuthenticated: !!token
  }), [token, user, loading, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access authentication state and actions */
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
