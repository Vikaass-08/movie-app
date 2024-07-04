import { useEffect, useState, useRef, useCallback } from "react";
import Card from "../Card/Card";
import "./MoviesByYearLayout.css";
import { usefetchMoviesByYear } from "../../apis/useGetMoviesByYear";
import {
  MoviesList
} from "../../types/movies.type";
import { useGlobalContext } from "../../store/Store";

function MoviesByYearLayout() {
  const { state, dispatch } = useGlobalContext();
  const [expandedCardId, setExpandedCardId] = useState<number>(-1);
  const movieListViewRef = useRef<HTMLDivElement>(null);
  const [prevYear, changePrevYear] = useState<number>(2012)
  const [nextYear, changeNextYear] = useState<number>(2012)
  const [currYear, changeCurrentYear] = useState<number>(2012)
  const [firstLoad, setFirstLoad] = useState<boolean>(true)
  const defaultScrolledViewRef = useRef<HTMLDivElement | null>(null);
  const {loading, hasMoreNext, hasMorePrev} = usefetchMoviesByYear(prevYear, nextYear, currYear);

  const observerTop = useRef<IntersectionObserver | null>(null);
  const observerBottom = useRef<IntersectionObserver | null>(null);

  const lastMovieElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return
    if (observerBottom && observerBottom.current) observerBottom.current.disconnect()
    observerBottom.current = new IntersectionObserver(entries => {
      console.log("INSIDE NEXT 1", hasMoreNext, nextYear, firstLoad)
      if (entries[0].isIntersecting && hasMoreNext && !firstLoad) {
        console.log("INSIDE NEXT 2", hasMoreNext)
        changeNextYear(prev => prev + 1);
        changeCurrentYear(nextYear + 1);
      }
    })
    if (node) observerBottom.current.observe(node)
  }, [loading, hasMoreNext, firstLoad])

  const firstMovieElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return
    if (observerTop && observerTop.current) observerTop.current.disconnect()
    observerTop.current = new IntersectionObserver(entries => {
      console.log("INSIDE PREV 1", hasMorePrev, prevYear)
      if (entries[0].isIntersecting && hasMorePrev && !firstLoad) {
        console.log("INSIDE PREV 2", hasMorePrev)
        changePrevYear(prev => prev - 1);
        changeCurrentYear(prevYear - 1);
      }
    })
    if (node) observerTop.current.observe(node)
  }, [loading, hasMorePrev, firstLoad])

  function areThereMoviesPresent() {
    let movieListByYearObject = Object.values(state.yearWiseMovies.moviesPerYear);
    return movieListByYearObject.map((moviesListEachYear) => moviesListEachYear.length).reduce((acc, num) => acc += num, 0) > 0
  }

  useEffect(() => {
    dispatch({type: "RESET_MOVIES_DATA"})
  }, []);

  useEffect(() => {
    const activeViewElement = defaultScrolledViewRef.current;
    if(activeViewElement) {
      if(prevYear >= 2011) activeViewElement.scrollIntoView({behavior: "instant"})
      setFirstLoad(false);
    }
  }, [state.yearWiseMovies.moviesPerYear])
  


  function movieLayout(year: string, moviesList: MoviesList) {
    return (
      <section className="moviesPerYear" ref={ year == "2012" ? defaultScrolledViewRef: null}>
        <h2 className="year">{year}</h2>
        <div className="moviesCardView">
          {moviesList.map((movie) => (
            <Card
              key={movie.id}
              data={movie}
              setExpandedCardId={setExpandedCardId}
              expandedCardId={expandedCardId}
            />
          ))}
        </div>
      </section>
    );
  };
  

  return (
    <div ref={movieListViewRef} className="movieListLayout">
      {loading && (<h1>Loading More....</h1>)}
      {areThereMoviesPresent() ?
        Object.entries(state.yearWiseMovies.moviesPerYear).map(([year, moviesList]) => {
          if(moviesList.length == 0) {
            return <div key={year}></div>
          }
          else if(prevYear == +year && nextYear != +year) {
            return <div key={year} ref={firstMovieElementRef}> {movieLayout(year, state.yearWiseMovies.moviesPerYear[year])}</div>
          }
          else if(nextYear == +year) {
            return <div key={year} ref={lastMovieElementRef}> {movieLayout(year, state.yearWiseMovies.moviesPerYear[year])}</div>
          }
          else {
            return <div key={year}> {movieLayout(year, state.yearWiseMovies.moviesPerYear[year])}</div>
          }
        }):
        <h2>No Data</h2>
      }
    </div>
  );
}

export default MoviesByYearLayout;
