import React, { useState, useEffect } from 'react';
import Related from './Related';

const FetchRelated = () => {
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRelatedMovies(data.results);
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

  if (relatedMovies.length < 3) {
    return null;
  }

  const randomMovies = [];
  while (randomMovies.length < 2) {
    const randomIndex = Math.floor(Math.random() * relatedMovies.length);
    const randomMovie = relatedMovies[randomIndex];
    if (!randomMovies.includes(randomMovie)) {
      randomMovies.push(randomMovie);
    }
  }

  return (
    <div className='related-container'>
        <div className='related-wrap'>
          {randomMovies.map((movie, index) => (
            <Related key={index} movieData={movie} />
          ))}
        <div className='related-caption'>
            <i className="fa-solid fa-video"></i>
            <span>See Related Movies</span>
        </div>
        </div>
    </div>
      );
};

export default FetchRelated;
