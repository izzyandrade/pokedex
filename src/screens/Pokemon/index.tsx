import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { connect } from "react-redux";
import { getPokemonByID, Pokemon } from "../../ducks/pokemon";
import { NavigationScreenProp } from "react-navigation";
import styled from "styled-components/native";
import { typeColors, typeBubbleColors } from "../../../assets/colors";
import { capitalizeFirstLetter } from "../../utility";
import Drawings from "./Drawings";
import GoBack from "../../components/Svg/GoBack";

interface PokemonProps {
  pokemon: Pokemon;
  navigation: NavigationScreenProp<any, any>;
}

interface TypeProps {
  type: string;
}

const PokemonScreen = (props: PokemonProps) => {
  const { pokemon } = props;
  return (
    <>
      <PokemonContainer type={pokemon.types[0].type.name}>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 100,
            left: 20,
            right: 0,
            bottom: 0,
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => props.navigation.goBack()}
        >
          <GoBack />
        </TouchableOpacity>

        <Image
          style={{
            width: 150,
            height: 150,
          }}
          source={{
            uri: pokemon.img,
          }}
        />
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
        <Drawings />
      </PokemonContainer>
      <View style={{ backgroundColor: typeColors[pokemon.types[0].type.name] }}>
        <View style={{ padding: 10, marginLeft: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            About
          </Text>
        </View>

        <StatsContainer
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <StatsBox>
            <StatsTitle type={pokemon.types[0].type.name}>
              Pokédex Data
            </StatsTitle>
            {pokemon.stats.map((stat) => {
              if (
                stat.stat.name === "special-attack" ||
                stat.stat.name === "special-defense"
              ) {
                return null;
              } else {
                return (
                  <Text key={stat.stat.name} style={{ paddingVertical: 5 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                      {stat.stat.name.toUpperCase()}
                    </Text>
                    {"    "} - {"    "}
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "grey",
                      }}
                    >
                      {stat.base_stat}
                    </Text>
                  </Text>
                );
              }
            })}
          </StatsBox>
          <StatsBox>
            <StatsTitle type={pokemon.types[0].type.name}>Abilities</StatsTitle>
            {pokemon.abilities.map((ab, index) => {
              return (
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "grey",
                    paddingVertical: 5,
                  }}
                  key={index}
                >
                  {index + 1}.
                  {" " +
                    capitalizeFirstLetter(ab.ability.name.replace("-", " "))}
                </Text>
              );
            })}
          </StatsBox>
        </StatsContainer>
      </View>
    </>
  );
};

export default connect(getPokemonByID, () => ({}))(PokemonScreen);

const PokemonContainer = styled.View<TypeProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-horizontal: 40px;
  padding-vertical: 10px;
  background-color: ${(props) => typeColors[props.type]};
  height: 50%;
`;

const StatsContainer = styled.View`
  height: 100%;
  background-color: #e5e5e5;
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const StatsBox = styled.View`
  flex: 1;
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
  padding-left: 20px;
`;

const Title = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 32px;
  padding-vertical: 10px;
`;

const StatsTitle = styled.Text<TypeProps>`
  color: ${(props) => typeBubbleColors[props.type]};
  font-size: 25px;
  font-weight: bold;
`;
