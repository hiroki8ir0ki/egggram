import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";

import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCvtAAamGXDEvxYYOBypoE8xTESHX_irX8",
  authDomain: "egggram-12710.firebaseapp.com",
  databaseURL: "https://egggram-12710.firebaseio.com",
  projectId: "egggram-12710",
  storageBucket: "egggram-12710.appspot.com",
  messagingSenderId: "491282191001",
  appId: "1:491282191001:web:6c5175446e8bab35eade08",
};

firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  Home: HomeScreen,
});

const AuthStack = createStackNavigator({
  Register: RegisterScreen,
  Login: LoginScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouterName: "Loading",
    }
  )
);
