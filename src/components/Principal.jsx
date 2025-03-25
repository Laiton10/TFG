import React, { useState, useEffect } from 'react';
import dato from '../data/principal2.json'
import '../styles/Principal.css'

function Principal() {
   return (
    <div className='content'>
        <div className='titulo'>
            <p className='infoTitulo'>{dato.first.title}{dato.first.titleText}</p>

            <div className='registrar'>
                <input type="email" placeholder="Introduce tu nombre y tus apellidos" className="inputCorreo" />
                <button className="botonSuscribir">REGÍSTRATE</button>
            </div>
           
            <div className="suscripcion">
                <p className='subtitulo'>{dato.second.subtitle}</p>
                <p className='textoSubtitulo'>{dato.second.subtitleText}</p>
            </div>
        </div>
     
    </div>
  )
}

export default Principal