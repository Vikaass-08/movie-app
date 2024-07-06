import axios, { CancelTokenSource } from "axios";
import { useEffect, useState } from "react";
import { MoviesList, LoadMovies } from "../types/movies.type";
import { useGlobalContext } from "../store/Store";
import { FIRST_MOVIE_YEAR, START_YEAR } from "../utilities/constant";

export const usefetchMoviesByYear = (
  loadData: [boolean, LoadMovies]
): {
  loading: boolean;
  hasMorePrev: boolean;
  hasMoreNext: boolean;
} => {
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMorePrev, setHasMorePrev] = useState<boolean>(false);
  const [hasMoreNext, setHasMoreNext] = useState<boolean>(false);
  const { state, dispatch } = useGlobalContext();

  const API_URL_KEY: string | undefined = import.meta.env.VITE_API_KEY;
  if (!API_URL_KEY) console.log("API_URL_KEY not defined");

  const fetchData = async (source: CancelTokenSource): Promise<void> => {
    try {
      const fetchedYears: number[] = Object.keys(state.yearWiseMovies)
        .map((num) => parseInt(num, 10))
        .sort((a, b) => a - b);
      let year: number;
      if (loadData[1] == "PREVIOUS_YEAR") {
        year = fetchedYears[0] - 1;
      } else if (loadData[1] == "NEXT_YEAR") {
        year = fetchedYears[fetchedYears.length - 1] + 1;
      } else {
        year = START_YEAR;
      }
      const res = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: API_URL_KEY,
            primary_release_year: year,
            sort_by: "popularity.desc",
            "vote_count.gte": 100,
            Page: 1,
          },
          cancelToken: source.token,
        }
      );

      let moviesList: MoviesList = res.data.results;
      moviesList.forEach((movie) => {
        movie.poster_path = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
          : "";
      });
      moviesList.sort((a, b) => b.popularity - a.popularity);
      dispatch({
        type: "MOVIES_PER_YEAR",
        moviesListPerYear: { [year]: moviesList },
      });
      setHasMoreNext(year != new Date().getFullYear());
      setHasMorePrev(year != FIRST_MOVIE_YEAR);
      setLoading(false);
    } catch (err) {
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
  }, [loadData]);

  return {
    loading,
    hasMoreNext,
    hasMorePrev,
  };
};
