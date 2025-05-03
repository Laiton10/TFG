import React, { useState, useEffect } from 'react';
import logo from '../resources/FilMe-removebg-preview.png';
import principalData from '../data/principal.json';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/components/Header.css';

function Header({ token }) {
  const [links, setLinks] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuResponsiveAbierto, setMenuResponsiveAbierto] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const clickMouse = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const toggleResponsiveMenu = () => {
    setMenuResponsiveAbierto((prev) => !prev);
  };

  useEffect(() => {
    const linkObject = principalData[0];
    setLinks(linkObject);
  }, []);

  const handleLinkClick = (e, route) => {
    if(!token && route.toLowerCase() !== ''){
      e.preventDefault();
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };


  return (
    <>
      {/* Menú hamburguesa responsive */}
      <div
        id="responsive-nav-icon"
        onClick={toggleResponsiveMenu}
        className={menuResponsiveAbierto ? 'open' : ''}
      >
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>

      <div id="responsive-nav" className={menuResponsiveAbierto ? 'visible' : 'hidden'}>
        <ul>
          {Object.keys(links).map((key) => (
            <li key={key}>
              <Link
                to={`/${key}`}
                className="responsive-header-link"
                onClick={() => setMenuResponsiveAbierto(false)}
              >
                {links[key]}
              </Link>
            </li>
          ))}
          {token && (
            <li>
              <Link
                to="/ajustes"
                className="responsive-header-link"
                onClick={() => setMenuResponsiveAbierto(false)}
              >
                Ajustes y pedidos
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Menú principal de escritorio */}
      <div>
        <nav className="nav">
          <div className="logoLinks">
            <img className="logo" src={logo} alt="logo" />
            <ul className="nav-links">
            {Object.keys(links).map((key) => (
              <li key={key}><Link onClick={(e) => handleLinkClick(e,key) } to={`/${key}`}>{links[key]}</Link></li>
            ))}
            </ul>
          </div>

          <div className="inicioSesion">
            {token ? (
              <>
                <div className="imagenMenu" onClick={clickMouse}>
                  <img
                    src="/account.svg"
                    alt="Icono de usuario"
                    className="iconoUsuario"
                  />

                  {isMenuOpen && (
                    <div className={`menuDesplegable ${isMenuOpen ? 'open' : ''}`}>
                      <ul>
                        <li>
                          <Link to="/perfil">Mi Perfil</Link>
                        </li>
                        <li>
                          <Link to="/configuracion">Configuración</Link>
                        </li>
                        <li>
                          <Link to="/login" onClick={handleLogout}>Cerrar Sesión</Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            ) : (
              location.pathname !== '/login' && <Link to="/login">Iniciar Sesión</Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
