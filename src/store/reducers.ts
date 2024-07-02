import { GenreList, MoviesListPerYear, MoviesList, FetchMovieYear } from "../types/movies.type";
import { State, ReducerType } from "../types/state.type";


const setGenresInState = (state: State, genreList: GenreList): State => {
  return {...state, genreList: genreList};
};

const setSelectedTag = (state: State, tagId: number): State => {
  let tagIds = state.seletedTagIds.filter(id => id != tagId);
  if(state.seletedTagIds.includes(tagId)) {
    return {...state, seletedTagIds: tagIds};
  }
  else {
    tagIds.push(tagId);
    return {...state, seletedTagIds: tagIds};
  }
};

const addMoviesListPerYear = (state: State, moviesPerYear: MoviesListPerYear): State => {
  return {...state, moviesPerYear: moviesPerYear};
};

const updateMoviesList = (state: State, fetchYear: FetchMovieYear, movies: MoviesList): State => {
  let [start, end] = state.yearWindowRange;
  let moviesPerYear = state.moviesPerYear;

  if(fetchYear == "NEXT_YEAR") {
    delete moviesPerYear[start];
    moviesPerYear[end + 1] = movies;
    return {...state, moviesPerYear: moviesPerYear, yearWindowRange: [start + 1, end + 1]};
  }
  else {
    delete moviesPerYear[end];
    moviesPerYear[start - 1] = movies;
    return {...state, moviesPerYear: moviesPerYear, yearWindowRange: [start - 1, end - 1]};
  }

};


export const reducer: ReducerType = (state, action) => {
  switch (action.type) {
      case 'SET_GENRES':
        return setGenresInState(state, action.genreList);
      case 'SET_SELETED_TAG':
        return setSelectedTag(state, action.selectedTagId);
      case 'SET_MOVIES_PER_YEAR':
          return addMoviesListPerYear(state, action.moviesPerYear);
      case 'UPDATE_MOVIES_LIST':
        return updateMoviesList(state, action.fetchYear, action.movies);
      default:
        return state;
  }
};