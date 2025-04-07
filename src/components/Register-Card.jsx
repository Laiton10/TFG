import '../styles/components/Register-Card.css';
import { Link, useNavigate } from 'react-router-dom';

export const RegisterCard = () =>{

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado');
        navigate('/login');
    }

    return(
        <form onSubmit={handleSubmit}>
        <div className="register-card">
        <div className='perfil'>
            <div className='title'>
                <p>Registro</p>
            </div>
        </div>
        <hr/>
        <div className='info'>
            
            <label htmlFor='nombre'>Nombre</label>
            <input
                type='text'
                id='nombre'
            />

            <label htmlFor='contraseña'>Contraseña</label>
            <input
                type='password'
                id='contraseña'
            />

            <label htmlFor='registerEmail'>Email</label>
            <input
                type='text'
                id='registerEmail'
            />

            <button className='register-button'>Registrarse</button>
            
        </div>
           
    </div>
    </form>
    )
}