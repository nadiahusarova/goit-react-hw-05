import axios from "axios";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDgyNmNhOTUyNTE0YzgzMDMxYjUyY2UxODIxZDA5ZCIsIm5iZiI6MTcyNDc3OTIyMi40NjE4NTMsInN1YiI6IjY2Y2UwN2UzZGE5NjBiMDg1YTRmZjVlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZR_vGrMa3cA_3jMcgOotwGePwQtVntV7bgO2B4ByCws";
const BASE_URL = "https://api.themoviedb.org/3";

const fetchTrendingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/day`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return res.data.results;
};

const searchMovies = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    params: {
      query,
    },
  });
  return response.data.results;
};

const fetchMovieDetails = async (movieId) => {
  const res = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return res.data;
};

const fetchMovieCredits = async (movieId) => {
  const res = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return res.data.cast;
};

const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return response.data.results;
};

export {
  fetchTrendingMovies,
  searchMovies,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieReviews,
};