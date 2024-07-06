import { useEffect, useState, useRef, useCallback } from "react";
import Card from "../Card/Card";
import "./MoviesByYearLayout.css";
import { usefetchMoviesByYear } from "../../apis/useGetMoviesByYear";
import { MoviesList, LoadMovies } from "../../types/movies.type";
import { useGlobalContext } from "../../store/Store";
import Loader from "../Loader/Loader";
import { START_YEAR } from "../../utilities/constant";

function MoviesByYearLayout() {
  const { state, dispatch } = useGlobalContext();
  const [expandedCardId, setExpandedCardId] = useState<number>(-1);
  const [loadData, chageLoadData] = useState<[boolean, LoadMovies]>([
    false,
    "INITIAL_YEAR",
  ]);
  const { loading, hasMoreNext, hasMorePrev } = usefetchMoviesByYear(loadData);

  const observerTop = useRef<IntersectionObserver | null>(null);
  const observerBottom = useRef<IntersectionObserver | null>(null);
  const defaultScrolledViewRef = useRef<IntersectionObserver | null>(null);
  const years = Object.keys(state.yearWiseMovies)
    .map((num) => parseInt(num, 10))
    .sort((a, b) => a - b);

  const freshLoadedRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (
        node &&
        loadData[1] == "PREVIOUS_YEAR" &&
        years &&
        years[0] == START_YEAR - 1
      )
        node.scrollIntoView({ behavior: "auto", block: "start" });
      else if (node && loadData[1] == "PREVIOUS_YEAR")
        node.scrollIntoView({ behavior: "instant", block: "center" });
      if (defaultScrolledViewRef && defaultScrolledViewRef.current)
        defaultScrolledViewRef.current.disconnect();

      defaultScrolledViewRef.current = new IntersectionObserver(() => {});
      if (node) defaultScrolledViewRef.current.observe(node);
    },
    [loading, hasMoreNext, hasMorePrev]
  );

  const lastMovieElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observerBottom && observerBottom.current)
        observerBottom.current.disconnect();

      observerBottom.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreNext) {
          chageLoadData((prev) => [!prev[0], "NEXT_YEAR"]);
        }
      });
      if (node) observerBottom.current.observe(node);
    },
    [loading, hasMoreNext]
  );

  const firstMovieElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observerTop && observerTop.current) observerTop.current.disconnect();
      observerTop.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMorePrev) {
          chageLoadData((prev) => [!prev[0], "PREVIOUS_YEAR"]);
        }
      });
      if (node) observerTop.current.observe(node);
    },
    [loading, hasMorePrev]
  );

  useEffect(() => {
    dispatch({ type: "RESET_MOVIES_DATA" });
  }, []);

  function getRefType(year: number, idx: number, length: number) {
    if (year == years[0] && idx == 0) return firstMovieElementRef;
    else if (year == years[years.length - 1] && idx == length - 1)
      return lastMovieElementRef;
    else return null;
  }

  function movieLayout(year: number, moviesList: MoviesList) {
    return (
      <section
        className="moviesPerYear"
        ref={years.length > 1 && year == years[1] ? freshLoadedRef : null}
      >
        <h2 className="year">{year}</h2>
        <div className="moviesCardView">
          {moviesList.map((movie, idx) => (
            <div ref={getRefType(year, idx, moviesList.length)} key={movie.id}>
              <Card
                key={movie.id}
                data={movie}
                setExpandedCardId={setExpandedCardId}
                expandedCardId={expandedCardId}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="movieListLayout">
      {loading &&
        loadData[1] != "NEXT_YEAR" &&
        years.length > 0 &&
        years[0] != START_YEAR && <Loader />}
      {years.length > 0 &&
        years.map((year) => {
          if (state.yearWiseMovies[year].length == 0) {
            return <div key={year}></div>;
          } else {
            return (
              <div key={year}>
                {movieLayout(year, state.yearWiseMovies[year])}
              </div>
            );
          }
        })}
      {!loading && years.length == 0 && <h1>NO DATA FOUND</h1>}
      {loading && loadData[1] == "NEXT_YEAR" && <Loader />}
    </div>
  );
}

export default MoviesByYearLayout;
