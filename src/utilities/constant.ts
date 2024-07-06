import { State } from "../types/state.type";

const START_YEAR: number = 2012;
const FIRST_MOVIE_YEAR: number = 1888;
const BRAND_NAME: string = "MOVIEFIX";

const MoviePosterPath = (fileName: string) =>
  `https://image.tmdb.org/t/p/w500/${fileName}`;

const initialState: State = {
  genreList: [],
  seletedTagIds: [],
  searchString: "",
  yearWiseMovies: {},
  searchedMovies: [],
  moviesWithGenresTag: [],
  currentState: "YEAR_WISE_MOVIES",
};

export {
  START_YEAR,
  FIRST_MOVIE_YEAR,
  MoviePosterPath,
  initialState,
  BRAND_NAME,
};
