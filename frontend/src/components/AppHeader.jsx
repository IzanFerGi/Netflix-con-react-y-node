// src/components/AppHeader.jsx
import React, { useContext, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Start.css'; // reutilizamos estilos de Start

export default function AppHeader() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const firstLetter = useMemo(
    () => (user.name?.[0] || user.email?.[0] || '?').toUpperCase(),
    [user]
  );

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="start-top-bar">
      {/* Logo → siempre manda a /start */}
      <div
        className="start-logo"
        onClick={() => navigate('/start')}
        role="button"
        style={{ cursor: 'pointer' }}
      >
        Netflix <span>Clone</span>
      </div>

      {/* Links de navegación */}
      <div className="start-nav-links">
        <button
          className={isActive('/start') ? 'active' : ''}
          onClick={() => navigate('/start')}
        >
          Inicio
        </button>
        <button
          className={isActive('/movies') ? 'active' : ''}
          onClick={() => navigate('/movies')}
        >
          Películas
        </button>
        <button
          className={isActive('/series') ? 'active' : ''}
          onClick={() => navigate('/series')}
        >
          Series
        </button>
        <button
          className={isActive('/favorites') ? 'active' : ''}
          onClick={() => navigate('/favorites')}
        >
          Favoritos
        </button>
      </div>

      {/* Usuario + Logout */}
      <div className="start-user">
        <div className="start-avatar-circle">{firstLetter}</div>
        <div className="start-user-info">
          <span className="start-user-name">
            {user.name || user.email}
          </span>
          <button
            className="start-logout-btn"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
