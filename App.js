import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Components/Home";
import Settings from "./Components/Settings";
import Category from "./Components/Category";
import NewNotesPage from "./Screens/NewNotesPage";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomHeader from "./Components/CustomHeader";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import React, { useState, useEffect } from "react";
import useStore from "./Store/Store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { useNavigationState } from "@react-navigation/native";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  const route = useStore((state) => state.currentRoute);
  const changeRoute = useStore((state) => state.changeRoute);
  return (
    <Tab.Navigator
      onStateChange={(state) => {
        const route = state.routes[state.index];
        changeRoute(route);
      }}
      activeColor="white"
      barStyle={{
        backgroundColor: "black",
        position: "absolute",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: 100,
        overflow: "hidden",
      }}
      labeled={false}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Category") {
            iconName = focused ? "albums" : "albums-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={25}
              color={focused ? "gray" : "lightgray"}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default function App() {
  const route = useStore((state) => state.currentRoute);
  const changeRoute = useStore((state) => state.changeRoute);
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/Fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/Fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("./assets/Fonts/Poppins-Regular.ttf")
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer
      onStateChange={(state) => {
        const currentRoute = state.routes[state.index];
        changeRoute(currentRoute.name);
      }}
    >
      <StatusBar backgroundColor="white" />
      <CustomHeader title={route} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="NewNotesPage" component={NewNotesPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
