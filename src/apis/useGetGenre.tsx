import axios, { Canceler } from "axios";
import { useEffect, useState } from "react";
import { GenreList } from "../types/movies.type";
import { useGlobalContext } from "../store/Store";

export const useGetGenres = (): {loading: boolean} => {
  const [loading, setLoading] = useState(true);
  const { dispatch } = useGlobalContext();
  
  const API_URL_KEY: string | undefined = import.meta.env.VITE_API_KEY;
  if (!API_URL_KEY) console.log("API_URL_KEY not defined");

  useEffect(() => {
    setLoading(true);
    let cancel: Canceler;
    axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_URL_KEY}`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        let result: GenreList = res.data.genres
        dispatch({type: "SET_GENRES", genreList: result})
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          console.log("Get Genres API Req Cancel")
          return;
        }
      });
    return () => cancel();
  }, []);

  return {loading: loading}
};
