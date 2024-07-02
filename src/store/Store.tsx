import {
  createContext,
  useReducer,
  Dispatch,
  ReactNode,
  useContext,
} from "react";

import { reducer } from "./reducers";
import { State, Action, ContextHook } from "../types/state.type";

const initialState: State = {
  genreList: [],
  seletedTagIds: [],
  moviesPerYear: {},
  yearWindowRange: [2011, 2014]
};

const globalContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});


export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <globalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

// Custom context hook
export const useGlobalContext: ContextHook = () => {
  const { state, dispatch } = useContext(globalContext);
  return { state, dispatch };
};
