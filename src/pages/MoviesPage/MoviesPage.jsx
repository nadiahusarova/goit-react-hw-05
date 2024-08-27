import { useCallback, useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { searchMovies } from "../../api";
import s from "./MoviesPage.module.css";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [noMovies, setNoMovies] = useState(false);

  const handleSearch = useCallback(
    async (searchQuery, updateURL = true) => {
      if (searchQuery.trim() === "") {
        setMovies([]);
        setError(null);
        setNoMovies(true);
        return;
      }

      try {
        const results = await searchMovies(searchQuery);
        setMovies(results);
        setError(null);
        setNoMovies(results.length === 0);

        if (updateURL) {
          setSearchParams({ query: searchQuery });
        }
      } catch (error) {
        setError("Failed to fetch movies.");
        setMovies([]);
        setNoMovies(false);
      }
    },
    [setSearchParams]
  );

  useEffect(() => {
    const queryParam = searchParams.get("query") || "";
    setQuery(queryParam);

    if (queryParam) {
      handleSearch(queryParam, false);
    }
  }, [handleSearch, searchParams]);

  const onChange = (event) => {
    const newValue = event.target.value;
    setQuery(newValue);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSearch(query);
  };

  return (
    <div className={s.pageContainer}>
      <h2 className={s.title}>Search Movies</h2>
      <div className={s.searchBox}>
        <form className={s.form} onSubmit={onSubmit}>
          <input
            placeholder="Enter movie title..."
            type="search"
            value={query}
            onChange={onChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {error && <p className={s.error}>{error}</p>}
      {noMovies && !error && (
        <p className={s.noMovies}>No movies found. Please try again!</p>
      )}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
