import axios from "axios";
import { GenreList, MoviesList } from "../types/movies.type";

export const fetchMovies = async (): Promise<MoviesList> => {
  const API_URL_KEY: string | undefined = import.meta.env.VITE_API_KEY;
  if (!API_URL_KEY) console.log("API_URL_KEY not defined");

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_URL_KEY}&sort_by=popularity.desc&primary_release_year=2023&page=1&vote_count.gte=100`;
  const response = await axios.get(url);
  const moviesList: MoviesList = response.data.results;
  return moviesList;
};

export const getGenres = async (): Promise<GenreList> => {
  const API_URL_KEY: string | undefined = import.meta.env.VITE_API_KEY;
  if (!API_URL_KEY) console.log("API_URL_KEY not defined");

  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_URL_KEY}`;
  const response = await axios.get(url);
  const genreList: GenreList = response.data.genres;
  return genreList;
};
