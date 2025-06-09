import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/components/Critica.css";
import { getMovieById } from '../services/movie.service';
import { searchUserByNickname, getUser } from '../services/usuario.service';
import { getCriticasUsuario, addCritica } from '../services/critica.service';

const Critica = () => {
  const { id, nickname } = useParams();  
  const navigate = useNavigate();

  const [portalUser, setPortalUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [movie, setMovie] = useState(null);

  const [texto, setTexto] = useState('');
  const [puntuacion, setPuntuacion] = useState(5);
  const [hasReview, setHasReview] = useState(false);

  const [mensaje, setMensaje] = useState(null);

  //cargo el usuario del portal
  useEffect(() => {
    (async () => {
      const pu = await searchUserByNickname(nickname);
      setPortalUser(pu);
    })();
  }, [nickname]);

  // cargo el usuario logueado
  useEffect(() => {
    (async () => {
      const cu = await getUser();
      setCurrentUser(cu);
    })();
  }, []);

  // cargo los datos de la pelicula, primero los que están en caché, sino de la API
  useEffect(() => {
    (async () => {
      const stored = JSON.parse(localStorage.getItem('topMovies') || '[]');
      const found = Array.isArray(stored)
        ? stored.find(m => m.id === id)
        : null;
      if (found) {
        setMovie(found);
      } else {
        const fetched = await getMovieById(id);
        setMovie(fetched);
      }
    })();
  }, [id]);

  // cargo críticas de portalUser y busco la de esta peli en concreto
  useEffect(() => {
    if (!portalUser?.id || !movie) return;
    (async () => {
      const allCrits = await getCriticasUsuario(portalUser.id);
      if (Array.isArray(allCrits)) {
        const myCrit = allCrits.find(c => c.pelicula.id === id);
        if (myCrit) {
          setTexto(myCrit.comentario);
          setPuntuacion(myCrit.puntuacion);
          setHasReview(true);
        }
      }
    })();
  }, [portalUser, movie, id]);

  // envío de la crítica, si es el usuario logueado se puede enviar
  const handleSubmit = async e => {
    e.preventDefault();
    if (!movie?.id || !currentUser) return;

    const res = await addCritica(movie.id, currentUser.id, texto, puntuacion);
    if (res) {
      navigate(`/portalFilMe/${currentUser.nickname}`, {
        state: { mensaje: 'Crítica publicada correctamente' }
      });
    } else {
      setMensaje('Error al publicar la crítica');
    }
  };

  useEffect(() => {
    if (!mensaje) return;
    const t = setTimeout(() => setMensaje(null), 3000);
    return () => clearTimeout(t);
  }, [mensaje]);

  if (!portalUser || !movie || (currentUser === null)) {
    return <p>Cargando...</p>;
  }

  // Solo puedes editar si es tu propio portal y aun no has hecho critica
  const isOwnPortal = currentUser.nickname === portalUser.nickname;
  const canEdit = isOwnPortal && !hasReview;

  return (
    <>
      {mensaje && <div className="mensaje-flotante">{mensaje}</div>}

      <div className="peliculaCritca">
        <div className='tituloPeliCritica'>
          <h2>{movie.primaryTitle}</h2>
          <img
            className="imagenPosterCritica"
            src={movie.primaryImage}
            alt={movie.primaryTitle}
          />
        </div>

        <form className="formCritica" onSubmit={handleSubmit}>
          <div className="rating-range">
            <label htmlFor="puntuacion">Puntuación:</label>
            <div className="range-wrapper">
              <input
                type="range"
                id="puntuacion"
                min="0"
                max="10"
                value={puntuacion}
                onChange={e => setPuntuacion(Number(e.target.value))}
                disabled={!canEdit}
              />
              <span className="puntuacion-num">{puntuacion}</span>
            </div>
          </div>

          <textarea
            id="texto"
            value={texto}
            onChange={e => setTexto(e.target.value)}
            placeholder="Escribe tu crítica..."
            rows={8}
            readOnly={!canEdit}
          />

          {canEdit && (
            <button type="submit">Enviar crítica</button>
          )}

          {!canEdit && !hasReview && (
            <p className="no-critica-msg">
              Este usuario aún no ha publicado crítica para esta película.
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default Critica;
