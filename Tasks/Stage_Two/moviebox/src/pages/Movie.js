import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidenav from '../components/Sidenav/Sidenav';
import '../components/Movie/Movie.css';
import FetchRelated from '../components/Movie/FetchRelated';


const Movie = () => {
  const { movieId } = useParams();
  const [movie, setMovieDetail] = useState({});
  const [directors, setDirectors] = useState('');
  const [writers, setWriters] = useState('');
  const [stars, setStars] = useState('');

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    const apiCastUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US&api_key=${apiKey}`;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setMovieDetail(data))
      .catch((err) => console.error(err));
  
    fetch(apiCastUrl)
      .then((response) => response.json())
      .then((data) => {
        const directorsList = data.crew
          .filter((crewMember) => crewMember.job === 'Director')
          .map((director) => director.name)
          .slice(0, 6)
          .join(', ');
  
        const writersList = data.crew
          .filter((crewMember) => crewMember.department === 'Writing')
          .map((writer) => writer.name)
          .slice(0, 6)
          .join(', ');
  
        const starsList = data.cast
          .map((castMember) => castMember.name)
          .slice(0, 6)
          .join(', ');
  
        setDirectors(directorsList);
        setWriters(writersList);
        setStars(starsList);
      })
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
                <h2 data-testid='movie-title' className='movie-details-title'>{movie.original_title ? movie.original_title : 'Undefined'}</h2>
                <p data-testid='movie-release-date' className='movie-details-release-date'>{movie.release_date ? movie.release_date.split('-')[0] : 'Null'}</p>
                <p data-testid='movie-runtime' className='movie-details-runtime'>{`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}</p>
                <div className='movie-details-genre-wrap'>
                  {movie.genres && Array.isArray(movie.genres) && movie.genres.map((genre, index) => (
                    <button className='movie-details-genre' key={index}>
                      {genre.name}
                    </button>
                  ))}
                </div>
              </div>
              <p data-testid='movie-overview' className='movie-details-overview'>{movie.overview}</p>
            </div>
            <div className='movie-details-info-main-footer'>
              <div className='movie-info-credits-wrap'>
                <p className='movie-info-directors'>Directors: <span>{directors}</span></p>
                <p className='movie-info-writers'>Writers: <span>{writers}</span></p>
                <p className='movie-info-stars'>Stars: <span>{stars}</span></p>
              </div>
              <div className='movie-detail-info-rating'>
                <div className='movie-detail-rating-wrap'>
                  <div className='movie-detail-rating'>
                    <span>Top&nbsp;Rated&nbsp;Movie&nbsp;#{Math.round(movie.vote_average * 10)}</span>
                  </div>
                  <div className='movie-detail-rating-side'>
                    <span className='movie-detail-rating-span'>View Movie Cast</span>
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