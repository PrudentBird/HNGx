import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './Sidenav.css'

const Sidenav = () => {
  return (
    <div>
        <div className="sidenav-wrap">
            <div className="sidenav-links">
                <ul className="sidenav-list">
                    <div className="sidenav-logo-wrap">
                        <Link to="/" className="sidenav-logo-content">
                            <div className="sidenav-logo-img-block">
                                <img src={logo} alt="" />
                            </div>
                            <span className="sidenav-logo-txt">MovieBox</span>
                        </Link>
                    </div>
                    <Link to="/" className='sidenav-link-route'>
                        <li className="sidenav-list-item">
                            <i className="fa-solid fa-house"></i>
                            <span>Home</span>
                        </li>
                    </Link>
                    <li className="sidenav-list-item">
                        <i className="fa-solid fa-film"></i>
                        <span>Details</span>
                    </li>
                    <li className="sidenav-list-item">
                        <i className="fa-solid fa-video"></i>
                        <span>Movies</span>
                    </li>
                    <li className="sidenav-list-item">
                        <i className="fa-solid fa-tv"></i>
                        <span>TV Series</span>
                    </li>
                    <div className='playQuiz'> 
                        <h3>Play movie quizes and earn free tickets</h3>
                        <p>50k people are playing now</p>
                        <button>Start playing</button>
                    </div>
                </ul>
                <div className="sidenav-list-extension">
                    <li className="sidenav-list-item">
                        <span>Log out</span>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </li>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidenav