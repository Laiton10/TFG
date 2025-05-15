import React from 'react';   
import  MovieDetailLayout  from '../components/MovieDetail-Layout'; // Importamos el layout de detalle de película
import { useParams } from 'react-router-dom';

function MovieDetail() {

  const { title } = useParams(); //cogemos el title de la URL, es un hook que obtiene parámetros de la URL actual
  console.log("Título de la película:", title); // Mostramos el título en la consola

  return (
    <MovieDetailLayout title={title} />
  )
}

export default MovieDetail