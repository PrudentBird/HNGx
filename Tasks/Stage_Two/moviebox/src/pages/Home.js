import React from 'react'
import Nav from '../components/Nav/Nav'
import FetchBanner from '../components/Home/FetchBanner'
import Banner from '../components/Home/Banner'
import Movies from '../components/Home/Movies'
import Footer from '../components/Footer/Footer'

import '../components/Home/Home.css'

const Home = () => {
  return (
    <div>
      <Nav />
      <FetchBanner /> 
      <Banner />
      <Movies />
      <Footer />
    </div>
  )
}

export default Home