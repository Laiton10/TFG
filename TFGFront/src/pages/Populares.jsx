  import { useState, useEffect } from 'react';
  import '../styles/pages/Populares.css';
  import { MovieCard } from '../components/Movie-Card';
  import { getTopMovies, insertMovieDB } from '../services/movie.service';

  function Populares() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
    const fetchMovies = async () => {
      try {
        let movies = [];

        const storedMovies = localStorage.getItem('topMovies');
        if (storedMovies) {
          console.log("Cargando desde localStorage...");
          movies = JSON.parse(storedMovies);
          setMovies(movies);
        } else {
          console.log("Cargando desde la API...");
          const response = await getTopMovies();
          movies = response.data;
          localStorage.setItem('topMovies', JSON.stringify(movies));
          setMovies(movies);
        }

        // En ambos casos, insertamos en BBDD
        for (const movie of movies) {
          try {
            console.log("Insertando en la BBDD:", movie.id);
            await insertMovieDB(movie.id); // solo manda el id
          } catch (error) {
            console.error(`Error al insertar la película con id ${movie.id}:`, error);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error('Error cargando películas:', error);
        setLoading(false);
      }
    };

    fetchMovies();
    }, []);


    const filteredMovies = movies.filter((movie) =>
      movie.primaryTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) {
      return (
        <div className="loading">
          <h2>Cargando películas...</h2>
        </div>
      );
    }

    return (
      <div>
        <div className='search-bar'>
          <input
            type="text"
            placeholder="&#128270; Buscar película..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='image-grid'>
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }

  export default Populares;
