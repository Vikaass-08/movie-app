import axios, { CancelTokenSource } from "axios";
import { useEffect, useState } from "react";
import { MoviesList } from "../types/movies.type";
import { useGlobalContext } from "../store/Store";

export const useSearchMovies = (searchKey: string, page: number) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMoreMovies, setHasMoreMovies] = useState<boolean>(false);
  const { dispatch } = useGlobalContext();

  const API_URL_KEY: string | undefined = import.meta.env.VITE_API_KEY;
  if (!API_URL_KEY) console.log("API_URL_KEY not defined");

  const fetchMoviesWithSearchKey = async (
    source: CancelTokenSource
  ): Promise<void> => {
    try {
      const res = await axios.get("https://api.themoviedb.org/3/search/movie", {
        params: {
          api_key: API_URL_KEY,
          query: searchKey,
          sort_by: "popularity.desc",
          Page: page,
        },
        cancelToken: source.token,
      });

      const moviesList: MoviesList = res.data.results;

      moviesList.forEach((movie) => {
        movie.poster_path = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
          : "";
      });
      moviesList.sort((a, b) => b.popularity - a.popularity);

      dispatch({ type: "INIT_MOVIES_WITH_SEARCH", moviesList: moviesList });
      setHasMoreMovies(page < res.data.total_pages);
      setLoading(false);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Search Movie API Req Canceled");
        return;
      }
      console.error("Error in Search Movie API: ", err);
    }
  };

  useEffect(() => {
    setLoading(true);
    let source: CancelTokenSource = axios.CancelToken.source();
    fetchMoviesWithSearchKey(source);
    return () => {
      if (source) source.cancel();
    };
  }, [searchKey, page]);

  return {
    loading,
    hasMoreMovies,
  };
};
