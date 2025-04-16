import React, { useState, useEffect } from 'react';
import logo from '../resources/FilMe-removebg-preview.png'
import principalData from '../data/principal.json'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/components/Header.css'

function Header({user}) {
  const [links, setLinks] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const clickMouse = () => {
    setIsMenuOpen((prevState) => !prevState);
  }


  useEffect(() => {
    const linkObject = principalData[0];
    setLinks(linkObject);
  }, []);

  const handleLinkClick = (e, route) => {
      if(!user && route.toLowerCase() !== ''){
        e.preventDefault();
        navigate('/login');
      }
  };


  return (
    <div>
        <nav className='nav'>
          <div className='logoLinks'> 
             <img className='logo' src={logo} alt='logo'/>
             <ul className='nav-links'>
            {console.log(Object.keys(links))}  
            {Object.keys(links).map((key) => (
              <li key={key}><Link onClick={(e) => handleLinkClick(e,key) } to={`/${key}`}>{links[key]}</Link></li>
            ))}
          </ul>
          </div>
         
        <div className="inicioSesion">
        {user ? 
          <> {/* Es necesario un fragmento, xq hay varios elementos JSX */}
            <div className="imagenMenu"onClick={clickMouse}>
              <img
                src="/account.svg"
                alt="Icono de usuario" 
                className="iconoUsuario"
                
              />
            
            
        {isMenuOpen &&  // Muestra el menú si isMenuOpen es true, gracias a && que evalúa la segunda parte si la primera es true
            <div className={`menuDesplegable ${isMenuOpen ? 'open' :  ''}`}>
              <ul>
                <li><Link to="/perfil">Mi Perfil</Link></li>
                <li><Link to="/configuracion">Configuración</Link></li>
              </ul>
            </div>
        }
            </div>
          </>
 : 
    location.pathname !== '/login' && (<Link to="/login">Iniciar Sesión</Link>
    )
}
        </div>
        </nav>
    </div>
  )
}

export default Header