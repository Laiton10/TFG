import {useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer';
import Principal from './pages/Principal';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Populares from './pages/Populares';
import Register from './pages/Register';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getTopMovies } from './services/movie.service';


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
      <Header token={token}/>
      <Routes>
        <Route path="/" element={<Principal token={token} />} />
        <Route path="/login" element={<Login setToken={setToken}/>}/>
        <Route path="/perfil" element={<Perfil token={token} />} />
        <Route path='/populares' element={<Populares/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
