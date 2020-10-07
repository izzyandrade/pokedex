import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Home } from "../screens";
import { Platform, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";
import { normalize } from "../utility";

const navigationOptionsBuilder = (
  props: {
    onBack?: (navigation: any) => void;
    title?: string;
  },
  overwrite?: any
) => ({ navigation }: any) => ({
  title: navigation.getParam("title") ?? props.title,
  headerStyle:
    Platform.OS === "ios"
      ? {}
      : {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          paddingTop: Constants.statusBarHeight + 40,
        },
  ...(Platform.OS === "ios"
    ? {}
    : {
        headerForceInset: { top: "never", bottom: 30 },
      }),
  headerTintColor: "black",
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? undefined : normalize(25),
  },
  headerLeft: (
    <TouchableOpacity
      style={{ paddingHorizontal: 15 }}
      onPress={() => {
        requestAnimationFrame(() => {
          props.onBack?.(navigation);
          !props.onBack && navigation.goBack();
        });
      }}
    >
      <Feather
        name="chevron-left"
        size={Platform.OS === "ios" ? 24 : 40}
        color={"green"}
      />
    </TouchableOpacity>
  ),
  ...(typeof overwrite === "function"
    ? overwrite({ navigation })
    : overwrite ?? {}),
});

export const AppStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: navigationOptionsBuilder(
        {
          title: "Pokédex",
        },
        { headerLeft: null }
      ),
    },
  },
  {
    initialRouteName: "Home",
  }
);

const AppContainer = createAppContainer(AppStack);

export default AppContainer;
