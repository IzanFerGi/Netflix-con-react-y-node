import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import AppHeader from '../components/AppHeader';
import GenreFilter from '../components/GenreFilter';

import '../styles/Start.css';
import '../styles/MediaList.css';

export default function Favorites() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Misma lista de géneros
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

  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    if (!user) navigate('/login', { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;

    async function load() {
      try {
        const favRes = await api.get('/api/favorites', { params: { profileId: 1 }});
        setItems(favRes.data.map(f => f.media));
      } catch (error) {
        console.error('Error favoritos:', error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user]);

  if (!user) return null;

  // FILTRAR POR GENERO
  const filtered = useMemo(() => {
    if (!selectedGenre) return items;
    return items.filter((m) =>
      m.genres.some((mg) => mg.genre.name === selectedGenre)
    );
  }, [items, selectedGenre]);

  // SEPARAR SERIES DE PELICULAS
  const favSeries = filtered.filter(m => m.type === "SERIES");
  const favMovies = filtered.filter(m => m.type === "MOVIE");

  async function removeFav(mediaId) {
    try {
      await api.delete(`/api/favorites/${mediaId}`);
      setItems(prev => prev.filter(m => m.id !== mediaId));
    } catch (error) {
      console.error('Error al quitar favorito:', error);
    }
  }

  const MediaGrid = ({ list }) => (
    <div className="medialist-grid">
      {list.map((m) => {
        const genres = (m.genres || []).map(g => g.genre?.name).join(', ');
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
              className="media-remove-btn"
              onClick={() => removeFav(m.id)}
            >
              Quitar de favoritos
            </button>
          </article>
        );
      })}
    </div>
  );

  return (
    <div className="start-page">
      <header className="start-hero start-hero--small">
        <div className="start-hero-overlay" />
        <div className="start-hero-content">
          <AppHeader />
          <div className="start-hero-main">
            <h1 className="start-hero-title">Mis Favoritos</h1>
            <p className="start-hero-subtitle">
              Tus películas y series guardadas
            </p>
          </div>
        </div>
      </header>

      <main className="start-main">
        {!loading && (
          <GenreFilter
            genres={allGenres}
            active={selectedGenre}
            onChange={setSelectedGenre}
          />
        )}

        {loading ? (
          <div className="medialist-loading">Cargando favoritos...</div>
        ) : (
          <>
            <h2 className="start-row-title">Series</h2>
            {favSeries.length === 0 ? (
              <p>No tienes series favoritas</p>
            ) : (
              <MediaGrid list={favSeries} />
            )}

            <h2 className="start-row-title" style={{ marginTop: '3rem' }}>
              Películas
            </h2>

            {favMovies.length === 0 ? (
              <p>No tienes películas favoritas</p>
            ) : (
              <MediaGrid list={favMovies} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
