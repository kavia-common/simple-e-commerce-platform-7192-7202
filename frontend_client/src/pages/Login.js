import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (e2) {
      setErr(e2.message || 'Login failed');
    }
  };

  return (
    <div className="container auth">
      <h1>Welcome back</h1>
      <p className="muted">Log in to continue</p>
      {err && <div className="alert alert--error">{err}</div>}
      <form className="form" onSubmit={handleSubmit}>
        <label>Email
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>Password
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button className="btn btn--primary" type="submit" disabled={loading}>Log in</button>
      </form>
      <p className="muted">No account? <Link to="/register">Create one</Link></p>
    </div>
  );
}
