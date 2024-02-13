import { Link, Stack } from "expo-router";
import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, View, Text, Image } from "react-native-ui-lib";

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
          <Avatar
            source={{
              uri: "https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg",
            }}
            containerStyle={{ width: 120, height: 120 }}
            imageStyle={{ width: "100%", height: "100%" }}
          />
          <Text text40BO style={{ marginTop: 16 }}>
            Name Surname
          </Text>
          <Text>example@example.com</Text>
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
