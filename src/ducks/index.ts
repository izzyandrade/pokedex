import { combineReducers, Reducer } from "redux";
import { PURGE } from "redux-persist";
import axios from "axios";
import { RootState } from "./state";
import { Reducer as pokemonReducer } from "./pokemon";

export interface Action {
  type: string;
  payload: any;
}

export const reducers: Reducer<RootState> = combineReducers<RootState>({
  pokemon: pokemonReducer,
});

axios.defaults.headers = {
  "Content-Type": "application/json",
};

export const rootReducer = (state: RootState, action: any) => {
  if (action.type === "UNAUTHORIZED") {
    state = {} as any;
    action = { type: PURGE };
  }

  return reducers(state, action);
};

export type Error = any;
