import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const getMovie = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    const json = await response.json();
    setMovie(json.data.movie);
    setIsLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          <h1>{movie.title}</h1>
          <div className={styles.movie}>
            <img
              src={movie.medium_cover_image}
              alt={movie.title}
              className={styles.movie__img}
            />
            <div className={styles.movies__info}>
              <div>
                <span>Genre: </span>
                <span>
                  {movie.genres.map((genre, index) => (
                    <span key={index}>
                      {genre}
                      {index !== movie.genres.length - 1 && ", "}
                    </span>
                  ))}
                </span>
              </div>

              <div>Release year: {movie.year}</div>
              <div>Runtime: {movie.runtime}m</div>
              <div>Rating: {movie.rating}/10</div>
              <div className={styles.movie__summary}>
                Synopsis:{" "}
                {movie.description_intro.length > 500
                  ? `${movie.description_intro.slice(0, 500)}...`
                  : movie.description_intro}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
