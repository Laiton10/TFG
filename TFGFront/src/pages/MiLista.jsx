import React, { useEffect, useState } from 'react'
import { getFavoritosUsuario } from '../services/favorito.service';
import { getUser } from '../services/usuario.service';
import { getMovieById } from '../services/movie.service';
import { MovieCard } from '../components/Movie-Card';

const MiLista = () => {
    const[user, setUser]= useState(null);
    const[movies, setMovies]= useState([]);
    const[loading, setLoading]=useState(true);

    useEffect(() => {
      const getUsuario = async () => {
        const token = localStorage.getItem("token");
        const usuario = await getUser(token);
        setUser(usuario);
    };
    getUsuario();
  }, []); 
        
      useEffect(() => {
  const getFavoritos = async () => {
    if (user?.id) {
      try {
        const favoritos = await getFavoritosUsuario(user.id);

        // Creamos un array de promesas para obtener todas las películas
        const promesasPeliculas = favoritos.map((favorito) =>
          getMovieById(favorito.pelicula.id)
        );

        // Esperamos a que todas las promesas se resuelvan
        const pelis = await Promise.all(promesasPeliculas);

        setMovies(pelis); // Guardamos las películas ya resueltas
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener favoritos:", error);
        setLoading(false);
      }
    }
  };

  getFavoritos();
}, [user]);


  if (loading) {
        return (
          <div className="loading">
            <h2>Cargando películas...</h2>
          </div>
        );
      }
  
      return (
        <div>
          <div className="image-grid">
            {movies.length > 0 ? (
            movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No tienes películas favoritas aún.</p>
        )}
      </div>
        </div>
      );
}

export default MiLista