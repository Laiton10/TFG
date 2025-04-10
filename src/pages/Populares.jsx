import React from 'react'
import '../styles/pages/Populares.css'
import { useState, useEffect } from 'react'
import '../components/Movie-Card'
import { MovieCard } from '../components/Movie-Card'

function Populares() {
  return (
    <div className='image-grid'>
      <MovieCard/>
      <MovieCard/>
      <MovieCard/>
      <MovieCard/>
      <MovieCard/>
      <MovieCard/>
      <MovieCard/>
      <MovieCard/>
      <MovieCard/>
      <MovieCard/>
      <MovieCard/>
      <MovieCard/>
      <MovieCard/>
      <MovieCard/>
      <MovieCard/>
      <MovieCard/>
    </div>
  )
}

export default Populares