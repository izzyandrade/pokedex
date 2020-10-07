import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { Container, Title } from "./styles";
import { connect } from "react-redux";
import { listPokemon, getPokemonList, Pokemon } from "../../ducks/pokemon";

type HomeProps = {
  listPokemon: () => void;
  pokemon: Array<Pokemon>;
};

const Home = (props: HomeProps) => {
  useEffect(() => {
    const { listPokemon } = props;
    listPokemon();
  }, []);

  const { pokemon } = props;
  return (
    <Container>
      <ScrollView>
        {pokemon.map((poke) => {
          return <Title>{poke.name}</Title>;
        })}
      </ScrollView>
    </Container>
  );
};

export default connect(getPokemonList, (dispatch: any) => ({
  listPokemon: () => dispatch(listPokemon()),
}))(Home);
