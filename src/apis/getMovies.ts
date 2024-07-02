import axios from "axios";
import { GenreList, MoviesList } from "../types/movies.type";

export const fetchMovies = async (year: number, tagIds?: number[]): Promise<MoviesList> => {
  const API_URL_KEY: string | undefined = import.meta.env.VITE_API_KEY;
  if (!API_URL_KEY) console.log("API_URL_KEY not defined");

  let genreFiler = ''

  tagIds?.forEach((tagId, idx) => {
    if(idx == 0) genreFiler += `with_genres=${tagId}`
    else genreFiler += `${tagId},`

    if(idx < tagIds.length - 1)  genreFiler += ','
  })

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_URL_KEY}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100&${genreFiler}`;
  const response = await axios.get(url);
  const moviesList: MoviesList = response.data.results;
  moviesList.forEach(movie => {
    movie.poster_path = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  })
  moviesList.sort((a, b) => b.popularity - a.popularity);
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
