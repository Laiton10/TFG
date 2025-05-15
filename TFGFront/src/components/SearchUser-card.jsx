import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/SearchUser-Card.css';
import Image from "../assets/images/profile.png";

const SearchUserCard = ({ usuario }) => {
  return (
    <div className="user-card">
    <div className="user-info">
        <img src={Image} alt="profile" className="profile-img" />
        <div className="text">
        <Link to={`/perfil/${usuario.id}`}>
            <h3>{usuario.nickname}</h3>
        </Link>
        <p>{usuario.descripcion || 'Sin descripción'}</p>
        </div>
    </div>
    </div>  
  );
};

export default SearchUserCard;
