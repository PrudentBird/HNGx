import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';
import Search from './pages/Search';
import { NavProvider } from './NavContext';

function App() {
  return (
    <div id='home'>
      <Router>
        <NavProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:movieId" element={<Movie />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </NavProvider>
      </Router>
    </div>
  );
}

export default App;
