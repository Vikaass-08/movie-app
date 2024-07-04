import axios, { Canceler } from "axios";
import { useEffect, useState } from "react";
import { GenreList, MoviesList, MoviesData } from "../types/movies.type";
import { makeMovieGenreFilter } from "../utilities/helpers";
import { useGlobalContext } from "../store/Store";

export const usefetchMoviesByYear = (prevYear: number, nextYear: number, currYear: number): {
  loading: boolean;
  hasMorePrev: boolean;
  hasMoreNext: boolean;
} => {
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMorePrev, setHasMorePrev] = useState<boolean>(false)
  const [hasMoreNext, setHasMoreNext] = useState<boolean>(false)
  const { dispatch } = useGlobalContext();

  const API_URL_KEY: string | undefined = import.meta.env.VITE_API_KEY;
  if (!API_URL_KEY) console.log("API_URL_KEY not defined");

  useEffect(() => {
    setLoading(true);
    let cancel: Canceler;
    axios({
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        api_key: API_URL_KEY, 
        primary_release_year: currYear,
        sort_by: "popularity.asc",
        "vote_count.gte": 100,
        Page: 1
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
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
        setHasMoreNext(nextYear != new Date().getFullYear())
        setHasMorePrev(prevYear != 1888);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          console.log("Get Movies By Year API Req Canceled");
          return;
        }
      });
    return () => cancel();
  }, [prevYear, nextYear]);


  return {
    loading,
    hasMoreNext, 
    hasMorePrev
  };
};

export const fetchMoviesByTags = async (
  tagIds: number[],
  page: number
): Promise<MoviesData> => {
  const API_URL_KEY: string | undefined = import.meta.env.VITE_API_KEY;
  if (!API_URL_KEY) console.log("API_URL_KEY not defined");

  const FILTER_PARMS = makeMovieGenreFilter(tagIds, page);

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_URL_KEY}&sort_by=popularity.asc${FILTER_PARMS}&vote_count.gte=100`;
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

export const getGenres = async (): Promise<GenreList> => {
  const API_URL_KEY: string | undefined = import.meta.env.VITE_API_KEY;
  if (!API_URL_KEY) console.log("API_URL_KEY not defined");

  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_URL_KEY}`;
  const response = await axios.get(url);
  const genreList: GenreList = response.data.genres;
  return genreList;
};
