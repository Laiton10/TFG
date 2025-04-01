import React, { useRef } from 'react'
import '../styles/Perfil.css'

function Perfil({user}) {

    const userInfo = [
        { label: 'Nickname', id: 'nickname', value: user}, //pongo el prop user como value
        { label: 'Email', id: 'email', value: 'email'},
        { label: 'Fecha de registro en la aplicación', id: 'fecha_registro', value: 'fecha'},
    ]
  return (
    <div className='containerPerfil'>
         <div className='perfil'>
            <div className='circulo'>
                <p>{user.charAt(0)}</p>
            </div>
            <div className='title'>
                <p>Información Personal</p>
            </div>
    </div>
        {userInfo.map ((info) => (
            <div className='info' key={info.id}>
                <label htmlFor={info.id}>{info.label}:</label>
                <input
                    type='text'
                    id={info.id}
                    value={info.value}
                    readOnly
                />
            </div>
        ))}
    </div>
  )
}

export default Perfil