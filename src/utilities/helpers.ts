import { State } from "../types/state.type";

export const initialState: State = {
  genreList: [],
  seletedTagIds: [],
  searchString: "",
  yearWiseMovies: {
    yearWindowRange: [2011, 2012, 2013, 2014],
    moviesPerYear: {},
  },
  searchedMovies: [],
  moviesWithGenresTag: [],
  currentState: "YEAR_WISE_MOVIES",
};

export const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
