import { hen, Hen } from "../utility";
import { createSelector } from "reselect";
import { RootState } from "./state";
import { ThunkAction } from "redux-thunk";
import axios from "axios";

export type PokemonList = {
  count: number;
  next: string;
  previous: string;
  results: Array<{
    name: string;
    url: string;
  }>;
};

export type Stat = {
  base_stat: number;
  effort: 0;
  stat: {
    name: string;
    url: string;
  };
};

export type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type Pokemon = {
  id: number;
  name: string;
  url: string;
  stats: Array<Stat>;
  abilities: Array<Ability>;
  img: string;
};

export interface InitialState {
  pokemonList: PokemonList;
  pokemonByID: { [id: number]: Pokemon };
}

let initialState: InitialState = {
  pokemonList: {} as PokemonList,
  pokemonByID: {},
};

//Selectors
const pokemonSelector = (state: RootState) => state.pokemon;

export const getPokemonList = createSelector(pokemonSelector, (state) => {
  const pokemonArray: Array<Pokemon> = Object.keys(state.pokemonByID).map(
    (id) => {
      return state.pokemonByID[id];
    }
  );
  console.log("POKEMON ARRAY", pokemonArray);
  return {
    pokemon: pokemonArray,
  };
});

class PokemonSection extends Hen<InitialState> {
  loadPokemonList(p: PokemonList) {
    this.state.pokemonList = p;
  }

  loadPokemonByID(p: Pokemon) {
    this.state.pokemonByID[p.id!] = p;
  }
}
//Reducers
export const [Reducer, actions] = hen(new PokemonSection(initialState));

//Actions
export function listPokemon(): ThunkAction<Promise<void>, RootState, any, any> {
  return async (dispatch, getState) => {
    const nextPokes = getState().pokemon?.pokemonList?.next;
    return axios
      .get(nextPokes ?? `https://pokeapi.co/api/v2/pokemon/`)
      .then((r) => {
        dispatch(actions.loadPokemonList(r.data));
        r.data.results.map((poke: { name: string; url: string }) => {
          return axios.get(poke.url).then((r) => {
            const newPoke: Pokemon = {
              id: r.data.id,
              name: r.data.name,
              url: poke.url,
              stats: r.data.stats,
              abilities: r.data.abilities,
              img: r.data.sprites.other["official-artwork"]["front_default"],
            };
            dispatch(actions.loadPokemonByID(newPoke));
          });
        });
      })
      .catch((e) => {});
  };
}
