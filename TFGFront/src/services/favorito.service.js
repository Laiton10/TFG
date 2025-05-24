const baseUrl = 'http://localhost:8080/favoritos';

export const addFavorito = async (idPeli, user) => {
  try {
    const response = await fetch(`${baseUrl}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pelicula_id: idPeli,
        usuario_id: user.id
      })
    });

    if (!response.ok) {
      throw new Error('Error al añadir favorito');
    }

    const data = await response.text();
    console.log("Favorito añadido:", data);
    return data;
  } catch (error) {
    console.error("Error al añadir favorito:", error);
    return null;
  }
};

export const deleteFavorito = async (idPeli, user) => {
  try {
    const response = await fetch(`${baseUrl}?peliculaId=${idPeli}&usuarioId=${user.id}`, { //el controller espera un requestParam
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Error al eliminar favorito');
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Error al eliminar favorito:", error);
    return null;
  }
};

export const getFavorito = async (usuarioId, peliculaId) => {
  try {
    const response = await fetch(`${baseUrl}/getFavorito?usuarioId=${usuarioId}&peliculaId=${peliculaId}`, {
      method: 'GET'
    });

    if (response.status === 404) {
      return null; // No es favorito, y está bien
    }

    if (!response.ok) {
      throw new Error("Error al obtener favorito");
    }

    return await response.json(); // Devuelve objeto Favorito si lo hay
  } catch (error) {
    console.error("Error al obtener favorito:", error);
    return null;
  }
};



   