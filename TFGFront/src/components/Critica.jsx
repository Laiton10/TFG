    import React, { useEffect, useState } from 'react'
    import { useParams } from 'react-router-dom';
    import { getMovieById } from '../services/movie.service';
    import "../styles/components/Critica.css"

    const Critica = () => {

        const[movie, setMovie]= useState(null);
        const [texto, setTexto] = useState(null);
        const [puntuacion, setPuntuacion] = useState(5);
        const {id}= useParams();

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

        const handleSubmit= (()=>{

        })


        if (!movie) {
        return <div>Cargando película...</div>;
    }
        
    return (
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

            <label htmlFor="texto" className="critica-label">Tu crítica:</label>
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
    )
    }

    export default Critica;