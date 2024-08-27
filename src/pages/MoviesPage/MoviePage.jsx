import { useCallback, useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { searchMovies } from "../../api";
import s from "./MoviePage.module.css";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [noMoviesFound, setNoMoviesFound] = useState(false);

  const fetchMovies = useCallback(
    async (searchQuery, shouldUpdateURL = true) => {
      if (searchQuery.trim() === "") {
        resetState();
        return;
      }

      try {
        const results = await searchMovies(searchQuery);
        setMovies(results);
        setError(null);
        setNoMoviesFound(results.length === 0);

        if (shouldUpdateURL) {
          setSearchParams({ query: searchQuery });
        }
      } catch (err) {
        setError("Error fetching movies. Please try again.");
        setMovies([]);
        setNoMoviesFound(false);
      }
    },
    [setSearchParams]
  );

  const resetState = () => {
    setMovies([]);
    setError(null);
    setNoMoviesFound(true);
  };

  useEffect(() => {
    const queryParam = searchParams.get("query") || "";
    setQuery(queryParam);

    if (queryParam) {
      fetchMovies(queryParam, false);
    }
  }, [fetchMovies, searchParams]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchMovies(query);
  };

  return (
    <div className={s.moviesPage}>
      <h2 className={s.header}>Search for Movies</h2>
      <form className={s.searchForm} onSubmit={handleFormSubmit}>
        <input
          placeholder="Search for movies..."
          type="search"
          value={query}
          onChange={handleInputChange}
          className={s.searchInput}
        />
        <button type="submit" className={s.searchButton}>Search</button>
      </form>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {noMoviesFound && !error && (
        <p className={styles.errorMessage}>No movies found. Please try a different search!</p>
      )}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
