import React from 'react'
import { useState, useEffect } from 'react'
import MovieCard from './MovieCard'

const Movies = () => {
    const [ movies, setMovies ] = useState([])

    useEffect(() => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
        }
      };
      
      fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(data => setMovies(data.results))
        .catch(err => console.error(err));
    }, [])


  return (
    <div>
      <div className='featured-container'>
      <div className="featured-header">
        <h2>Featured Movies</h2>
        <button className='featured-ctabtn'>
          <span>
            See&nbsp;More
          </span>
          <i className='featured-ctabtn-icon fa-solid fa-chevron-right'></i>
        </button>
      </div>
      <div className='featured-movies'>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
    </div>
  )
}

export default Movies