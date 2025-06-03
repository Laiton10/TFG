import React, { useState, useEffect } from 'react';
import logo from '../resources/FilMe-removebg-preview.png';
import principalData from '../data/principal.json';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/components/Header.css';
import { getUser } from '../services/usuario.service';

function Header({ token }) {
  const [links, setLinks] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    const fetchUser = async () => {
      const usuario = await getUser();
      setUser(usuario);
    };
    fetchUser();
  }, []);

  const handleLinkClick = (e, route) => {
    if(!token && route.toLowerCase() !== ''){
      e.preventDefault();
      navigate('/login');
    }
  };

  const handlePortalClick = (e) => {
  e.preventDefault();
  if (user?.nickname) {
    navigate(`/portalFilMe/${user.nickname}`);
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
        </ul>
      </div>

      {/* Menú principal de escritorio */}
      <div>
        <nav className="nav">
          <div className="logoLinks">
            <img className="logo" src={logo} alt="logo" />
            <ul className="nav-links">
             {Object.keys(links).map((key) => {
              if (key === "portalFilMe") {
                return (
                  <li key={key}>
                    <a href="#" onClick={handlePortalClick}>{links[key]}</a>
                  </li>
                );
              }
                return (
                <li key={key}>
                  <Link onClick={(e) => handleLinkClick(e, key)} to={`/${key}`}>
                    {links[key]}
                  </Link>
                </li>
              );
            })}
            </ul>
          </div>

          <div className="inicioSesion">
            {token ? (
              <>
                <div className="imagenMenu" onClick={clickMouse}>
                  <img
                    src="/account.png"
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
