import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Home.css';

export default function Home() {
  const { user, ready } = useContext(AuthContext);
  const navigate = useNavigate();

  // Esperar a que cargue el estado de auth
  useEffect(() => {
    if (!ready) return;
    if (user) {
      // Si ya hay sesión, no tiene sentido ver la landing
      navigate('/start', { replace: true });
    }
  }, [user, ready, navigate]);

  if (!ready) return null;
  if (user) return null; // mientras hace el replace

  return (
    <div className="home-container">
      <div className="home-overlay"></div>
      <div className="home-content">
        <h1 className="home-title">Bienvenido a <span>Netflix Clone</span></h1>
        <p className="home-subtitle">Tu portal de películas y series favoritas</p>
        <div className="home-buttons">
          <button
            onClick={() => navigate('/login')}
            className="btn btn-login"
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="btn btn-signup"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}
