import React from 'react';   
import  MovieDetailLayout  from '../components/MovieDetail-Layout';
import { useParams } from 'react-router-dom';

function MovieDetail() {

  const { title } = useParams(); //cogemos el title de la URL, es un hook que obtiene parámetros de la URL actual

  return (
    <MovieDetailLayout title={title} />
  )
}

export default MovieDetail