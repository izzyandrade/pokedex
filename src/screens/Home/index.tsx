import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Container } from "../../components/Container";
import PokemonItem from "../../components/PokemonItem";
import { connect } from "react-redux";
import { listPokemon, getPokemonList, Pokemon } from "../../ducks/pokemon";
import HomePokeball from "../../components/Svg/HomePokeball";

type HomeProps = {
  listPokemon: () => Promise<void>;
  pokemon: Array<Pokemon>;
  loadingList: boolean;
  navigation: any;
};

const Home = (props: HomeProps) => {
  const [loadingMore, setLoadingMore] = useState(false);

  const getItemLayout = (data: any, index: number) => ({
    length: 130,
    offset: 130 * index,
    index,
  });

  useEffect(() => {
    const { listPokemon } = props;
    listPokemon();
  }, []);

  function renderItem({ item }: { item: Pokemon }) {
    return <PokemonItem pokemon={item} navigation={props.navigation} />;
  }

  const renderLoading = () => {
    return loadingMore ? (
      <ActivityIndicator size="large" color="#00ff00" />
    ) : (
      <TouchableOpacity
        onPress={() => {
          setLoadingMore(true);
          props.listPokemon().finally(() => setLoadingMore(false));
        }}
        style={{
          height: 100,
          borderRadius: 20,
          marginBottom: 20,
          borderStyle: "dashed",
          borderWidth: 1,
          borderColor: "black",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, color: "grey", fontWeight: "bold" }}>
          Load more Pokémon
        </Text>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          height: 100,
          justifyContent: "center",
          marginTop: 100,
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "black" }}>
          Pokédex
        </Text>
        <Text style={{ color: "grey", fontSize: 18 }}>
          Look at all known Pokémon stats!
        </Text>
        <Text style={{ color: "grey", fontSize: 18 }}>Hope you have fun!</Text>
      </View>
    );
  };

  const { pokemon } = props;
  return (
    <Container>
      <HomePokeball
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      {!pokemon ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <FlatList
          style={{ width: "100%", height: "100%" }}
          data={pokemon}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={renderLoading}
          ListHeaderComponent={renderHeader}
          getItemLayout={getItemLayout}
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={10} // Reduce initial render amount
          maxToRenderPerBatch={5} // Reduce number in each render batch
          windowSize={10} // Reduce the window size
        />
      )}
    </Container>
  );
};

export default connect(getPokemonList, (dispatch: any) => ({
  listPokemon: () => dispatch(listPokemon()),
}))(Home);
