import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import MovieCard from '../components/Home/MovieCard';
import Footer from '../components/Footer/Footer';
import '../components/Search/Search.css';

const Search = () => {
	const [noResult, setNoResult] = useState(false);
    const [movies, setMovies] = useState([]);
    const { search } = useLocation();
    const decodedQuery = decodeURIComponent(search.split("=")[1]);

    useEffect(() => {
        const apiKey =  process.env.REACT_APP_API_KEY;
        const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${decodedQuery}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;
          
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results.length < 1) {
                setNoResult(true);
                return;
            } else {
                setMovies(data.results);
            }
        })
        .catch(err => console.error(err));        
    }, [decodedQuery]);


  return (
    <div>
        <Nav className="search-nav" />
        <div className="search-container">
            <div className='search-header'>
                <h2>Search Results for '{`${decodedQuery}`}'</h2>
                <Link className='buttonNavLink' to="/">
                    <button className='search-ctabtn'>
                        <span>
                        Back&nbsp;Home
                        </span>
                        <i className='search-ctabtn-icon fa-solid fa-chevron-right'></i>
                    </button>
                </Link>
            </div>
            <div className="search-results">
            {movies.length > 1 &&
                movies.map((movie) => (
                    movie.poster_path && (
                        <MovieCard key={movie.id} movie={movie} />
                    )
                ))}
            {noResult && <h2 className="noresult">No Movie found</h2>}
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Search