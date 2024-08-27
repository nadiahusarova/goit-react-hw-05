import { Suspense, useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import { fetchMovieDetails } from "../../api";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const [error, setError] = useState(null);
  const location = useLocation();
  const goBack = useRef(location.state ?? "/");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError("Unable to fetch movie details. Please try again later.");
      }
    };
    fetchData();
  }, [movieId]);

  if (!movie) {
    return (
      <div className={s.loaderWrapper}>
        <ThreeCircles
          visible={true}
          height="60"
          width="60"
          color="#1e90ff" 
          ariaLabel="loading"
        />
      </div>
    );
  }

  if (error) {
    return <div className={s.errorMessage}>{error}</div>;
  }

  return (
    <div className={s.pageContainer}>
      <Link className={s.backButton} to={goBack.current}>
        Back to Home
      </Link>
      <div className={s.movieDetails}>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={s.info}>
          <h2 className={s.title}>{movie.title}</h2>
          <p className={s.overview}>
            Overview: <span>{movie.overview}</span>
          </p>
          <p className={s.runtime}>
            Runtime: <span>{movie.runtime} minutes</span>
          </p>
          <p className={s.popularity}>
            Popularity: <span>{movie.popularity}</span>
          </p>
        </div>
      </div>
      <nav className={s.navigation}>
        <NavLink className={s.navLink} to="cast">
          Cast
        </NavLink>
        <NavLink className={s.navLink} to="reviews">
          Reviews
        </NavLink>
      </nav>
      <Suspense
        fallback={
          <div className={s.loaderWrapper}>
            <ThreeCircles
              visible={true}
              height="60"
              width="60"
              color="#1e90ff" 
              ariaLabel="loading"
            />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
