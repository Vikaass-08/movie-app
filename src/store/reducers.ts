import { GenreList, MoviesData, MoviesList } from "../types/movies.type";
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

const addMoviesListPerYear = (state: State, moviesList: {[year: string]: MoviesList}): State => {
  return {...state, yearWiseMovies: {...state.yearWiseMovies, moviesPerYear: {...state.yearWiseMovies.moviesPerYear, ...moviesList}}}
};

const updateMoviesList = (state: State, fetchMoviesFromYear: number,  moviesList: MoviesList): State => {
  let yearWindowRange = state.yearWiseMovies.yearWindowRange;
  if(fetchMoviesFromYear < yearWindowRange[0]) yearWindowRange = [fetchMoviesFromYear, ...yearWindowRange];
  else yearWindowRange = [...yearWindowRange, fetchMoviesFromYear];
  console.log(yearWindowRange);
  let newState: State = {
    ...state, 
    yearWiseMovies: {
      yearWindowRange: [...yearWindowRange],
      moviesPerYear: {...state.yearWiseMovies.moviesPerYear, [fetchMoviesFromYear]: moviesList}
    }
  }
  console.log(newState);
  return newState;
};

const resetMoviesData = (state: State): State => {
  const newState: State = {
    ...state,
    seletedTagIds: [],
    yearWiseMovies: {
      yearWindowRange: [2011, 2012, 2013, 2014],
      moviesPerYear: {}
    },
    searchedMovies: {
      moviesList: [],
      page: 1,
      total_pages: 1
    },
    moviesWithGenres: {
      moviesList: [],
      page: 1,
      total_pages: 1
    },
  }
  return newState;
};


export const reducer: ReducerType = (state, action) => {
  switch (action.type) {
      case 'SET_GENRES':
        return setGenresInState(state, action.genreList);
      case 'SET_SELETED_TAG':
        return setSelectedTag(state, action.selectedTagId);
      case 'INIT_MOVIES_PER_YEAR':
        return addMoviesListPerYear(state, action.moviesListPerYear);
      case 'UPDATE_MOVIES_PER_YEAR':
        return updateMoviesList(state, action.fetchMoviesFromYear, action.moviesList);
      case 'RESET_MOVIES_DATA':
        return resetMoviesData(state);
      default:
        return state;
  }
};