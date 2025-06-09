import React, { useEffect, useState, useCallback } from 'react';
import { getUser, searchUserByNickname } from '../services/usuario.service';
import { useUploadImage } from '../services/imageUpload.service';
import { getFavoritosUsuario } from '../services/favorito.service';
import { getMovieById } from '../services/movie.service';
import Image from '../assets/images/profile.png';
import '../styles/components/PublicProfileCard.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getRecomendacionesUsuario } from '../services/recomendacion.service';
import { getCriticasUsuario } from '../services/critica.service';

const PublicProfileCard = ({ nickname }) => {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [error, setError] = useState(false);

  const[moviesFavoritas, setMoviesFavoritas]= useState([]);
  const [favLoaded, setFavLoaded] = useState(false);

  const[moviesRecomendadas, setMoviesRecomendadas]= useState([]);
  const [recLoaded, setRecLoaded] = useState(false);

  const [mensaje, setMensaje] = useState(null);
  const [criticas, setCriticas] = useState([]);
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

  //El flujo funciona así:
  //1. Primero se obtiene el usuario por nickname
  //2. Luego se obtienen los favoritos del usuario, hasta que no se cargan todos los favoritos no pasa a ejecutarse el hook de recomendaciones
  //3. Luego se obtienen las recomendaciones del usuario, hasta que no se cargan todas las recomendaciones no pasa a ejecutarse el hook de críticas
  //4. Finalmente se obtienen las críticas del usuario
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
            const clean = topMovies.filter(m => m && m.id != null);
            localStorage.setItem('topMovies', JSON.stringify(clean));
            setMoviesFavoritas(pelis);
            setFavLoaded(true);
          } catch (error) {
            console.error("Error al obtener favoritos:", error);
          }
      };

      getFavoritos();
    }, [user]);

    //Obtener recomendaciones del usuario
     useEffect(() => {
      const getRecomendaciones = async () => {
        if (!user?.id || !favLoaded) return;

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
            const clean = topMovies.filter(m => m && m.id != null);
            localStorage.setItem('topMovies', JSON.stringify(clean));
            setMoviesRecomendadas(pelis);
            setRecLoaded(true);
          } catch (error) {
            console.error("Error al obtener favoritos:", error);
          }
      };

      getRecomendaciones();
    }, [user, favLoaded]);

    useEffect(() => {
      const getMisCriticas = async () => {
        if (!user?.id || !recLoaded) return;

        const stored = JSON.parse(localStorage.getItem('topMovies') || '[]');
        let topMovies = Array.isArray(stored)
          ? stored.filter(m => m && m.id != null)
          : [];

        try {
          const data = await getCriticasUsuario(user.id);
          if (!Array.isArray(data)) {
            setCriticas([]);
            return;
          }

          const detalleCriticas = await Promise.all(
            data.map(async (c) => {
              let mov = topMovies.find(m => m.id === c.pelicula.id);
              if (!mov) {
                mov = await getMovieById(c.pelicula.id);
                topMovies.push(mov);
              }
              return {
                id: c.id,  
                movieId: c.pelicula.id,                  
                title: mov.primaryTitle,     
                comentario: c.comentario,    
                puntuacion: c.puntuacion     
              };
            })
          );
          const clean = topMovies.filter(m => m && m.id != null);
          localStorage.setItem('topMovies', JSON.stringify(clean));

          setCriticas(detalleCriticas);
        } catch (err) {
          console.error('Error al obtener críticas:', err);
          setCriticas([]);
        }
      };

      getMisCriticas();
    }, [user, recLoaded]);


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
      <div className="mis-criticas">
        <h2>Mis Críticas</h2>
        <div className="criticas-grid">
          {criticas.length === 0 ? (
            <p className="no-criticas">No hay críticas todavía.</p>
          ) : (
            criticas.map(c => (
              <div className="critica-item" key={c.id}>
                <h3>{c.title}</h3>
                <p className="critica-text">{c.comentario}</p>
                <div className="critica-puntuacion-boton">
                <Link to={`/critica/${c.movieId}/${nicknameEnUrl}`} className="critica-btn">
                  Ver Crítica
                </Link>
                <p className='puntuacion-critica'>Puntuación: {c.puntuacion}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    
    </div>
  );
};

export default PublicProfileCard;
