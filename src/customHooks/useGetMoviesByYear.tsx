import axios, { CancelTokenSource } from "axios";
import { useEffect, useState } from "react";
import {MoviesList } from "../types/movies.type";
import { useGlobalContext } from "../store/Store";

export const usefetchMoviesByYear = (
  prevYear: number,
  nextYear: number,
  currYear: number
): {
  loading: boolean;
  hasMorePrev: boolean;
  hasMoreNext: boolean;
} => {
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMorePrev, setHasMorePrev] = useState<boolean>(false);
  const [hasMoreNext, setHasMoreNext] = useState<boolean>(false);
  const { dispatch } = useGlobalContext();

  const API_URL_KEY: string | undefined = import.meta.env.VITE_API_KEY;
  if (!API_URL_KEY) console.log("API_URL_KEY not defined");

  const fetchData = async (source: CancelTokenSource): Promise<void> => {
    try {
    const res = await axios.get("https://api.themoviedb.org/3/discover/movie", {
      params: {
        api_key: API_URL_KEY,
        primary_release_year: currYear,
        sort_by: "popularity.desc",
        "vote_count.gte": 100,
        Page: 1,
      },
      cancelToken: source.token,
    });

    let moviesList: MoviesList = res.data.results;
    moviesList.forEach((movie) => {
      movie.poster_path = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    });
    moviesList.sort((a, b) => b.popularity - a.popularity);
    console.log(currYear, " -> ", moviesList);
    dispatch({
      type: "INIT_MOVIES_PER_YEAR",
      moviesListPerYear: { [currYear]: moviesList },
    });
    setHasMoreNext(nextYear != new Date().getFullYear());
    setHasMorePrev(prevYear != 1888);
    setLoading(false);
  }
  catch(err) {
    if (axios.isCancel(err)) {
      console.log("Get Movies By Year API Req Canceled");
      return;
    }
    console.error("Fetch Data Error Movies by year: ", err);
  }
  };

  useEffect(() => {
    setLoading(true);
    
    let source: CancelTokenSource = axios.CancelToken.source();
    fetchData(source);

    return () => {
      if (source) source.cancel();
    };
  }, [currYear]);

  return {
    loading,
    hasMoreNext,
    hasMorePrev,
  };
};
