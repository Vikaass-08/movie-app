import axios from "axios";
import { CastList } from "../types/movies.type";

export const getCast = async (movieId: number): Promise<CastList> => {
  const API_URL_KEY: string | undefined = import.meta.env.VITE_API_KEY;
  if (!API_URL_KEY) console.log("API_URL_KEY not defined");

  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_URL_KEY}`;
  const response = await axios.get(url);
  const genreList: CastList = response?.data?.crew;
  return genreList;
};