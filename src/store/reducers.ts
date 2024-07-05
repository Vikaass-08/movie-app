import { GenreList, MoviesList } from "../types/movies.type";
import { State, ReducerType } from "../types/state.type";

const setGenresInState = (state: State, genreList: GenreList): State => {
  return {
    ...state,
    genreList: genreList,
  };
};

const setSelectedTag = (state: State, tagId: number): State => {
  let tagIds = state.seletedTagIds.filter((id) => id != tagId);
  if (state.seletedTagIds.includes(tagId)) {
    return {
      ...state,
      moviesWithGenresTag: [],
      searchString: "",
      seletedTagIds: tagIds,
      currentState: tagIds.length > 0 ? "FILTERS_MOVIES" : "YEAR_WISE_MOVIES",
    };
  } else {
    tagIds.push(tagId);
    return {
      ...state,
      seletedTagIds: tagIds,
      searchString: "",
      moviesWithGenresTag: [],
      currentState: tagIds.length > 0 ? "FILTERS_MOVIES" : "YEAR_WISE_MOVIES",
    };
  }
};

const addMoviesListPerYear = (
  state: State,
  moviesList: { [year: string]: MoviesList }
): State => {
  return {
    ...state,
    yearWiseMovies: {
      ...state.yearWiseMovies,
      moviesPerYear: {
        ...state.yearWiseMovies.moviesPerYear,
        ...moviesList,
      },
    },
    currentState: "YEAR_WISE_MOVIES",
  };
};

const addMoviesListWithGenreTag = (
  state: State,
  moviesList: MoviesList
): State => {
  return {
    ...state,
    moviesWithGenresTag: [
      ...state.moviesWithGenresTag,
      ...moviesList
    ],
    currentState: "FILTERS_MOVIES",
  };
};

const addMoviesListWithSearchKey = (
  state: State,
  moviesList: MoviesList
): State => {
  return {
    ...state,
    searchedMovies: [
      ...state.searchedMovies,
      ...moviesList
    ],
    currentState: "SEARCH_MOVIES"
  };
};

const changeSearchString = (
  state: State,
  searchString: string
): State => {
  return {
    ...state,
    searchedMovies: [],
    seletedTagIds: [],
    yearWiseMovies: {
      ...state.yearWiseMovies,
      moviesPerYear: {}
    },
    searchString: searchString,
    currentState: searchString.trim().length == 0 ? "YEAR_WISE_MOVIES" : "SEARCH_MOVIES"
  };
};

const resetMoviesData = (state: State): State => {
  const newState: State = {
    ...state,
    seletedTagIds: state.currentState != 'FILTERS_MOVIES' ? []: state.seletedTagIds,
    yearWiseMovies: {
      yearWindowRange: [2011, 2012, 2013, 2014],
      moviesPerYear: {},
    },
    searchedMovies: [],
    moviesWithGenresTag: [],
  };
  return newState;
};

export const reducer: ReducerType = (state, action) => {
  switch (action.type) {
    case "SET_GENRES":
      return setGenresInState(state, action.genreList);
    case "SET_SELETED_TAG":
      return setSelectedTag(state, action.selectedTagId);
    case "INIT_MOVIES_PER_YEAR":
      return addMoviesListPerYear(state, action.moviesListPerYear);
    case "RESET_MOVIES_DATA":
      return resetMoviesData(state);
    case "INIT_MOVIES_WITH_GENRES":
      return addMoviesListWithGenreTag(state, action.moviesList);
    case "INIT_MOVIES_WITH_SEARCH":
      return addMoviesListWithSearchKey(state, action.moviesList);
    case "UPDATE_SEARCH_STRING":
      return changeSearchString(state, action.searchString);
    default:
      return state;
  }
};
