import React from 'react';
import dato from '../data/principal2.json';
import '../styles/pages/Principal.css';
import { Link } from 'react-router-dom';

function Principal({ token }) {
  return (
    <div className='content'>
      <div className='titulo'>
        <p className='infoTitulo'>{dato.first.title}{dato.first.titleText}</p>
        {!token && (
          <div className='registrar'>
            <input type="email" placeholder="Haz click para registrarte" className="inputCorreo" readOnly />
            <Link to='/register'>
              <button className="botonSuscribir">REGÍSTRATE</button>
            </Link>
          </div>
        )}

        <div className="suscripcion">
          <p className='subtitulo'>{dato.second.subtitle}</p>
          <p className='textoSubtitulo'>{dato.second.subtitleText}</p>
        </div>
      </div>
    </div>
  );
}

export default Principal;
