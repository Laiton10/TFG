import React, { useRef } from 'react'
import '../styles/components/Profile-Card.css'
import {ProfileCard} from "../components/ProfileCard";

function Perfil({user}) {
  
  return (
    <div className='perfil'>
        <ProfileCard user={user}/> 
    </div>
  )
}

export default Perfil