import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-overlay"></div>
      <div className="home-content">
        <h1 className="home-title">Bienvenido a <span>Netflix Clone</span></h1>
        <p className="home-subtitle">Tu portal de películas y series favoritas</p>
        <div className="home-buttons">
          <button onClick={() => navigate('/login')} className="btn btn-login">Iniciar sesión</button>
          <button onClick={() => navigate('/signup')} className="btn btn-signup">Registrarse</button>
        </div>
      </div>
    </div>
  );
}
