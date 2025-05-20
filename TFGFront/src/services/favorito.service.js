const baseUrl = 'http://localhost:8080/favoritos';

export const addFavorito= async(idPeli, user) =>{
    try {
         const response= await fetch(`${baseUrl}`,{
            method: 'POST',
             headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(idPeli, user)
         })
    if(!response.ok){
          throw new Error('Error al añadir favorito');
       }
       const data = await response.json();
       console.log(data);
       return data; //favorito
    } catch (error) { 
      console.error("Error al añadir favorito:", error);  
      return null;
    }
}    