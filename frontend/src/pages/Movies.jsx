// src/pages/Movies.jsx
import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import AppHeader from '../components/AppHeader';

import GenreFilter from '../components/GenreFilter';

import '../styles/Start.css';
import '../styles/MediaList.css';

export default function Movies() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Géneros disponibles (mismos que en el seed)
  const allGenres = [
    "Acción",
    "Drama",
    "Terror",
    "Ciencia Ficción",
    "Comedia",
    "Romance",
    "Fantasia",
    "Aventura",
  ];

  // Estado del género seleccionado (null = todos)
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Si no hay user → fuera
  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  // Cargar catálogo + favoritos
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

  if (!user) return null;

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

  // FILTRADO FINAL
  const filteredItems = useMemo(() => {
    if (!selectedGenre) return items;
    return items.filter((m) =>
      m.genres.some((mg) => mg.genre?.name === selectedGenre)
    );
  }, [items, selectedGenre]);

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

        {/* FILTRO DE GÉNEROS */}
        {!loading && (
          <GenreFilter
            genres={allGenres}
            active={selectedGenre}
            onChange={setSelectedGenre}
          />
        )}

        {/* LISTA */}
        {loading ? (
          <div className="medialist-loading">Cargando películas...</div>
        ) : (
          <div className="medialist-grid">
            {filteredItems.map((m) => {
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
