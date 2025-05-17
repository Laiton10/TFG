import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/SearchUser-Card.css';
import Image from "../assets/images/profile.png";

const SearchUserCard = ({ usuario }) => {
  return (
    <Link to={`/usuario/${usuario.nickname}`} className="user-card-link">
      <div className="user-card">
        <div className="user-info">
          <img src={Image} alt="profile" className="profile-img" />
          <div className="text">
            <h3>{usuario.nickname}</h3>
            <p>{usuario.descripcion || 'Sin descripción'}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchUserCard;
