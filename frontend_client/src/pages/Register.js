import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const { register, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setOk('');
    try {
      await register(name, email, password);
      setOk('Registration successful! You can now log in.');
      navigate('/login');
    } catch (e2) {
      setErr(e2.message || 'Registration failed');
    }
  };

  return (
    <div className="container auth">
      <h1>Create your account</h1>
      <p className="muted">Join us and start shopping</p>
      {err && <div className="alert alert--error">{err}</div>}
      {ok && <div className="alert alert--success">{ok}</div>}
      <form className="form" onSubmit={handleSubmit}>
        <label>Name
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>Email
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>Password
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        </label>
        <button className="btn btn--primary" type="submit" disabled={loading}>Create account</button>
      </form>
      <p className="muted">Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  );
}
