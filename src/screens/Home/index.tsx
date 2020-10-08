import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { Container } from "../../components/Container";
import PokemonItem from "../../components/PokemonItem";
import { connect } from "react-redux";
import { listPokemon, getPokemonList, Pokemon } from "../../ducks/pokemon";
import { FlatList } from "react-native-gesture-handler";
import HomePokeball from "../../components/Svg/HomePokeball";

type HomeProps = {
  listPokemon: () => Promise<void>;
  pokemon: Array<Pokemon>;
  navigation: any;
};

const Home = (props: HomeProps) => {
  const [scrollBegin, setScrollBegin] = useState(false);
  const [loadingList, setLoadingList] = useState(false);

  useEffect(() => {
    const { listPokemon } = props;
    setLoadingList(true);
    listPokemon().finally(() => {
      setLoadingList(false);
    });
  }, []);

  const renderItem = ({ item }: { item: Pokemon }) => {
    return <PokemonItem pokemon={item} navigation={props.navigation} />;
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
      <HomePokeball
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
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
        ListHeaderComponent={renderHeader}
      />
    </Container>
  );
};

export default connect(getPokemonList, (dispatch: any) => ({
  listPokemon: () => dispatch(listPokemon()),
}))(Home);
