import axios from "axios"; //libreria de JS que nos facilita las request a

const TOP250_API = "https://imdb236.p.rapidapi.com/api/imdb/top250-movies";
const GET_BY_ID= "https://imdb236.p.rapidapi.com/api/imdb"
const API_HOST= "imdb236.p.rapidapi.com";
const API_KEY = "f60e937c39msh852eeaf7064f519p10708ajsnc9589acdf850";

const MOVIE_BY_TITLE = 'https://streaming-availability.p.rapidapi.com/shows/search/title?'
const API_HOST2 = 'streaming-availability.p.rapidapi.com';
const baseUrl = 'http://localhost:8080/peliculas';


export const getTopMovies = async () => {
    const options = {
        method: 'GET',
        url: TOP250_API,
        headers: {
            'x-rapidapi-host': API_HOST,
            'x-rapidapi-key': API_KEY
        }
    };

    const response = await axios.request(options);
    return response;
};

export const getMovieById = async (id) => {
  try {
    const response = await axios.get(`${GET_BY_ID}/${id}`, {
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY
      }
    });

    return response.data;
  } catch (error) {
    console.error(`Error al obtener la película con id ${id}:`, error);
    return null;
  }
};

export const getMovieByTitle = async (title) => {
    const options = {
        method: 'GET',
        url: `${MOVIE_BY_TITLE}country=ES&title=${encodeURIComponent(title)}`, // Corregimos el orden de los parámetros
        headers: {
            'x-rapidapi-host': API_HOST2, // Usamos el host correcto para esta API
            'x-rapidapi-key': API_KEY
        }
    };

    try {
        const response = await axios.request(options);
        return response.data; // Retornamos solo los datos relevantes
    } catch (error) {
        console.error("Error fetching movie by title:", error);
        throw error; // Lanzamos el error para manejarlo en el llamado
    }
};

    export const insertMovieDB = async (id) => {
        try {
            const response= await fetch(`${baseUrl}/insert`,{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            });
            if(!response.ok){
            throw new Error(`Error al registrar la película (${response.status})`);
        }
        console.log("Holaaa")
        const data = await response.text();
        console.log("Hola data",data);
        return data;
        } catch (error) {
            console.error("Error al hacer el registro:", error);  
            return null;
        }
    }

