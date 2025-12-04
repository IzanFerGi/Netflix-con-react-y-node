import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

import AppHeader from '../components/AppHeader';
import '../styles/Start.css';
import '../styles/MediaList.css';

export default function Start() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  // proteger la ruta
  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  // cargar TODO el catálogo de pelis y series
  useEffect(() => {
    if (!user) return;

    async function load() {
      try {
        const [moviesRes, seriesRes] = await Promise.all([
          api.get('/api/media', { params: { type: 'MOVIE' } }),
          api.get('/api/media', { params: { type: 'SERIES' } }),
        ]);

        setMovies(moviesRes.data);
        setSeries(seriesRes.data);
      } catch (error) {
        console.error('Error cargando contenido para Start', error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user]);

  if (!user) return null;

  function renderRow(title, items) {
    if (!items.length) return null;

    return (
      <section className="start-row">
        <h2 className="start-row-title">{title}</h2>
        <div className="start-row-scroller">
          {items.map((m) => (
            <article key={m.id} className="start-card">
              <div className="start-card-thumb-wrapper">
                <img
                  src={m.posterUrl || '/media/default_poster.jpg'}
                  alt={m.title}
                  className="start-card-thumb"
                  loading="lazy"
                />
              </div>
              <h3 className="start-card-title">{m.title}</h3>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="start-page">
      {/* HERO */}
      <header className="start-hero">
        <div className="start-hero-overlay" />
        <div className="start-hero-content">
          <AppHeader />

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
      <main className="start-main">
        {loading ? (
          <div className="medialist-loading">Cargando catálogo...</div>
        ) : (
          <>
            {renderRow('Películas recomendadas', movies)}
            {renderRow('Series recomendadas', series)}
          </>
        )}
      </main>
    </div>
  );
}
