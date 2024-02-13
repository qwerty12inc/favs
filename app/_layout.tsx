import React from "react";
import { Stack } from "expo-router";
import { View, Text } from "react-native";
import { Provider, useSelector } from "react-redux";
import { IStateInterface, store } from "../src/store/store";
import Navigator from "./(navigator)/Navigator";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
