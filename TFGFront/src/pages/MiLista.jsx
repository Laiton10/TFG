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
          if (!user?.id) return;
  
            const storedMovies = localStorage.getItem('topMovies');
            let topMovies = storedMovies ? JSON.parse(storedMovies) : [];
  
            try {
              const favoritos = await getFavoritosUsuario(user.id);
  
              // Verificar si ya están todas en cache
              const pelis = await Promise.all(
              favoritos.map(async (favorito) => {
                const cached = topMovies.find((m) => m.id === favorito.pelicula.id);
  
                if (cached) {
                  return cached;
                } else {
                  const peli = await getMovieById(favorito.pelicula.id);
                  topMovies.push(peli); // guardar en memoria
                  return peli;
                }
              })
              );
  
              // Guardamos el cache actualizado en localStorage
              localStorage.setItem('topMovies', JSON.stringify(topMovies));
              setMovies(pelis);
            } catch (error) {
              console.error("Error al obtener favoritos:", error);
            } finally{
              setLoading(false);
            }
        };
  
        getFavoritos();
      }, [user]);
  
 if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner" />
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
          <p>No tienes películas favoritas aún.</p>
        )}
      </div>
        </div>
      );
}

export default MiLista