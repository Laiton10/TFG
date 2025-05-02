import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/usuario.service';
import '../styles/pages/Login.css';

function Login({setToken}) {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const token = await login(nickname, password);
    if (token) {
      localStorage.setItem('token', token); 
      setToken(token);
      navigate('/');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="containerLogin">
      <form onSubmit={handleLogin}>
        <div className="nickname">
          <label htmlFor="nickname">Nickname:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Introduce tu nickname"
          />
        </div>
        <div className="password">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Introduce tu contraseña"
          />
        </div>
        <button type="submit" className="botonLogin">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Login;
