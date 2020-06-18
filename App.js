import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";

import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import HomeScreen from "./screens/HomeScreen";
import MessageScreen from "./screens/MessageScreen";
import PostScreen from "./screens/PostScreen";
import NotificationScreen from "./screens/NotificationScreen";
import ProfileScreen from "./screens/ProfileScreen";
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

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" size={24} color={tintColor} />
        ),
      },
    },
    Message: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-chatboxes" size={24} color={tintColor} />
        ),
      },
    },
    Post: {
      screen: PostScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons 
            name="ios-add-circle" 
            size={48} 
            color="#E9446A" 
            style={{ 
              shadowColor: "#E9446A", 
              shadowOffset: { width: 0, height: 0  }, 
              shadowRadius: 10, 
              shadowOpacity: 0.3  
          
          }} 
          />
        ),
      },
    },
    Notification: {
      screen: NotificationScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-notifications" size={24} color={tintColor} />
        ),
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-person" size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "#161F3D",
      inactiveTintColor: "#B8BBC4",
      showLabel: false,
    },
  }
);

const AuthStack = createStackNavigator({
  Register: RegisterScreen,
  Login: LoginScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppTabNavigator,
      Auth: AuthStack,
    },
    {
      initialRouterName: "Loading",
    }
  )
);
