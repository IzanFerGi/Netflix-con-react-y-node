import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFound.css';
import { AuthContext } from '../context/AuthContext';

export default function NotFound() {
  const navigate = useNavigate();
  const { user, ready } = useContext(AuthContext);

  function handleGoHome() {
    if (!ready) return;
    if (user) {
      navigate('/start', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Página no encontrada</h2>
        <p className="notfound-text">
          Parece que te has perdido en el catálogo.
          Esta página no existe en este Netflix Clone.
        </p>

        <div className="notfound-buttons">
          <button
            className="nf-btn nf-primary"
            onClick={handleGoHome}
          >
            Volver al inicio
          </button>

          <button
            className="nf-btn nf-secondary"
            onClick={() => navigate(-1)}
          >
            Volver atrás
          </button>
        </div>
      </div>
    </div>
  );
}
