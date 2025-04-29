import "../styles/components/Movie-Card.css";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const image = movie?.primaryImage || '/descargar.jpg'; // Si no hay imagen, usamos una por defecto

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img src={image} alt={movie.primaryTitle} className="movie-poster" />
      </Link>
      <hr />
      <div className="movie-info">
        <h3 className="movie-title">{movie.primaryTitle}</h3>
      </div>
    </div>
  );
};
