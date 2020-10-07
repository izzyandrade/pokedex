import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Container } from "../../components/Container";
import PokemonItem from "../../components/PokemonItem";
import { connect } from "react-redux";
import { listPokemon, getPokemonList, Pokemon } from "../../ducks/pokemon";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";

type HomeProps = {
  listPokemon: () => Promise<void>;
  pokemon: Array<Pokemon>;
};

const Home = (props: HomeProps) => {
  const [scrollBegin, setScrollBegin] = useState(false);
  const [onEndReached, setOnEndReached] = useState(false);
  const [loadingList, setLoadingList] = useState(false);

  useEffect(() => {
    const { listPokemon } = props;
    setLoadingList(true);
    listPokemon().finally(() => {
      setLoadingList(false);
    });
  }, []);

  const renderItem = ({ item }: { item: Pokemon }) => {
    return <PokemonItem pokemon={item} />;
  };

  const renderLoading = () => {
    if (loadingList) {
      return (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 130,
          }}
        >
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    } else {
      return null;
    }
  };

  const callOnEndReached = () => {
    const { listPokemon } = props;
    setLoadingList(true);
    listPokemon().finally(() => {
      setLoadingList(false);
    });
  };

  const { pokemon } = props;
  return (
    <Container>
      <FlatList
        style={{ width: "100%", height: "100%" }}
        data={pokemon}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onMomentumScrollBegin={() => setScrollBegin(true)}
        onMomentumScrollEnd={() => setScrollBegin(false)}
        onEndReached={() => callOnEndReached()}
        ListFooterComponent={renderLoading}
      />
    </Container>
  );
};

export default connect(getPokemonList, (dispatch: any) => ({
  listPokemon: () => dispatch(listPokemon()),
}))(Home);
