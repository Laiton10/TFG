import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieById } from '../services/movie.service';
import "../styles/components/Critica.css"
import { getUser } from '../services/usuario.service';
import { addCritica } from '../services/critica.service';

    const Critica = () => {

        const[movie, setMovie]= useState(null);
        const[user, setUser]= useState(null);
        const [texto, setTexto] = useState(null);
        const [puntuacion, setPuntuacion] = useState(5);
        const [mensaje, setMensaje] = useState(null);
        const {id}= useParams();
        const navigate= useNavigate();

        useEffect(() => {
         const getPelicula = async () => {
            const storedMovies = localStorage.getItem('topMovies');

                if (storedMovies) {
                    console.log("Cargando desde localStorage...");
                    const movies = JSON.parse(storedMovies);
                    const foundMovie = movies.find((m) => m.id === id);

                    if (foundMovie) {
                        setMovie(foundMovie);
                        return;
                    }
                }

            console.log("Cargando desde la API...");
            const peli = await getMovieById(id);

            // Guardar en localStorage si no estaba
            const updatedMovies = storedMovies
            ? [...JSON.parse(storedMovies), peli]
            : [peli];

            localStorage.setItem('topMovies', JSON.stringify(updatedMovies));
            setMovie(peli);
         };

            getPelicula();
        }, [id]);

        useEffect(() => {
            const cargarUser= async() =>{
                const usuario= await getUser();
                setUser(usuario);
            }
            cargarUser();
        }, []);

        const handleSubmit= async (e)=>{
            e.preventDefault();
            console.log(movie.id, user.id, texto, puntuacion);
            const resultado = await addCritica(movie.id, user.id, texto, puntuacion);
            if(resultado){
                navigate(`/portalFilme/${user.nickname}`, {
                    state: { mensaje: 'Crítica publicada correctamente' }
                });
            }else{
                setMensaje('Error al publicar la crítica');
            }
        };

        useEffect(() => {
          if (mensaje) {
            const timer = setTimeout(() => {
              setMensaje(null);
            }, 3000);
        
            return () => clearTimeout(timer);
          }
        }, [mensaje]);




        if (!movie) {
        return <div>Cargando película...</div>;
    }
        
    return (
        <>
        <div className="peliculaCritca">
        <div className='tituloPeliCritica'>
            <h2>{movie ? movie.primaryTitle : "Cargando..."}</h2>
            <img className="imagenPosterCritica" src={movie?.primaryImage} alt={movie.primaryTitle} />
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
                    onChange={(e) => setPuntuacion(Number(e.target.value))}
                />
                <span className="puntuacion-num">{puntuacion}</span>
                </div>
            </div>
            <textarea
                id="texto"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Escribe aquí tu opinión sobre la película..."
                rows={8}
            />
            <button type="submit">Enviar crítica</button>
        </form>
        </div>

        <div>
            <h2>Críticas de {movie.primaryTitle}</h2>
             {/*desde el metodo getCriticasPeli() del service se puede obtener la lista de criticas
            desde ahi acceder a la puntuacion y coemntario y luego con el idPeli obtener
            la imagen o titulo de la peli */}

        </div>


        </>
    )
    }

    export default Critica;