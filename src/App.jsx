import { use, useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer';
import Principal from './pages/Principal';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Populares from './pages/Populares';
import Register from './pages/Register';
import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


function App() {

  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
 
  const handleLogin = ({user, password}) => {
    setUser(user);
    setPassword(password)
  }

  return(
    <>
      <Header user={user}/>
      <Routes>
        <Route path="/" element={<Principal/>}/>
        <Route path="/login" element={<Login handleLogin={handleLogin}/>}/>
        <Route path="/perfil" element={<Perfil user={user} />} />
        <Route path='/populares' element={<Populares/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
