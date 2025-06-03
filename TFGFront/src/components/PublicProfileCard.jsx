import React, { useEffect, useState, useCallback } from 'react';
import { getUser, searchUserByNickname } from '../services/usuario.service';
import { useUploadImage } from '../services/imageUpload.service';
import { getFavoritosUsuario } from '../services/favorito.service';
import { getMovieById } from '../services/movie.service';
import Image from '../assets/images/profile.png';
import '../styles/components/PublicProfileCard.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getRecomendacionesUsuario } from '../services/recomendacion.service';

const PublicProfileCard = ({ nickname }) => {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(false);
  const[moviesFavoritas, setMoviesFavoritas]= useState([]);
  const[moviesRecomendadas, setMoviesRecomendadas]= useState([]);
  const [mensaje, setMensaje] = useState(null);
  const location = useLocation();
  const { upload } = useUploadImage(); 
  const { nickname: nicknameEnUrl } = useParams();

  //Este obtiene el usuario desde el nickname(puede ser o no el usuario en sesión)
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

  //este obtiene el usuario en sesión para poder cambiar o no la imagen
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const u = await getUser();
      setCurrentUser(u);
    };
    fetchCurrentUser();
  }, []);


  //Obtener favoritos del usuario
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
            setMoviesFavoritas(pelis);
          } catch (error) {
            console.error("Error al obtener favoritos:", error);
          }
      };

      getFavoritos();
    }, [user]);

    //Obtener recomendaciones del usuario
     useEffect(() => {
      const getRecomendaciones = async () => {
        if (!user?.id) return;

          const storedMovies = localStorage.getItem('topMovies');
          let topMovies = storedMovies ? JSON.parse(storedMovies) : [];

          try {
            const recomendaciones = await getRecomendacionesUsuario(user.id);

            // Verificar si ya están todas en cache
            const pelis = await Promise.all(
            recomendaciones.map(async (recomendacion) => {
              const cached = topMovies.find((m) => m.id === recomendacion.pelicula.id);

              if (cached) {
                return cached;
              } else {
                const peli = await getMovieById(recomendacion.pelicula.id);
                topMovies.push(peli); // guardar en memoria
                return peli;
              }
            })
            );

            // Guardamos el cache actualizado en localStorage
            localStorage.setItem('topMovies', JSON.stringify(topMovies));
            setMoviesRecomendadas(pelis);
          } catch (error) {
            console.error("Error al obtener favoritos:", error);
          }
      };

      getRecomendaciones();
    }, [user]);

     useEffect(() => {
        if (location.state?.mensaje) {
            setMensaje(location.state.mensaje);

            // Limpia el mensaje después de unos segundos
            const timer = setTimeout(() => setMensaje(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [location.state]);

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
       {mensaje && (
                <div className="mensaje-flotante">
                    {mensaje}
                </div>
            )}
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

      {/* si es el usuario en sesion puede cambiar la imagen sino no */}
      {currentUser?.nickname === nicknameEnUrl && (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <button onClick={handleButtonClick} className="upload-button">
            Cambiar imagen
          </button>
        </>
      )}

     </div>
     </div>

     <div className='last-favorites'>
       <h2>Últimos favoritos</h2>
       <div className="favorites-flex">
          {moviesFavoritas.slice(-6).reverse().map((movie) => (
            <Link to={`/movie/${movie.primaryTitle}`} key={movie.id} className="favorite-movie">
              <img src={movie.primaryImage} alt={movie.primaryTitle} />
              <h3>{movie.primaryTitle}</h3>
            </Link>
          ))}
       </div>
     </div>

     <div className='last-favorites'>
       <h2>Últimas Recomendaciones</h2>
       <div className="favorites-flex">
          {moviesRecomendadas.slice(-6).reverse().map((movie) => (
            <Link to={`/movie/${movie.primaryTitle}`} key={movie.id} className="favorite-movie">
              <img src={movie.primaryImage} alt={movie.primaryTitle} />
              <h3>{movie.primaryTitle}</h3>
            </Link>
          ))}
       </div>
     </div>

          {/*desde el metodo getCriticasUsuario() del service se puede obtener la lista de criticas
            desde ahi acceder a la puntuacion y coemntario y luego con el idPeli obtener
            la imagen o titulo de la peli */}
    
    </div>
  );
};

export default PublicProfileCard;
