import { GenreList } from "./movies.type";


export interface State {
  genreList: GenreList;
}

export type Action =
 | { type: 'SET_GENRES', payload: GenreList }

export type ReducerType = (state: State, action: Action) => State;


export type ContextHook = () => {
  state: State,
  dispatch: (action: Action) => void;
}