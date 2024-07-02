import { GenreList, MoviesList, MoviesListPerYear, FetchMovieYear } from "./movies.type";


export interface State {
  genreList: GenreList;
  seletedTagId: number;
  moviesPerYear: MoviesListPerYear;
  yearWindowRange: [number, number]
}

export type Action =
 | { type: 'SET_GENRES', genreList: GenreList }
 | { type: 'SET_SELETED_TAG', selectedTagId: number }
 | { type: 'SET_MOVIES_PER_YEAR', moviesPerYear: MoviesListPerYear }
 | { type: 'UPDATE_MOVIES_LIST', fetchYear: FetchMovieYear, movies: MoviesList}

export type ReducerType = (state: State, action: Action) => State;


export type ContextHook = () => {
  state: State,
  dispatch: (action: Action) => void;
}