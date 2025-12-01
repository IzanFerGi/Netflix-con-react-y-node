// src/pages/Movies.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import AppHeader from '../components/AppHeader';
import '../styles/Start.css';
import '../styles/MediaList.css';

export default function Movies() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;

    async function load() {
      try {
        const [mediaRes, favRes] = await Promise.all([
          api.get('/api/media', { params: { type: 'MOVIE' } }),
          api.get('/api/favorites'),
        ]);

        setItems(mediaRes.data);
        setFavoriteIds(favRes.data.map((f) => f.mediaId));
      } catch (error) {
        console.error('Error cargando películas', error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user]);

  const isFavorite = (id) => favoriteIds.includes(id);

  async function toggleFavorite(mediaId) {
    try {
      if (isFavorite(mediaId)) {
        await api.delete(`/api/favorites/${mediaId}`);
        setFavoriteIds((prev) => prev.filter((id) => id !== mediaId));
      } else {
        await api.post(`/api/favorites/${mediaId}`);
        setFavoriteIds((prev) => [...prev, mediaId]);
      }
    } catch (error) {
      console.error('Error al cambiar favorito', error);
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
            <h1 className="start-hero-title">Películas</h1>
            <p className="start-hero-subtitle">
              Explora todas las películas del catálogo.
            </p>
          </div>
        </div>
      </header>

      <main className="start-main">
        {loading ? (
          <div className="medialist-loading">Cargando películas...</div>
        ) : (
          <div className="medialist-grid">
            {items.map((m) => {
              const genres = (m.genres || [])
                .map((mg) => mg.genre?.name)
                .join(', ');
              return (
                <article key={m.id} className="media-card">
                  <div className="media-thumb-wrapper">
                    <img
                      src={m.posterUrl || '/media/default_poster.jpg'}
                      alt={m.title}
                      className="media-thumb"
                    />
                  </div>
                  <h3>{m.title}</h3>
                  <p className="media-genre">{genres}</p>
                  <button
                    className={`media-fav-btn ${isFavorite(m.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(m.id)}
                  >
                    {isFavorite(m.id)
                      ? '★ Quitar de favoritos'
                      : '☆ Añadir a favoritos'}
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
