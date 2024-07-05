import { useEffect, useState, useRef, useCallback } from "react";
import Card from "../Card/Card";
import { useGlobalContext } from "../../store/Store";
import { useFilteredMoviesByTag } from "../../customHooks/useFilteredMovies";
import "./FilteredTagMoviesLayout.css";

function FilteredTagMoviesLayout() {
  const { state, dispatch } = useGlobalContext();
  const [page, setPage] = useState<number>(1);
  const [expandedCardId, setExpandedCardId] = useState<number>(-1);
  const { loading, hasMoreMovies } = useFilteredMoviesByTag(
    state.seletedTagIds,
    page
  );

  const observerBottom = useRef<IntersectionObserver | null>(null);

  const lastMovieElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observerBottom && observerBottom.current)
        observerBottom.current.disconnect();
      observerBottom.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreMovies) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observerBottom.current.observe(node);
    },
    [loading, hasMoreMovies]
  );

  useEffect(() => {
    dispatch({ type: "RESET_MOVIES_DATA" });
  }, []);

  return (
    <div className="filteredMoviesList">
      {state.moviesWithGenresTag.length > 0 && (
        <section className="filteredMovieCards">
          {state.moviesWithGenresTag.map((movie, idx) => (
            <div
              ref={
                idx == state.moviesWithGenresTag.length - 1
                  ? lastMovieElementRef
                  : null
              }
              key={movie.id}
            >
              <Card
                key={movie.id}
                data={movie}
                setExpandedCardId={setExpandedCardId}
                expandedCardId={expandedCardId}
              />
            </div>
          ))}
        </section>
      )}
      {!loading && state.moviesWithGenresTag.length == 0 && <h2>No Data</h2>}
      {loading && <h1>Loading more....</h1>}
    </div>
  );
}

export default FilteredTagMoviesLayout;
