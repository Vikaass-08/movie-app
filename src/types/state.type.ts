import { GenreList, MoviesData, MoviesList } from "./movies.type";


export type AppState = 'SEARCH_MOVIES' | 'FILTERS_MOVIES' | 'YEAR_WISE_MOVIES';
export interface State {
  genreList: GenreList;
  seletedTagIds: Array<number>,
  yearWiseMovies: {
    yearWindowRange: number[],
    moviesPerYear: {
      [year: string]: MoviesList
    }
  }
  searchedMovies: MoviesData,
  moviesWithGenres: MoviesData,
  currentState: AppState
}

export type Action =
 | { type: 'SET_GENRES', genreList: GenreList }
 | { type: 'SET_SELETED_TAG', selectedTagId: number }
 | { type: 'INIT_MOVIES_PER_YEAR', moviesListPerYear: {[year: string]: MoviesList}}
 | { type: 'UPDATE_MOVIES_PER_YEAR',fetchMoviesFromYear: number,  moviesList: MoviesList}
 | { type: 'RESET_MOVIES_DATA'}

export type ReducerType = (state: State, action: Action) => State;


export type ContextHook = () => {
  state: State,
  dispatch: (action: Action) => void;
}