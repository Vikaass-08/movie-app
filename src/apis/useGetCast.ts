import { useEffect, useState } from "react";
import axios, { CancelTokenSource } from "axios";
import { CastList } from "../types/movies.type";

export const useGetCast = (
  movieId: number
): {
  loading: boolean;
  castList: CastList;
} => {
  const [loading, setLoading] = useState<boolean>(true);
  const [castList, setCastList] = useState<CastList>([]);

  const API_URL_KEY: string | undefined = import.meta.env.VITE_API_KEY;
  if (!API_URL_KEY) console.log("API_URL_KEY not defined");

  const fetchCastMember = async (source: CancelTokenSource) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits`,
        {
          params: {
            api_key: API_URL_KEY,
          },
          cancelToken: source.token,
        }
      );

      const newCastList: CastList = res?.data?.crew;
      setCastList(newCastList);
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
    fetchCastMember(source);

    return () => {
      if (source) source.cancel();
    };
  }, [movieId]);

  return {
    loading,
    castList,
  };
};
