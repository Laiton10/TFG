import {useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer';
import Principal from './pages/Principal';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Populares from './pages/Populares';
import Register from './pages/Register';
import Buscar from './pages/Buscar';
import MovieDetail from './pages/MovieDetail';
import PublicProfile from './pages/PublicProfile';
import MiLista from './pages/MiLista';
import PrivateRoute from './components/PrivateRoute';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getTopMovies } from './services/movie.service';
import Critica from './components/Critica';



function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {

    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken); 
    }
    const fetchMovies = async () => {
      const movies = await getTopMovies();
      console.log("Películas:", movies);
    };

    fetchMovies();
  }, []);

  

  return(
    <>
      <Header token={token} />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Principal token={token} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        {/* Rutas protegidas */}
        <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
        <Route path="/populares" element={<PrivateRoute><Populares /></PrivateRoute>} />
        <Route path="/buscar" element={<PrivateRoute><Buscar /></PrivateRoute>} />
        <Route path="/movie/:title" element={<PrivateRoute><MovieDetail /></PrivateRoute>} />
        <Route path="/portalFilme/:nickname" element={<PrivateRoute><PublicProfile /></PrivateRoute>} />
        <Route path="/miLista" element={<PrivateRoute><MiLista /></PrivateRoute>} />
        <Route path="/critica/:id/:nickname" element={<PrivateRoute><Critica /></PrivateRoute>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
