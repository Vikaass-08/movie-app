import { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./MovieListLayout.css";
import { fetchMovies } from "../../apis/getMovies";
import {
  MoviesList,
  MoviesListPerYear,
  FetchMovieYear,
} from "../../types/movies.type";
import { useGlobalContext } from "../../store/Store";

function MovieListLayout() {
  const { state, dispatch } = useGlobalContext();
  const [expandedCardId, setExpandedCardId] = useState<number>(-1);

  async function setMoviesPerYear() {
    try {
      const moviesListPerYear: MoviesListPerYear = {};
      let [startYear, endYear] = state.yearWindowRange;
      for (let startyear = startYear; startyear <= endYear; startyear++) {
        let moviesList: MoviesList = await fetchMovies(
          startyear,
          state.seletedTagIds
        );
        moviesListPerYear[startyear] = moviesList;
      }
      dispatch({
        type: "SET_MOVIES_PER_YEAR",
        moviesPerYear: moviesListPerYear,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMoviesOnScroll(fetchMovieAction: FetchMovieYear) {
    try {
      let [startYear, endYear] = state.yearWindowRange;
      let moviesList: MoviesList =
        fetchMovieAction == "NEXT_YEAR"
          ? await fetchMovies(endYear + 1)
          : await fetchMovies(startYear - 1);
      dispatch({
        type: "UPDATE_MOVIES_LIST",
        fetchYear: fetchMovieAction,
        movies: moviesList,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function areThereMoviesPresent() {
    return Object.values(state.moviesPerYear).filter(moviesPerYear => moviesPerYear.length > 0).reduce((acc, val) => acc + val.length, 0) > 0;
  }

  useEffect(() => {
    setMoviesPerYear();
  }, []);

  useEffect(() => {
    setMoviesPerYear();
  }, [state.seletedTagIds]);

  function movieLayout(year: string, moviesPerYear: MoviesList) {
    return (
      <section className="moviesPerYear" key={year}>
        <h2 className="year">{year}</h2>
        <div className="moviesCardView">
          {moviesPerYear.map((movie) => (
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
    <div className="movieListLayout">
      {areThereMoviesPresent() ? 
        Object.entries(state.moviesPerYear).map(([year, moviesPerYear]) => movieLayout(year, moviesPerYear)) :
        <h2>No Data</h2>
      }
    </div>
  );
}

export default MovieListLayout;
