import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const response = await fetch(
      "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
    );
    const json = await response.json();
    setMovies(json.data.movies);
    setIsLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {isLoading ? null : <h1>Top {movies.length} Movies</h1>}

      <div className={styles.container}>
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          <div className={styles.movies}>
            {movies.map((movie, index) => {
              return (
                <Movie
                  key={movie.id}
                  title={movie.title}
                  coverImg={movie.medium_cover_image}
                  index={index}
                  runtime={movie.runtime}
                  rating={movie.rating}
                  year={movie.year}
                  id={movie.id}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
