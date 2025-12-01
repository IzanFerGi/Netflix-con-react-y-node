// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function normalizeEmail(value) {
    return (value || '').trim().toLowerCase();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const normalized = normalizeEmail(email);

    try {
      await login(normalized, password);
      navigate('/start', { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.error || 'Error al iniciar sesión';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container login-bg">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Iniciar sesión</h2>

        {error && <div className="auth-error">{error}</div>}

        <input type="email" placeholder="Correo electrónico" value={email}
          onChange={(e) => setEmail(e.target.value)} required />

        <input type="password" placeholder="Contraseña" value={password}
          onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="auth-link">
          ¿No tienes cuenta?{' '}
          <button type="button" id="boton" className="link-button"
            onClick={() => navigate('/signup')}>
            Regístrate
          </button>
        </p>

        {/* Nuevo botón */}
        <button type="button" id="boton_inicio"className="back-home" onClick={() => navigate('/')}>
          ⬅ Volver al inicio
        </button>
      </form>
    </div>
  );
}
