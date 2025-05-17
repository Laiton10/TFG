import React, { useEffect, useState } from 'react';
import { searchUserByNickname } from '../services/usuario.service'; // Asegúrate de que la ruta es correcta
import Image from '../assets/images/profile.png'; // Puedes cambiar la imagen por avatar real si tienes

const PublicProfileCard = ({ nickname }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await searchUserByNickname(nickname);
      if (user) {
        setUser(user);
      } else {
        setError(true);
      }
    };

    fetchUser();
  }, [nickname]);

  if (error) return <p>Usuario no encontrado</p>;
  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div className="public-profile-card">
      <img src={Image} alt={`Avatar de ${user.nickname}`} className="profile-img" />
      <h2>{user.nickname}</h2>
      <p>{user.descripcion || 'Sin descripción disponible.'}</p>
    </div>
  );
};

export default PublicProfileCard;
