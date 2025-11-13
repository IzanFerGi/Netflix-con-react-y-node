// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';
import logo from '../assets/images/logo.png';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-left">
        <Link to="/" className="navbar-title" aria-label="Inicio">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>
      </div>

      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/login" className="navbar-btn login-btn">Iniciar sesión</Link>
            <Link to="/signup" className="navbar-btn signup-btn">Registrarse</Link>
          </>
        ) : (
          <>
            <span className="navbar-user" title={user.email}>👤 {user.name || 'Usuario'}</span>
            <button onClick={handleLogout} className="navbar-btn logout-btn" aria-label="Cerrar sesión">Cerrar sesión</button>
          </>
        )}
      </div>
    </nav>
  );
}
