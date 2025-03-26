import React, { useState, useEffect } from 'react';
import logo from '../resources/FilMe-removebg-preview.png'
import principalData from '../data/principal.json'
import { Link } from 'react-router-dom';
import '../styles/Header.css'

function Header({user}) {
  const [links, setLinks] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const clickMouse = () => {
    setIsMenuOpen((prevState) => !prevState);
  }


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
        {user ? 
          <> {/* Es necesario un fragmento, xq hay varios elementos JSX */}
            <p className="saludoUsuario">¡Hola, {user}!</p> 
            <div className="imagenMenu"onClick={clickMouse}>
              <img
                src="/account.svg"
                alt="Icono de usuario" 
                className="iconoUsuario"
                
              />
            
            
        {isMenuOpen &&  // Muestra el menú si isMenuOpen es true, gracias a && que evalúa la segunda parte si la primera es true
            <div className="menuDesplegable">
              <ul>
                <li><Link to="/perfil">Mi Perfil</Link></li>
                <li><Link to="/configuracion">Configuración</Link></li>
              </ul>
            </div>
        }
            </div>
          </>
 : 
  <Link to="/login">Iniciar Sesión</Link>
}
        </div>
        </nav>
    </div>
  )
}

export default Header