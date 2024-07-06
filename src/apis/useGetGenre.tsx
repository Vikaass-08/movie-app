import axios, { CancelTokenSource } from "axios";
import { useEffect, useState } from "react";
import { GenreList } from "../types/movies.type";
import { useGlobalContext } from "../store/Store";

export const useGetGenres = (): { loading: boolean } => {
  const [loading, setLoading] = useState(true);
  const { dispatch } = useGlobalContext();

  const API_URL_KEY: string | undefined = import.meta.env.VITE_API_KEY;
  if (!API_URL_KEY) console.log("API_URL_KEY not defined");

  const fetchGenres = async (source: CancelTokenSource) => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list",
        {
          params: {
            api_key: API_URL_KEY,
          },
          cancelToken: source.token,
        }
      );
      let result: GenreList = res.data.genres;
      dispatch({ type: "SET_GENRES", genreList: result });
      setLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Get Cast API Req Canceled");
        return;
      }
      console.error("Get Cast API Req: ", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    let source: CancelTokenSource = axios.CancelToken.source();
    fetchGenres(source);

    return () => {
      if (source) source.cancel();
    };
  }, []);

  return { loading: loading };
};
