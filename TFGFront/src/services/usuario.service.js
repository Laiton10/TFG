const baseUrl = 'http://localhost:8080/usuarios';

export const login = async (nickname, password) => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({//Convierte los datos del formulario en JSON para enviarlos en el cuerpo de la petición.
        nickname: nickname,
        password: password
      })
    });

    if (!response.ok) {
      console.error('Credenciales incorrectas');
      throw new Error("Credenciales incorrectas");
    }

    const data = await response.json();
    console.log(data);
    console.log(data.token);
    return data.token;
  } catch (error) {
    console.error("Error al hacer login:", error);
    return null;
  }
};

export const getUser= async() =>{
  try {
    const token= localStorage.getItem('token');
    if(!token){
      throw new Error("Token no disponible");
    }

    const response= await fetch(`${baseUrl}/auth/perfil`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error("Error al obtener el perfil");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    return null;
  }
}

export const registerUser= async(user) =>{
    try {
       const response= await fetch(`${baseUrl}/register`,{
         method: 'POST',
         headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
       });
       if(!response.ok){
          throw new Error('Error al registrar el usuario');
       }
       const data = await response.json();
       console.log(data);
       return data; // usuario registrado
    } catch (error) { 
      console.error("Error al hacer el registro:", error);  
      return null;
    }
}
