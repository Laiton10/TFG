const baseUrl = 'http://localhost:8080/criticas';

export const addCritica = async (idPeli, user, comentario) => {
  try {
    const response = await fetch(`${baseUrl}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pelicula_id: idPeli,
        usuario_id: user.id,
        comentario: comentario
      })
    });

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