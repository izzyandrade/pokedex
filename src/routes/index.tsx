import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Home, PokemonScreen } from "../screens";
import { Platform, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";
import { normalize } from "../utility";

export const AppStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: { headerShown: false },
    },
    Pokemon: {
      screen: PokemonScreen,
      navigationOptions: { headerShown: false },
    },
  },
  {
    initialRouteName: "Home",
  }
);

const AppContainer = createAppContainer(AppStack);

export default AppContainer;
