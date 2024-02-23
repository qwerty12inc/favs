import { Link, Stack } from "expo-router";
import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, View, Text, Image } from "react-native-ui-lib";
import { globalStyles } from "../../src/styles";

const proileIcon = require("../../assets/link.png");

const SETTINGS_OPTIONS: TSettingsProps[] = [
  {
    name: "Edit profile",
    icon: proileIcon,
    link: "profile",
  },
  {
    name: "My subscription",
    icon: proileIcon,
    link: "subscription",
  },
  {
    name: "How it works",
    icon: proileIcon,
    link: "how",
  },
  {
    name: "Help",
    icon: proileIcon,
    link: "help",
  },
];

type TSettingsProps = {
  name: string;
  icon: any;
  link: string;
  last?: boolean;
};

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Stack.Screen
          options={{
            headerTransparent: true,
            //   headerLeft: () => <Text>Back</Text>,
            headerBackButtonMenuEnabled: true,
          }}
        />
        <View style={{ display: "flex", alignItems: "center" }}>
          <Text style={globalStyles.title}>Welcome!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    paddingHorizontal: 16,
  },
  list: {
    marginTop: 24,
    backgroundColor: "lightgray",
    paddingLeft: 16,
    paddingBottom: 4,
    paddingTop: 7,
    borderRadius: 16,
  },
});
