import React from "react";
import { Pokemon } from "../../ducks/pokemon";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { typeColors, typeBubbleColors } from "../../../assets/colors";
import { capitalizeFirstLetter } from "../../utility";
import PokeballSvg from "../Svg/Pokeball";
import Pattern from "../Svg/Pattern";
import { NavigationScreenProp } from "react-navigation";

type PokemonItemProps = {
  pokemon: Pokemon;
  navigation: NavigationScreenProp<any, any>;
};

interface TypeProps {
  type: string;
}

const PokemonItem = (props: PokemonItemProps) => {
  const { pokemon } = props;
  return (
    <PokemonBox
      key={pokemon.id}
      type={pokemon.types[0].type.name}
      onPress={() => props.navigation.navigate("Pokemon", { id: pokemon.id })}
    >
      <TextBox>
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          #{pokemon.id}
        </Text>
        <Title>{pokemon.name}</Title>
        <TypeContainer>
          {pokemon.types.map((type, index) => {
            return (
              <TypeBox type={type.type.name} key={index}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {capitalizeFirstLetter(type.type.name)}
                </Text>
              </TypeBox>
            );
          })}
        </TypeContainer>
      </TextBox>
      <View style={{ justifyContent: "center" }}>
        <Image
          style={{
            width: 150,
            height: 150,
          }}
          resizeMode={"contain"}
          source={{
            uri: pokemon.img,
          }}
        />
      </View>
      <Pattern
        style={{
          position: "absolute",
          top: 10,
          left: 80,
          right: 0,
          bottom: 0,
        }}
      />
    </PokemonBox>
  );
};

export default PokemonItem;

const PokemonBox = styled.TouchableOpacity<TypeProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${(props) => typeColors[props.type]};
  margin-vertical: 15px;
  height: 130px;
  border-radius: 15px;
  elevation: 3;
`;

const TypeContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const TypeBox = styled.View<TypeProps>`
  background-color: ${(props) => typeBubbleColors[props.type]};
  padding: 5px;
  margin-right: 5px;
  border-radius: 5px;
  min-width: 50px;
  max-width: 80px;
  align-items: center;
  padding: 10px;
`;

const TextBox = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 26px;
  padding-vertical: 10px;
`;
