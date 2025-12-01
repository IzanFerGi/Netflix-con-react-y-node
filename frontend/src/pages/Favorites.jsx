// src/pages/Favorites.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import AppHeader from '../components/AppHeader';
import '../styles/Start.css';
import '../styles/MediaList.css';

export default function Favorites() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  async function load() {
    try {
      const res = await api.get('/api/favorites');
      setItems(res.data);
    } catch (error) {
      console.error('Error cargando favoritos', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user) return;
    load();
  }, [user]);

  async function handleRemove(mediaId) {
    try {
      await api.delete(`/api/favorites/${mediaId}`);
      setItems((prev) => prev.filter((f) => f.mediaId !== mediaId));
    } catch (error) {
      console.error('Error eliminando favorito', error);
    }
  }

  if (!user) return null;

  return (
    <div className="start-page">
      <header className="start-hero start-hero--small">
        <div className="start-hero-overlay" />
        <div className="start-hero-content">
          <AppHeader />
          <div className="start-hero-main">
            <h1 className="start-hero-title">Mis favoritos</h1>
            <p className="start-hero-subtitle">
              Aquí tienes todas las películas y series que has guardado.
            </p>
          </div>
        </div>
      </header>

      <main className="start-main">
        {loading ? (
          <div className="medialist-loading">Cargando favoritos...</div>
        ) : items.length === 0 ? (
          <p>No tienes ningún favorito todavía.</p>
        ) : (
          <div className="medialist-grid">
            {items.map((fav) => {
              const m = fav.media;
              const genres = (m?.genres || [])
                .map((mg) => mg.genre?.name)
                .join(', ');

              return (
                <article key={fav.mediaId} className="media-card">
                  <div className="media-thumb-wrapper">
                    <img
                      src={m?.posterUrl || '/media/default_poster.jpg'}
                      alt={m?.title}
                      className="media-thumb"
                    />
                  </div>
                  <h3>{m?.title}</h3>
                  <p className="media-genre">{genres}</p>
                  <button
                    className="media-remove-btn"
                    onClick={() => handleRemove(fav.mediaId)}
                  >
                    Quitar de favoritos
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
