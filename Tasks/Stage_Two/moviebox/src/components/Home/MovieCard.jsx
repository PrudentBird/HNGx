import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import imdb from '../../assets/IMDb.png';
import fruit from '../../assets/Fruit.png';

const MovieCard = ({ movie }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleFavourite = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  const iconClass = `favourite-icon ${isActive ? 'active fa-solid' : 'fa-regular'} fa-heart`;

  const [genreData, setGenreData] = useState([]);
  const [genreNames, setGenreNames] = useState([]);

  useEffect(() => {
    const apiKey =  process.env.REACT_APP_API_KEY;
    const apiUrl =`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.genres && Array.isArray(data.genres)) {
          setGenreData(data.genres);
        } else {
          console.error('Invalid genre data received from API:', data);
        }
      })
      .catch((error) => console.error('Error fetching genre data:', error));
  }, []);

  useEffect(() => {
    if (movie && movie.genre_ids && Array.isArray(movie.genre_ids) && genreData.length > 0) {
      const genreNames = movie.genre_ids.map((genreId) => {
        const matchedGenre = genreData.find((genre) => genre.id === genreId);
        return matchedGenre ? matchedGenre.name : 'Unknown Genre';
      });
      setGenreNames(genreNames);
    }
  }, [movie, genreData]);

  const movieId = movie.id;

  return (
    <div>
      <div className="moviecard">
        <Link to={`/movie/${movieId}`} className='link-container' data-testid='movie-card'>
          <div className="moviecard-content">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" className='movie-poster' data-testid='movie-poster' />
            <div className="favourite-wrap">
              <div className="favourite-container" onClick={toggleFavourite}>
                <i className={iconClass}></i>
              </div>  
            </div>
            <div className="movie-info">
              <p className='movie-release-date' data-testid='movie-release-date'>{movie.release_date.split('-')[0]}</p>
              <h4 className='movie-title' data-testid='movie-title'>{movie.original_title}</h4>
              <div className='movie-ratings'>
                <div className='movie-rating'>
                  <div className="rating-img-block-average">
                    <img src={imdb} alt="IMDb logo" />
                  </div>
                  <p>{Math.round(movie.vote_average * 10)} / 100</p>
                </div>
                <div className='movie-rating'>
                  <div className="rating-img-block-count">
                    <img src={fruit} alt="Fruit icon" />
                  </div>
                  <p>{Math.min(Math.round(movie.popularity), 100)}%</p>
                </div>
              </div>
              <p className='movie-genres'>{genreNames.join(', ')}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
