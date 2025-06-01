const baseUrl = 'http://localhost:8080/criticas';

export const addCritica = async (idPeli, userId, texto, puntuacion) => {
  try {
    console.log("service", idPeli, userId, texto, puntuacion);
    const response = await fetch(`${baseUrl}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pelicula_id: idPeli,
        usuario_id: userId,
        comentario: texto,
        puntuacion: puntuacion
      })
    });
    
    console.log("holaa");
    if (!response.ok) {
      throw new Error('Error al añadir la crítica');
    }
    const data = await response.text();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error al añadir la crítica', error);
    return null;
  }
};

export const deleteCritica= async (idPeli, user) => {
  try {
    const response = await fetch(`${baseUrl}?usuario_id=${user.id}&pelicula_id=${idPeli}`, { //el controller espera un requestParam
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la crítica');
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Error al eliminar la crítica:", error);
    return null;
  }
};

export const getCriticasUsuario= async (usuario_id) =>{
    try {
      const response = await fetch(`${baseUrl}/getCriticas/${usuario_id}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        const msg = "Este usuario no tiene críticas";
        return msg;
      }
  
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error("Error al obtener las críticas del usuario:", error);
      return null;
    }
  };