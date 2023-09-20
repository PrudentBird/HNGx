import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidenav from '../components/Sidenav/Sidenav';
import '../components/Movie/Movie.css';
import FetchRelated from '../components/Movie/FetchRelated';


const Movie = () => {
  const { movieId } = useParams();
  const [movie, setMovieDetail] = useState({});
  const [cast, setCast] = useState([]);

 useEffect(() => {
    const apiKey =  process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    const apiCastUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US&api_key=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then((data) => setMovieDetail(data))
      .catch(err => console.error(err));

    fetch(apiCastUrl)
      .then((response) => response.json())
      .then((data) => { const filteredCast = data.cast.filter((castMember) => castMember.popularity > 20); setCast(filteredCast); })
      .catch((err) => console.error(err));
  }, [movieId]);  

  return (
    <div className='movie-details-page-wrap'>
      <Sidenav />
      <div className='movie-details-wrap'>
        <div className='movie-trailer-preview-wrap'>
          <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="" />
        </div>
        <div className='movie-details-info-wrap'>
          <div className='movie-details-info-main'>
            <div className='movie-details-info-main-header'>
              <div className='movie-details-info-header'>
                <h2 data-testid='movie-title'>{movie.original_title}</h2>
                <p data-testid='movie-release-date'>{movie.release_date}</p>
                <p data-testid='movie-runtime'>{`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}</p>
                <div>
                  {movie.genres && Array.isArray(movie.genres) && movie.genres.map((genre, index) => (
                    <button key={index}>
                      {genre.name}
                    </button>
                  ))}
                </div>
              </div>
              <p data-testid='movie-overview'>{movie.overview}</p>
            </div>
            <div className='movie-details-info-main-footer'>
              <div className='movie-info-cast-wrap'>
              <p>Credits: {cast.map((castMember) => `${castMember.name}(${castMember.character})`).join(', ')}</p>
              </div>
              <div className='movie-detail-info-rating'>
                <div className='movie-detail-rating-wrap'>
                  <div className='movie-detail-rating'>
                    <span>Top&nbsp;Rated&nbsp;Movie&nbsp;#{Math.round(movie.vote_average * 10)}</span>
                  </div>
                  <div className='movie-detail-rating-side'>
                    <span className='movie-detail-rating-span'>Awards 9 nominations</span>
                    <i className="fa-solid fa-chevron-down"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className='movie-details-info-side'>
            <div className='movie-details-info-side-header'>
              <div className='movie-details-info-actions'>
                <i className="movie-details-info-action-icon fa-regular fa-heart"></i>
                <i className="movie-details-info-action-icon fa-regular fa-bookmark"></i>
                <i className="movie-details-info-action-icon fa-solid fa-arrow-up-right-from-square"></i>
              </div>
              <div className='movie-details-info-rating'>
                <i className="movie-details-info-action-icon fa-solid fa-star"></i>
                <p>{Math.round(movie.vote_average * 10)} / 100</p>
              </div>
            </div>
            <div className='movie-recommendations-wrap'>
              <div className='movie-recommendations-cta'>
                <button className='movie-recommendations-ctabtn'>
                  <i className="fa-solid fa-ticket"></i>
                  <span>See showtimes</span>
                </button>
                <button className='movie-recommendations-ctabtn'>
                  <i className="fa-solid fa-list-ul"></i>
                  <span>More watch options</span>
                </button>
              </div>          
              <div className='recommended-movies'>
                <FetchRelated /> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movie