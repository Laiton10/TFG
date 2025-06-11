const baseUrl = 'http://localhost:8080/recomendaciones';

export const addRecomendacion = async (idPeli, user) => {
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
      throw new Error('Error al hacer la recomendación');
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Error al hacer la recomendación:", error);
    return null;
  }
};

export const deleteRecomendacion= async (idPeli, user) => {
  try {
    const response = await fetch(`${baseUrl}?usuario_id=${user.id}&pelicula_id=${idPeli}`, { //el controller espera un requestParam
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la recomendación');
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Error al eliminar la recomendación:", error);
    return null;
  }
};

export const getRecomendacionesUsuario= async (usuario_id) =>{
    try {
      const response = await fetch(`${baseUrl}/getRecomendaciones/${usuario_id}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        const msg = "Este usuario no tiene recomendaciones";
        return msg;
      }
  
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error("Error al obtener las recomendaciones del usuario:", error);
      return null;
    }
  };

