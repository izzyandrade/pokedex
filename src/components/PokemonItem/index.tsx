import React from "react";
import { Pokemon } from "../../ducks/pokemon";
import { Image, Text, View } from "react-native";
import styled from "styled-components/native";
import { typeColors, typeBubbleColors } from "../../../assets/colors";
import { capitalizeFirstLetter } from "../../utility";

type PokemonItemProps = {
  pokemon: Pokemon;
};

interface TypeProps {
  type: string;
}

const PokemonItem = (props: PokemonItemProps) => {
  const { pokemon } = props;
  return (
    <PokemonBox key={pokemon.id} type={pokemon.types[0].type.name}>
      <TextBox>
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          #{pokemon.id}
        </Text>
        <Title>{pokemon.name}</Title>
        <View style={{ display: "flex", flexDirection: "row" }}>
          {pokemon.types.map((type) => {
            return (
              <TypeBox type={type.type.name}>
                <Text style={{ color: "white" }}>
                  {capitalizeFirstLetter(type.type.name)}
                </Text>
              </TypeBox>
            );
          })}
        </View>
      </TextBox>
      <Image
        style={{ width: 130, height: 130 }}
        source={{
          uri: pokemon.img,
        }}
      />
    </PokemonBox>
  );
};

export default PokemonItem;

const PokemonBox = styled.View<TypeProps>`
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
