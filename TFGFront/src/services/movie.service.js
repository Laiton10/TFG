import axios from "axios"; //libreria de JS que nos facilita las request a

const TOP250_API = "https://imdb236.p.rapidapi.com/imdb/top250-movies";
const API_HOST= "imdb236.p.rapidapi.com";
const API_KEY = "f60e937c39msh852eeaf7064f519p10708ajsnc9589acdf850";

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

