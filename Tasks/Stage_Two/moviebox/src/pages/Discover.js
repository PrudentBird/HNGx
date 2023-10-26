import React from 'react'
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';
import { Link } from 'react-router-dom';
import MovieCard from '../components/Home/MovieCard';
import '../components/Discover/Discover.css';

const Discover = () => {
    const [ movies, setMovies ] = useState([]);
    const [ tvSeries, setTvSeries ] = useState([]);
    const discoverMoviesContentRef = useRef(null);
    const [moviesScrollPosition, setMoviesScrollPosition] = useState(0);
    const tvSeriesContentRef = useRef(null);
    const [tvSeriesScrollPosition, setTvSeriesScrollPosition] = useState(0);

    const handleMoviesScrollLeft = () => {
        if (discoverMoviesContentRef.current) {
            const newScrollPosition = moviesScrollPosition - 1000;
            discoverMoviesContentRef.current.scrollLeft = newScrollPosition;
            setMoviesScrollPosition(newScrollPosition);
        }
    };

    const handleMoviesScrollRight = () => {
        if (discoverMoviesContentRef.current) {
            const newScrollPosition = moviesScrollPosition + 1000;
            discoverMoviesContentRef.current.scrollLeft = newScrollPosition;
            setMoviesScrollPosition(newScrollPosition);
        }
    };

    const handleTvSeriesScrollLeft = () => {
        if (tvSeriesContentRef.current) {
            const newScrollPosition = tvSeriesScrollPosition - 1000;
            tvSeriesContentRef.current.scrollLeft = newScrollPosition;
            setTvSeriesScrollPosition(newScrollPosition);
        }
    };
    
    const handleTvSeriesScrollRight = () => {
        if (tvSeriesContentRef.current) {
            const newScrollPosition = tvSeriesScrollPosition + 1000;
            tvSeriesContentRef.current.scrollLeft = newScrollPosition;
            setTvSeriesScrollPosition(newScrollPosition);
        }
    };

    useEffect(() => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const moviesApiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`;
        
        fetch(moviesApiUrl)
            .then(response => response.json())
            .then(data => setMovies(data.results))
            .catch(err => console.error(err));
    }, [])
    
    useEffect(() => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const tvSeriesApiUrl = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`;
        
        fetch(tvSeriesApiUrl)
            .then(response => response.json())
            .then(data => setTvSeries(data.results))
            .catch(err => console.error(err));
    }, [])

  return (
    <div>
        <Nav className="discover-nav" />
        <div className='discover-wrap'>
            <div className='discover-movies-wrap'>
                <div className='discover-movies-header'>
                    <h2>Exciting Movies</h2>
                    <Link className='discover-ctabtn-wrap'>
                        <button className='discover-ctabtn'>
                            <span>See More</span>
                            <i className='fa-solid fa-chevron-right'></i>
                        </button>
                    </Link>
                </div>
                <div className='discover-movies-content scrollbar' ref={discoverMoviesContentRef}>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} isDiscoverPage={true} />
                    ))}
                </div>
                <div className='discover-movies-navigation'>
                    <div className='discover-movies-nav-left' onClick={handleMoviesScrollLeft}>
                        <i className='fa-solid fa-chevron-left'></i>
                    </div>
                    <div className='discover-movies-nav-right' onClick={handleMoviesScrollRight}>
                        <i className='fa-solid fa-chevron-right'></i>
                    </div>
                </div>
            </div>
            <div className='discover-tvseries-wrap'>
                <div className='discover-tvseries-header'>
                    <h2>Exciting TV Series</h2>
                    <Link className='discover-ctabtn-wrap'>
                        <button className='discover-ctabtn'>
                            <span>See More</span>
                            <i className='fa-solid fa-chevron-right'></i>
                        </button>
                    </Link>
                </div>
                <div className='discover-tvseries-content scrollbar' ref={tvSeriesContentRef}>
                    {tvSeries.map((tvShow) => (
                        <MovieCard key={tvShow.id} movie={tvShow} isDiscoverPage={true} />
                    ))}
                </div>
                <div className='discover-movies-navigation'>
                    <div className='discover-movies-nav-left' onClick={handleTvSeriesScrollLeft}>
                        <i className='fa-solid fa-chevron-left'></i>
                    </div>
                    <div className='discover-movies-nav-right' onClick={handleTvSeriesScrollRight}>
                        <i className='fa-solid fa-chevron-right'></i>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Discover