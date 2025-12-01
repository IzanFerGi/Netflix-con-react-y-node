// src/pages/Signup.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const PASSWORD_REGEX = /^(?=.*[A-Z]).{5,}$/;

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const [name, setName] = useState('');
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

    const normalizedEmail = normalizeEmail(email);

    if (!PASSWORD_REGEX.test(password)) {
      setError('La contraseña debe tener al menos 5 caracteres y una letra mayúscula');
      return;
    }

    setLoading(true);
    try {
      await signup({ name: name.trim() || null, email: normalizedEmail, password });
      navigate('/login', { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.error || 'Error al registrarse';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container signup-bg">
      <form onSubmit={handleSubmit} className="auth-form" aria-describedby="signup-error">
        <h2>Crear cuenta</h2>

        {error && <div id="signup-error" className="auth-error">{error}</div>}

        <input type="text" placeholder="Nombre" value={name}
          onChange={(e) => setName(e.target.value)} />

        <input type="email" placeholder="Correo electrónico" value={email}
          onChange={(e) => setEmail(e.target.value)} required />

        <input type="password"
          placeholder="Contraseña (mín. 5 caracteres y 1 mayúscula)"
          value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>

        <p className="auth-link">
          ¿Ya tienes cuenta?{' '}
          <button type="button" id="boton" className="link-button"
            onClick={() => navigate('/login')}>
            Inicia sesión
          </button>
        </p>

        {/*Botón para volver al inicio */}
        <button id="boton_inicio"type="button" className="back-home" onClick={() => navigate('/start')}>
          ⬅ Volver al inicio
        </button>

      </form>
    </div>
  );
}
