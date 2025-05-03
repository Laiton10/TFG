import { useState } from 'react';
import { registerUser } from '../services/usuario.service';
import '../styles/components/Register-Card.css';
import { useNavigate } from 'react-router-dom';

export const RegisterCard = () => {

  const [nombre, setNombre] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuario = {
      nombre,
      nickname,
      email,
      password
    };

    const result = await registerUser(usuario);

    if (result) {
      console.log('Usuario registrado:', result);
      navigate('/login');
    } else {
      console.error('Error al registrar el usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="register-card">
        <div className='perfil'>
          <div className='title'>
            <p>Registro</p>
          </div>
        </div>
        <hr />
        <div className='info'>
          <label htmlFor='nombre'>Nombre</label>
          <input
            type='text'
            id='nombre'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <label htmlFor='nickname'>Nickname</label>
          <input
            type='text'
            id='nickname'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <label htmlFor='contraseña'>Contraseña</label>
          <input
            type='password'
            id='contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor='registerEmail'>Email</label>
          <input
            type='text'
            id='registerEmail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className='register-button'>Registrarse</button>
        </div>
      </div>
    </form>
  );
};
    