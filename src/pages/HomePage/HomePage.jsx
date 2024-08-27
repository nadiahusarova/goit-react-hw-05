import { useEffect, useState } from "react";
import s from "./HomePage.module.css";
import { fetchTrendingMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        setError("Failed to load trending movies. Please try again later.");
      }
    };

    fetchMovies();
  }, []);

  return (
    <section className={s.container}>
      <h2 className={s.title}>Trending Movies</h2>
      {error ? <p className={s.error}>{error}</p> : <MovieList movies={movies} />}
    </section>
  );
};

export default HomePage;
