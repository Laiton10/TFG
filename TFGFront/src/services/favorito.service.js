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
  console.log("eliminando")
  try {
    const response = await fetch(`${baseUrl}?usuario_id=${user.id}&pelicula_id=${idPeli}`, { //el controller espera un requestParam
      method: 'DELETE'
    });

    if (!response.ok) {
      console.log("error")
      throw new Error('Error al eliminar favorito');
    }
    console.log("funciona");
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

    const data = await response.json();

    // Si devuelve el objeto de error personalizado con "msg", entonces no es favorito
    //No queremos que salte el error porque solo es para obtener la información
    if (data.msg === "Favorito no encontrado") {
      return null;
    }

    return data; // objeto Favorito válido
  } catch (error) {
    console.error("Error al obtener favorito:", error);
    return null;
  }
};




   