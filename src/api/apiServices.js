import axios from "axios";

const API_KEY = "8adc6def86cb26853c30b1299a4bafbd";
axios.defaults.baseURL = "https://api.themoviedb.org/3/";

export const fetchTrendMovies = async () => {
  const response = await axios(`trending/movie/day?api_key=${API_KEY}`);
  return response.data;
};

export const fetchMovieByKeyword = async (query) => {
  const response = await axios(
    `search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
  );
  return response.data;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios(
    `movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );

  return response.data;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios(
    `movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );

  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios(
    `movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  );

  return response.data;
};
