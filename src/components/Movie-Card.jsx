import "../styles/components/Movie-Card.css";
import { Link } from "react-router-dom";

export const MovieCard = () => {
    const image = '/descargar.jpg';


    return(
        <div className="movie-card">
            <Link to="movie/1">
                <img src={image} alt="Movie Poster" className="movie-poster" />
            </Link>
            <hr/>
            <div className="movie-info">
                <h3 className="movie-title">Captain America: Brave New World</h3>
            </div>
        </div>
    )
}