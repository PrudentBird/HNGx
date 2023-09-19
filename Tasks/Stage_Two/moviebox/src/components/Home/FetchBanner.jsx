import React, { useState, useEffect } from 'react';
import Banner from './Banner';

const FetchBanner = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey =  process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setPopularMovies(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }

  if (popularMovies.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * popularMovies.length);
  const randomMovie = popularMovies[randomIndex];

  return (
    <div>
      <Banner movieData={randomMovie} />
    </div>
  );
};

export default FetchBanner;
