import React, { useEffect, useState } from 'react'
import '../styles/components/Profile-Card.css'
import {ProfileCard} from "../components/ProfileCard";
import { getUser } from '../services/usuario.service';

function Perfil({token}) {

  const [user, setUser]= useState(null);

  useEffect(()=>{
    const fetchPerfil= async () =>{
        const perfil= await getUser();
        setUser(perfil);
    }
    if (token) {
      fetchPerfil();
    }
  }, [token]);//se ejecuta cada vez que cambie el token
  
  if (!user) return <p>Cargando perfil...</p>;
  return (
    <div className='perfil'>
        <ProfileCard user={user}/> 
    </div>
  )
}

export default Perfil