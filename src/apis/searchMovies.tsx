import axios from "axios";
import { MoviesList, MoviesData } from "../types/movies.type";

export const fetchMoviesBySearchKey = async (
  searchKey: string,
  page: number = 1
): Promise<MoviesData> => {
  const API_URL_KEY: string | undefined = import.meta.env.VITE_API_KEY;
  if (!API_URL_KEY) console.log("API_URL_KEY not defined");

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_URL_KEY}&sort_by=popularity.asc&query=${searchKey}&page=${page}&vote_count.gte=100`;
  const response = await axios.get(url);
  const moviesList: MoviesList = response.data.results;

  moviesList.forEach((movie) => {
    movie.poster_path = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  });
  moviesList.sort((a, b) => b.popularity - a.popularity);

  return {
    page: response.data.page,
    total_pages: response.data.total_pages,
    moviesList: moviesList,
  };
};
