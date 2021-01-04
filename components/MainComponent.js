import React, { Component } from "react";
import { View, Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import Home from "./HomeComponent";

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

const HomeStackNavigator = createStackNavigator(
  {
    Home: { screen: Home },
  },
  {
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
const HomeNavigator = createAppContainer(HomeStackNavigator);

const MainDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator,
      defaultNavigationOptions: {
        title: "Home",
        drawerLabel: "Home",
      },
    },
    Menu: {
      screen: MenuNavigator,
      navigationOptions: {
        title: "Menu",
        drawerLabel: "Menu",
      },
    },
  },
  {
    drawerBackgroundColor: "#D1C4E9",
  }
);

const MainNavigator = createAppContainer(MainDrawerNavigator);

class Main extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddinTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
        }}
      >
        <MainNavigator />
      </View>
    );
  }
}

export default Main;
