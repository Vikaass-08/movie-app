import { useEffect } from "react";
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

  async function setMoviesPerYear() {
    try {
      const moviesListPerYear: MoviesListPerYear = {};
      let [startYear, endYear] = state.yearWindowRange;
      for (let startyear = startYear; startyear <= endYear; startyear++) {
        let moviesList: MoviesList = await fetchMovies(startyear);
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

  useEffect(() => {
    setMoviesPerYear();
  }, []);

  return (
    <div className="movieListLayout">
      {Object.entries(state.moviesPerYear).map(
        ([year, moviesPerYear]) => (
          <section className="moviesPerYear" key={year}>
            <h3>{year}</h3>
            <div className="moviesCardView">
              {moviesPerYear.map((movie) => (
                <Card key={movie.id} extendedView={false} data={movie} />
              ))}
            </div>
          </section>
        )
      )}
    </div>
  );
}

export default MovieListLayout;
