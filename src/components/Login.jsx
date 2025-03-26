import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css'


function Login({handleLogin}) {

        const[user, setUsername] = useState('');
        const[password, setPassword] = useState('');
        const navigate = useNavigate();

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log('Formulario enviado');
            handleLogin({user, password});
            navigate('/');

        };


  return (
    <div className='containerLogin'>
        <form onSubmit={handleSubmit}>
            <div className='nickname'>
                <label htmlFor='nickname'>Nickname: </label>
                <input
                    type='text'
                    id='nickname'
                    placeholder='Introduce tu nickname'
                    value={user}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className='password'>
                <label htmlFor='password'>Password:</label>
                <input
                    type='password'
                    id='password'
                    placeholder='Introduce tu contraseña'
                    value={password}
                    onChange= {(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="botonLogin" type='submit'>Iniciar Sesión</button>
            
        </form>

    </div>
  )
}

export default Login