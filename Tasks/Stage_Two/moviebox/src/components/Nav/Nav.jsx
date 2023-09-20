import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import menuIcon from '../../assets/menu.png';
import './Nav.css';
import { useNav } from '../../NavContext'; 

const Nav = ({ className }) => {
  const [scrollY, setScrollY] = useState(0);
  const [query, setQuery] = useState('');
  const { isSearchActive, setIsSearchActive } = useNav(); 

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const searchInput = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get('q') || '';
    setQuery(q);
  }, [location]);

  const searchMovieHandler = (e) => {
    e.preventDefault();

    if (searchInput.current.value === '') {
      alert('We would love to know the movie you are looking for');
      return;
    }
    const newQuery = encodeURIComponent(searchInput.current.value.trim());
    navigate(`/search?q=${newQuery}`);
  };

  const toggleSearchActivation = () => {
    setIsSearchActive(!!searchInput.current.value);
  };

  const clearInputField = () => {
    setQuery('');
    setIsSearchActive(false);
    setTimeout(() => {
      searchInput.current.focus();
    }, 0);
  };

  return (
    <div>
      <nav className={`navbar ${scrollY > 0 ? 'navbar-shadow' : ''} ${className}`}>
        <div className={`navbar-wrap ${scrollY > 0 ? 'navbar-padding' : ''} ${className}`}>
          <Link className='navLink' to="/">
            <div className="logo-wrap">
              <div className="logo-img-block">
                <img src={logo} alt="" />
              </div>
              <span className="logo-txt">MovieBox</span>
            </div>
          </Link>
          <form className="search-wrap" onSubmit={searchMovieHandler}>
            <input
              type='text'
              placeholder='What do you want to watch?'
              ref={searchInput}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                toggleSearchActivation();
              }}
            />
            <button className='search-submit'>
              <i
                className={`search-icon fa-solid ${isSearchActive ? 'fa-xmark' : 'fa-magnifying-glass'}`}
                onClick={(event) => {
                  if (isSearchActive) {
                    event.preventDefault();
                    clearInputField();
                    event.stopPropagation();
                  }
                }}
              ></i>
            </button>
          </form>
          <div className="navigation-wrap">
            <span>Sign in</span>
            <div className="menu-img-block">
              <img src={menuIcon} alt="" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;