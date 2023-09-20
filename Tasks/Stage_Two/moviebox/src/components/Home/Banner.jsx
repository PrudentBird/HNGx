import React from 'react';
import { useState, useEffect } from 'react';
import imdb from '../../assets/IMDb.png'
import fruit from '../../assets/Fruit.png'

const Banner = ({ movieData }) => {
  const [videoLink, setVideoLink] = useState('');
  
  useEffect(() => { 
    if (movieData && movieData.title) {
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      
      const query = movieData.title;
      const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${query}&type=video`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          
          if (data.items && data.items.length > 0) {
            const videoId = data.items[0].id.videoId;
            const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
            setVideoLink(videoUrl);
          } else {
            setVideoLink('No videos found');
          }
        })
        .catch((error) => {
          console.error('Error fetching YouTube video:', error);
        });
      }
    }, [movieData]);
    
    const handleWatchTrailer = () => {
      if (videoLink !== 'No videos found') {
        window.open(videoLink, '_blank');
      }
    };
    
    if (!movieData || !movieData.title) {
      return null;
    }
    const bannerImgBlockBgImg = {
      backgroundImage: `url('https://image.tmdb.org/t/p/original${movieData.backdrop_path}')`,
    };

  
  return (
    <div>
      <div className="banner-container">
        <div className="banner-img-block" style={bannerImgBlockBgImg}>
          <div className="banner-img-overlay">
            <div className="banner-content-block">
              <div className="banner-content">
                <h1 className='banner-content-title'>{movieData.title}</h1>
                <div className='banner-movie-ratings'>
                <div className='banner-movie-rating'>
                  <div className="banner-rating-img-block-average">
                    <img src={imdb} alt="IMDb logo" />
                  </div>
                  <p>{Math.round(movieData.vote_average * 10)} / 100</p>
                </div>
                <div className='banner-movie-rating'>
                  <div className="banner-rating-img-block-count">
                    <img src={fruit} alt="Fruit icon" />
                  </div>
                  <p>{Math.min(Math.round(movieData.popularity), 100)}%</p>
                </div>
              </div>
                <p className='banner-content-overview'>{movieData.overview}</p>
                <button className='banner-ctabtn' onClick={handleWatchTrailer}>
                  <i className="banner-ctabtn-icon fa-solid fa-circle-play"></i>
                  <span>Watch Trailer</span>
                </button>
              </div>
              <div className="banner-pagination">
                <i className='banner-page-indicator fa-solid fa-minus'></i>
                <ul className='banner-page-list'>
                  <li className='banner-page-list-item'>1</li>
                  <li className='banner-page-list-item'>2</li>
                  <li className='banner-page-list-item active-page-list-item'>3</li>
                  <li className='banner-page-list-item'>4</li>
                  <li className='banner-page-list-item'>5</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
