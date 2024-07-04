import { State } from "../types/state.type";

export const initialState: State = {
  genreList: [],
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
  currentState: 'YEAR_WISE_MOVIES'
};

export const makeMovieGenreFilter = (tagIds: number[], page: number) => {
  let genreFiler = ''

  tagIds?.forEach((tagId, idx) => {
    if (idx == 0) genreFiler += `&with_genres=${tagId}`
    else genreFiler += `${tagId}`
    if (idx < tagIds.length - 1) genreFiler += ','
  })
  genreFiler += `&page=${page}`

  return genreFiler;
}

export const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};