import axios, { CancelTokenSource } from "axios";
import { useEffect, useState } from "react";
import { MoviesList } from "../types/movies.type";
import { useGlobalContext } from "../store/Store";

export const useFilteredMoviesByTag = (
  tagIds: number[],
  page: number
): { loading: boolean; hasMoreMovies: boolean } => {
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMoreMovies, setHasMoreMovies] = useState<boolean>(false);
  const { dispatch } = useGlobalContext();

  const API_URL_KEY: string | undefined = import.meta.env.VITE_API_KEY;
  if (!API_URL_KEY) console.log("API_URL_KEY not defined");

  const fetchMoviesWithTags = async (
    source: CancelTokenSource
  ): Promise<void> => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: API_URL_KEY,
            with_genres: tagIds.join(","),
            sort_by: "popularity.desc",
            "vote_count.gte": 100,
            Page: page,
          },
          cancelToken: source.token,
        }
      );

      const moviesList: MoviesList = res.data.results;
      moviesList.forEach((movie) => {
        movie.poster_path = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      });
      moviesList.sort((a, b) => b.popularity - a.popularity);

      dispatch({ type: "INIT_MOVIES_WITH_GENRES", moviesList: moviesList });
      setHasMoreMovies(page < res.data.total_pages);
      setLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Filter Movies By Tag API Req Canceled");
        return;
      }
      console.error("Filter Movies By Tag API Req: ", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    let source: CancelTokenSource = axios.CancelToken.source();
    fetchMoviesWithTags(source);

    return () => {
      if (source) source.cancel();
    };
  }, [tagIds, page]);

  return {
    loading,
    hasMoreMovies,
  };
};
