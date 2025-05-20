import React, { use, useEffect, useState } from 'react';
import "../styles/components/Movie-detail-layout.css";
import { getMovieByTitle } from '../services/movie.service';
import { getUser } from '../services/usuario.service';
import { addFavorito } from '../services/favorito.service';

function MovieDetailLayout({ title }) {
    const camera = <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 256 256"><path fill="#a9cc30" d="M216 106H86.68l122.85-32.43a6 6 0 0 0 4.26-7.38l-8.16-30a13.94 13.94 0 0 0-17-9.72L36.32 66.67a13.77 13.77 0 0 0-8.48 6.47a13.57 13.57 0 0 0-1.36 10.42L34 111.34V200a14 14 0 0 0 14 14h160a14 14 0 0 0 14-14v-88a6 6 0 0 0-6-6m-90.25-50.52l33 19.07l-42.43 11.2l-33-19.07Zm66-17.41a1.92 1.92 0 0 1 2.34 1.26l6.57 24.18l-25.4 6.69l-33-19.07ZM38.23 79.14a1.85 1.85 0 0 1 1.15-.87L66.86 71l33 19.08l-55.2 14.6l-6.6-24.27a1.63 1.63 0 0 1 .17-1.27M210 200a2 2 0 0 1-2 2H48a2 2 0 0 1-2-2v-82h164Z"></path></svg>
    const clock = <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none" stroke="#a9cc30" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><path d="M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0"></path><path d="M12 6v6l4 2"></path></g></svg>
    const score = <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="#a9cc30" stroke-width="1.5" d="M9.153 5.408C10.42 3.136 11.053 2 12 2s1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182s.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506s-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452s-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882S3.58 8.328 6.04 7.772l.636-.144c.699-.158 1.048-.237 1.329-.45s.46-.536.82-1.182z"/></svg>
    const genre = <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="#a9cc30" d="M2.616 20.5v-17h18.769v17zm1-1h3v-3h-3zm13.769 0h3v-3h-3zM11.5 15.923h1v-5.115h-1zM3.616 15.5h3v-3h-3zm13.769 0h3v-3h-3zm-13.77-4h3v-3h-3zm13.77 0h3v-3h-3zM12 9q.262 0 .439-.177q.176-.177.176-.438q0-.262-.177-.439T12 7.77t-.438.177t-.177.439t.177.438T12 9M3.615 7.5h3v-3h-3zm13.77 0h3v-3h-3zm-9.77 12h8.77v-15h-8.77zm0-15h8.77z"/></svg>
    const actors = <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16"><g fill="none" stroke="#a9cc30" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.8"><circle cx="5" cy="9" r="2.25"/><circle cx="11" cy="4" r="2.25"/><path d="M7.75 9.25c0-1 .75-3 3.25-3s3.25 2 3.25 3m-12.5 5c0-1 .75-3 3.25-3s3.25 2 3.25 3"/></g></svg>
    const available = <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 20 20"><path fill="#a9cc30" d="M9.995 0C4.475 0 0 4.475 0 9.995s4.475 9.996 9.995 9.996s9.996-4.475 9.996-9.996C19.99 4.475 15.516 0 9.995 0M2 9.995a7.995 7.995 0 1 1 15.99 0a7.995 7.995 0 0 1-15.99 0m12.207-3.202a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.793-3.793a1 1 0 0 1 1.414 0"/></svg>
    const star= <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="#f1fe00" d="m8.85 16.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425zm3.15-.723l-3.63 2.192q-.16.079-.297.064q-.136-.016-.265-.094q-.13-.08-.196-.226t-.012-.319l.966-4.11l-3.195-2.77q-.135-.11-.178-.263t.019-.293t.165-.23q.104-.087.28-.118l4.216-.368l1.644-3.892q.068-.165.196-.238T12 5.364t.288.073t.195.238l1.644 3.892l4.215.368q.177.03.281.119q.104.088.166.229q.061.14.018.293t-.178.263l-3.195 2.77l.966 4.11q.056.171-.011.318t-.197.226q-.128.08-.265.095q-.136.015-.296-.064zm0-3.852"></path></svg>
    const favorite= <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="#f1fe00" d="m12 16.102l-3.63 2.192q-.16.079-.297.064q-.136-.016-.265-.094q-.13-.08-.196-.226t-.012-.319l.966-4.11l-3.195-2.77q-.135-.11-.178-.263t.019-.293t.165-.23q.104-.087.28-.118l4.216-.368l1.644-3.892q.068-.165.196-.238T12 5.364t.288.073t.195.238l1.644 3.892l4.215.368q.177.03.281.119q.104.088.166.229q.061.14.018.293t-.178.263l-3.195 2.77l.966 4.11q.056.171-.011.318t-.197.226q-.128.08-.265.095q-.136.015-.296-.064z"></path></svg>


    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(false);
    const[user, setUser]= useState(null);

    const handleClick = async() => {
    setSelected(prev => !prev);
        if(selected){
            await addFavorito(movie.id, user);
        }
  };

    useEffect(() => {
        if (title) {
            const fetchMovie = async () => {
                try {
                    const response = await getMovieByTitle(title);
                    console.log("Respuesta de la API:", response);
                    console.log("ID:", response[0].imdbId);

                    const foundMovie = response.find(
                        (item) =>
                            item.showType === 'movie' &&
                            item.title?.toLowerCase() === title.toLowerCase()
                    );

                    if (foundMovie) {
                        setMovie(foundMovie);
                    } else {
                        console.warn("Película no encontrada en los resultados.");
                    }
                } catch (error) {
                    console.error('Error fetching movie:', error);
                } finally {
                    setLoading(false); // Finaliza carga
                }
            };

            fetchMovie();
        }
    }, [title]);

   useEffect(() => {
    const fetchUser = async () => {
        const usuario = await getUser();
        setUser(usuario);
    };

    fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner" />
            </div>
        );
    }

    return (
        <div className="pelicula">
            <div onClick={handleClick}>
                {selected ? favorite : star}
            </div>
            <div className='tituloPeli'>
                <h2>{movie ? movie.title : "Cargando..."}</h2>
                <img className="imagenPoster" src={movie.imageSet?.verticalPoster?.w720} alt={movie.title} />
            </div>
            <div className='infoPeli'>
                <p className='overview'><strong>{movie.overview}</strong></p>
                <p><span>{camera}</span><strong><span>Director:</span></strong> {movie.directors} </p>
                <p><span>{clock}</span><strong><span>Duración:</span> </strong>{movie.runtime} </p>
                <p><span>{score}</span><strong><span>Puntuación: </span></strong>{movie.rating} </p>
                <p><span>{genre}</span><strong><span>Género: </span></strong>{movie.genres?.map((g) => g.name).join(', ')}</p>
                <p><span>{actors}</span><strong><span>Reparto: </span></strong> {movie.cast}</p>
                <p><span>{available}</span><strong><span>Disponible en: </span></strong>{" "}
                    {movie.streamingOptions?.es?.map((s) => s.service.name).join(', ') || "No disponible"}
                </p>
            </div>
        </div>
    );
}

export default MovieDetailLayout;
