import { GenreList } from "../types/movies.type";
import { State, ReducerType } from "../types/state.type";


const setGenresInState = (state: State, payload: GenreList): State => {
  return {...state, genreList: payload};
};


export const reducer: ReducerType = (state, action) => {
  switch (action.type) {
      case 'SET_GENRES':
        return setGenresInState(state, action.payload);
      default:
        return state;
  }
};