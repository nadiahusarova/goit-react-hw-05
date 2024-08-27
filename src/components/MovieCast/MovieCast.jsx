import { useParams } from "react-router-dom";
import s from "./MovieCast.module.css";
import { fetchMovieCredits } from "../../api";
import { useEffect, useState } from "react";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [notCast, setNotCast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovieCredits(movieId);
        if (data.length === 0) {
          setNotCast(true);
        } else {
          setCast(data);
          setNotCast(false);
        }
        setError(null);
      } catch (error) {
        setError("Failed to fetch movie credits.");
        setNotCast(false);
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <div className={s.castContainer}>
      {error && <p className={s.error}>{error}</p>}
      {notCast && !error && <p className={s.error}>Cast is missing.</p>}
      <ul className={s.castList}>
        {cast.map((actor) => {
          const actorPhoto = actor.profile_path 
            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` 
            : "https://via.placeholder.com/200x300?text=No+Image";

          return (
            <li key={actor.cast_id} className={s.castItem}>
              <img src={actorPhoto} alt={actor.name} className={s.actorImage} />
              <p className={s.actorName}>{actor.name}</p>
              <p className={s.characterName}>as {actor.character}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieCast;
