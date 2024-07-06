import { GenreList, MoviesList } from "./movies.type";

export type AppState = "SEARCH_MOVIES" | "FILTERS_MOVIES" | "YEAR_WISE_MOVIES";
export interface State {
  genreList: GenreList;
  searchString: string;
  seletedTagIds: Array<number>;
  yearWiseMovies: {
    [year: string]: MoviesList;
  };
  searchedMovies: MoviesList;
  moviesWithGenresTag: MoviesList;
  currentState: AppState;
}

export type Action =
  | { type: "RESET_MOVIES_DATA" }
  | { type: "SET_GENRES"; genreList: GenreList }
  | { type: "SET_SELETED_TAG"; selectedTagId: number }
  | {
      type: "MOVIES_PER_YEAR";
      moviesListPerYear: { [year: string]: MoviesList };
    }
  | { type: "INIT_MOVIES_WITH_GENRES"; moviesList: MoviesList }
  | { type: "INIT_MOVIES_WITH_SEARCH"; moviesList: MoviesList }
  | { type: "UPDATE_SEARCH_STRING"; searchString: string };

export type ReducerType = (state: State, action: Action) => State;

export type ContextHook = () => {
  state: State;
  dispatch: (action: Action) => void;
};
