import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../services/usuario.service';
import '../styles/pages/Login.css';

function Login({setToken}) {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje]= useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const token = await login(nickname, password);
    if (token) {
      localStorage.setItem('token', token); 
      setToken(token);
      navigate('/');
    } else {
      setMensaje('Credenciales incorrectas');
    }
  };

  useEffect(() => {
          if (location.state?.mensaje) {
              setMensaje(location.state.mensaje);
  
              // Limpia el mensaje después de unos segundos
              const timer = setTimeout(() => setMensaje(null), 3000);
              return () => clearTimeout(timer);
          }
      }, [location.state]);

  return (
    <div className="containerLogin">
      {mensaje && (
                <div className="mensaje-flotante">
                    {mensaje}
                </div>
            )}
      <form onSubmit={handleLogin}>
        <div className="nickname">
          <label htmlFor="nicknameLogin">Nickname:</label>
          <input
            type="text"
            id="nicknameLogin"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Introduce tu nickname"
          />
        </div>
        <div className="password">
          <label htmlFor="passwordLogin">Contraseña:</label>
          <input
            type="password"
            id="passwordLogin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Introduce tu contraseña"
          />
        </div>
        <button type="submit" className="botonLogin">Iniciar sesión</button>
      </form>
      {mensaje && (
            <div className="mensaje-flotante">{mensaje}</div>
          )}
    </div>
  );
}

export default Login;
