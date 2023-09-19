import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div>
      <div className="content">
        <div className="footer-icons">
          <i className="footer-icon fa-brands fa-facebook"></i>
          <i className="footer-icon fa-brands fa-instagram"></i>
          <i className="footer-icon fa-brands fa-x-twitter"></i>
          <i className="footer-icon fa-brands fa-youtube"></i>
        </div>
        <div className="footer-navlinks">
          <a href="#home" className="footer-navlink">Conditions of Use</a>
          <a href="#home" className="footer-navlink">Privacy & Policy</a>
          <a href="#home" className="footer-navlink">Press Room</a>
        </div>
        <div className="copyright-info">
          <span>© 2023 MovieBox by Daniel Wari</span>
        </div>
      </div>
    </div>
  )
}

export default Footer