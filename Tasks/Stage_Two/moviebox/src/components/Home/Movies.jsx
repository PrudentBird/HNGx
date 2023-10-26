// import React from 'react'
import { useState, useEffect } from 'react'
import MovieCard from './MovieCard'
import { Link } from 'react-router-dom'

const Movies = () => {
    const [ movies, setMovies ] = useState([])

    useEffect(() => {
      const apiKey = process.env.REACT_APP_API_KEY;
      const apiUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`;
      
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => setMovies(data.results))
        .catch(err => console.error(err));
    }, [])


  return (
    <div>
      <div className='featured-container'>
      <div className="featured-header">
        <h2>Featured Movies</h2>
        <Link className='featured-ctabtn-wrap' to="/discover" >
          <button className='featured-ctabtn'>
            <span>
              See&nbsp;More
            </span>
            <i className='featured-ctabtn-icon fa-solid fa-chevron-right'></i>
          </button>
        </Link>
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