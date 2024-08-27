import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [noReviews, setNoReviews] = useState(false);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        if (data.length === 0) {
          setNoReviews(true);
        } else {
          setReviews(data);
          setNoReviews(false);
        }
        setError(null);
      } catch (err) {
        setError("Could not load reviews.");
        setNoReviews(false);
      }
    };
    loadReviews();
  }, [movieId]);

  return (
    <div className={s.container}>
      {error && <p className={s.error}>{error}</p>}
      {noReviews && !error && <p className={s.noReviews}>No reviews found.</p>}
      <ul className={s.list}>
        {reviews.map((review) => (
          <li key={review.id} className={s.review}>
            <p className={s.author}>Written by: {review.author}</p>
            <p className={s.content}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
