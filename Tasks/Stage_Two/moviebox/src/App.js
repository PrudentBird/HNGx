import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';
import Search from './pages/Search';
import { NavProvider } from './NavContext';
import Discover from './pages/Discover';

function App() {
  return (
    <div id='home'>
      <Router>
        <NavProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:movieId" element={<Movie />} />
          </Routes>
        </NavProvider>
      </Router>
    </div>
  );
}

export default App;
