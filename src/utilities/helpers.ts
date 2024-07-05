import { State } from "../types/state.type";

export const initialState: State = {
  genreList: [],
  seletedTagIds: [],
  searchString: "",
  yearWiseMovies: {},
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
