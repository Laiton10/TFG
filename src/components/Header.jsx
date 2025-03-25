import React, { useState, useEffect } from 'react';
import logo from '../resources/FilMe-removebg-preview.png'
import principalData from '../data/principal.json'
import { Link } from 'react-router-dom';
import '../styles/Header.css'

function Header({user}) {
  const [links, setLinks] = useState([]);
  
  useEffect(() => {
    const linkObject = principalData[0];
    setLinks(linkObject);
  }, []);

  return (
    <div>
        <nav className='nav'>
          <div className='logoLinks'> 
             <img className='logo' src={logo} alt='logo'/>
             <ul className='nav-links'>
            {console.log(Object.keys(links))}  
            {Object.keys(links).map((key) => (
              <li key={key}><Link to={`/${key}`}>{links[key]}</Link></li>
            ))}
          </ul>
          </div>
         
        <div className="inicioSesion">
          {user ? <p className='saludoUsuario'>¡Hola, {user}!</p> : <Link to="/login">Iniciar Sesión</Link>}
        </div>
        </nav>
    </div>
  )
}

export default Header