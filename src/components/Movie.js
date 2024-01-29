import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";
import styles from "./Movie.module.css";

function Movie({ title, coverImg, index, year, runtime, rating, id }) {
  return (
    <div className={styles.movies}>
      <div>
        <Link to={`/movie/${id}`} style={{ textDecoration: "none" }}>
          <img src={coverImg} alt={title} className={styles.movie__img} />
        </Link>
      </div>
      <div className={styles.movies__info}>
        <h2 className={styles.movie__title}>
          {index + 1}.{" "}
          <Link
            to={`/movie/${id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {title}
          </Link>
        </h2>
        <div className={styles.movie__meta}>
          {year} {runtime}m ⭐️ {rating}/10
        </div>
      </div>
    </div>
  );
}

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  coverImg: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  runtime: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};
export default Movie;
