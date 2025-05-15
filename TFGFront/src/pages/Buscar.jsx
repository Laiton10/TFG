import React, { useState, useEffect } from 'react';
import { searchUser } from '../services/usuario.service';
import SearchUserCard from '../components/SearchUser-card';

const Buscar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      if (searchTerm.length > 1) {
        const resultado = await searchUser(searchTerm);
        if (resultado) setUsuarios(resultado);
      } else {
        setUsuarios([]);
      }
    };
    fetchUsuarios();
  }, [searchTerm]);

  return (
    <div>
      <div className='search-bar'>
        <input
          type="text"
          placeholder="🔍 Buscar usuarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        {usuarios.length > 0 ? (
          usuarios.map((user) => (
            <SearchUserCard key={user.id} usuario={user} />
          ))
        ) : (
          searchTerm.length > 1 && <p>No se encontraron usuarios.</p>
        )}
      </div>
    </div>
  );
};

export default Buscar;
