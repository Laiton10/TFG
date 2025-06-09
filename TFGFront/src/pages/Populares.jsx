import { useState, useEffect } from 'react';
import '../styles/pages/Populares.css';
import { MovieCard } from '../components/Movie-Card';
import { getTopMovies, insertMovieDB } from '../services/movie.service';

function Populares() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const EXPECTED_COUNT = 250; // nº de pelis que esperamos

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let moviesList = [];

        const stored = localStorage.getItem('topMovies');
        if (stored) {
          const cached = JSON.parse(stored);
          if (Array.isArray(cached) && cached.length === EXPECTED_COUNT) {
            moviesList = cached;
          }
        }

        if (moviesList.length !== EXPECTED_COUNT) {
          const response = await getTopMovies();
          moviesList = response.data || [];
          // filtro nulos y guardo cache nuevo
          const clean = moviesList.filter(m => m && m.id != null);
          localStorage.setItem('topMovies', JSON.stringify(clean));
          moviesList = clean;
        }

        for (const m of moviesList) {
          try {
            if (m.id != null) {
              console.log("Insertando en BBDD:", m.id);
              await insertMovieDB(m.id);
            }
          } catch (err) {
            console.error(`Error al insertar ${m.id}:`, err);
          }
        }

        setMovies(moviesList);
      } catch (err) {
        console.error('Error cargando películas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filtered = movies.filter(movie =>
    movie.primaryTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Buscar película..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="image-grid">
        {filtered.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Populares;
