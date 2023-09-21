import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Sidenav.css';

const Sidenav = () => {
  return (
    <div>
      <div className="sidenav-wrap">
        <div className="sidenav-links">
          <div className="sidenav-logo-wrap">
            <NavLink to="/" className="sidenav-logo-content">
              <div className="sidenav-logo-img-block">
                <img src={logo} alt="" />
              </div>
              <span className="sidenav-logo-txt">MovieBox</span>
            </NavLink>
          </div>
          <ul className="sidenav-list">
            <div className="sidenav-link-routes">
                <NavLink to="/" className='sidenav-link-route' activeClassName='active'>
                <li className="sidenav-list-item">
                    <i className="sidenav-list-icon fa-solid fa-house"></i>
                    <span>Home</span>
                </li>
                </NavLink>
                <NavLink to="/movie" className='sidenav-link-route' activeClassName='active'>
                <li className="sidenav-list-item">
                    <i className="sidenav-list-icon fa-solid fa-film"></i>
                    <span>Details</span>
                </li>
                </NavLink>
                <NavLink to="/" className='sidenav-link-route' activeClassName='active'>
                <li className="sidenav-list-item">
                    <i className="sidenav-list-icon fa-solid fa-video"></i>
                    <span>Movies</span>
                </li>
                </NavLink>
                <NavLink to="/" className='sidenav-link-route' activeClassName='active'>
                <li className="sidenav-list-item">
                    <i className="sidenav-list-icon fa-solid fa-tv"></i>
                    <span>TV Series</span>
                </li>
                </NavLink>
            </div>
            <div className='playQuiz'>
              <h3>Play movie quizzes and earn free tickets</h3>
              <p>50k people are playing now</p>
              <button>Start playing</button>
            </div>
          </ul>
          <div className="sidenav-list-extension">
            <NavLink to="/logout" className='sidenav-list-extension-route' activeClassName='active'>
              <li className="sidenav-list-item">
                <span>Log out</span>
                <i className="sidenav-list-extension-icon fa-solid fa-arrow-right-from-bracket"></i>
              </li>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidenav;
