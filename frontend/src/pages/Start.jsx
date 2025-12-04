// src/pages/Start.jsx
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AppHeader from '../components/AppHeader';
import '../styles/Start.css';


const MOCK_SECTIONS = [
  {
    id: 'trending',
    title: 'Tendencias',
    items: [
      { id: 1, title: 'Película 1', thumb: '/media/trending1.jpg' },
      { id: 2, title: 'Película 2', thumb: '/media/trending2.jpg' },
      { id: 3, title: 'Película 3', thumb: '/media/trending3.jpg' },
      { id: 4, title: 'Película 4', thumb: '/media/trending4.jpg' },
    ],
  },
];

export default function Start() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="start-page">
      {/* HERO */}
      <header className="start-hero">
        <div className="start-hero-overlay" />

        <div className="start-hero-content">
          {/* Cabecera común */}
          <AppHeader />

          {/* Hero text */}
          <div className="start-hero-main">
            <h1 className="start-hero-title">Bienvenido de nuevo</h1>
            <p className="start-hero-subtitle">
              Disfruta de tus series y películas favoritas.
            </p>

            <div className="start-hero-actions">
              <button
                className="btn btn-primary"
                onClick={() => navigate('/movies')}
              >
                Ver películas
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/favorites')}
              >
                Mis favoritos
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* SECCIONES MOCK */}
      <main className="start-main">
        {MOCK_SECTIONS.map((section) => (
          <section key={section.id} className="start-row">
            <h2 className="start-row-title">{section.title}</h2>
            <div className="start-row-scroller">
              {section.items.map((item) => (
                <article key={item.id} className="start-card">
                  <div className="start-card-thumb-wrapper">
                    <img
                      src={item.thumb}
                      alt={item.title}
                      className="start-card-thumb"
                      loading="lazy"
                    />
                    <div className="start-card-overlay">
                      <button className="start-card-play">▶</button>
                    </div>
                  </div>
                  <h3 className="start-card-title">{item.title}</h3>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
