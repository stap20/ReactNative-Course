import React, { Component } from "react";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import { View, Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const MenuStackNavigator = createStackNavigator(
  {
    Menu: { screen: Menu },
    Dishdetail: { screen: Dishdetail },
  },
  {
    initialRouteName: "Menu",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#512DA8",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }
);

const MenuNavigator = createAppContainer(MenuStackNavigator);

class Main extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddinTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
        }}
      >
        <MenuNavigator />
      </View>
    );
  }
}

export default Main;
