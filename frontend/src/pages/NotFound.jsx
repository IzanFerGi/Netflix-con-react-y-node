
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();

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
            onClick={() => navigate('/', { replace: true })}
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
