import { Link, useLocation } from 'react-router-dom';
import s from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={s.movieList}>
      {movies.map(({ id, poster_path, title }) => (
        <li className={s.movieItem} key={id}>
          <Link className={s.movieLink} to={`/movies/${id}`} state={{ from: location }}>
            <img
              className={s.moviePoster}
              src={`https://image.tmdb.org/t/p/w200${poster_path}`}
              alt={title}
            />
            <p className={s.movieTitle}>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
