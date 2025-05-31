import React, { useEffect, useState, useCallback } from 'react';
import { searchUserByNickname } from '../services/usuario.service';
import { useUploadImage } from '../services/imageUpload.service';
import { getFavoritosUsuario } from '../services/favorito.service';
import { getMovieById } from '../services/movie.service';
import Image from '../assets/images/profile.png';
import '../styles/components/PublicProfileCard.css';

const PublicProfileCard = ({ nickname }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const[movies, setMovies]= useState([]);
  const { upload } = useUploadImage(); 

  const refreshUser = useCallback(async () => {
    const user = await searchUserByNickname(nickname);
    if (user) {
      setUser(user);
      console.log("Ruta de imagen:", user.imagenPerfil);
      setError(false);
    } else {
      setError(true);
    }
  }, [nickname]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

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
          }
      };

      getFavoritos();
    }, [user]);



  if (error) return <p>Usuario no encontrado</p>;
  if (!user) return <p>Cargando perfil...</p>;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !user?.id) return;

    const ok = await upload(file, user.id); 
    if (ok) {
      await refreshUser();
    }

    e.target.value = null;
  };

  const handleButtonClick = () => {
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.click();
    }
  }

 
  return (
    <div className="container">

    
    <div className="public-profile-card">
      <img
        src={
          user.imagenPerfil
            ? `http://localhost:8080/${user.imagenPerfil}`
            : Image
        }
        alt={`Avatar de ${user.nickname}`}
        className="public-profile-img"
      />

      <div className="public-profile-info">
        <h2 className='nombre'>{user.nombre}</h2>
        <h4 className='nickname'> @{user.nickname}</h4>

      
        <input
          type="file" 
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <button onClick={handleButtonClick} className="upload-button">
          Cambiar imagen
        </button> 
     </div>
     </div>

     <div className='last-favorites'>
       <h2>Últimos favoritos</h2>
       <div className="favorites-flex">
          {movies.slice(-6).reverse().map((movie) => (
            <div key={movie.id} className="favorite-movie">
              <img src={movie.primaryImage}></img>
              <h3>{movie.primaryTitle}</h3>
            </div>
          ))}
       </div>
     </div>

    
    </div>
  );
};

export default PublicProfileCard;
