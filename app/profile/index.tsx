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

function SettingsItem(props: TSettingsProps) {
  return (
    <Link href={props.link} style={SettingsItemStyles.container}>
      <View style={SettingsItemStyles.block}>
        <View style={SettingsItemStyles.icon}>
          <Image style={SettingsItemStyles.icon} source={props.icon} />
        </View>
        <View
          style={[
            SettingsItemStyles.text,
            props.last && SettingsItemStyles.lastText,
          ]}
        >
          <Text style={{ fontSize: 18 }}>{props.name}</Text>
        </View>
      </View>
    </Link>
  );
}

const SettingsItemStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: 0,
    // alignItems: "center",
    // paddingTop: 8,
    // borderWidth: 1,
    // borderColor: "red",
  },
  block: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 2,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  text: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingTop: 8,
    paddingBottom: 16,
    flexGrow: 1,
  },
  lastText: {
    borderBottomWidth: 0,
    paddingTop: 12,
    paddingBottom: 8,
  },
});

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
        <View>
          <View style={styles.list}>
            {SETTINGS_OPTIONS.map((option, index) => {
              return (
                <SettingsItem
                  key={index}
                  name={option.name}
                  link={option.link}
                  icon={option.icon}
                  last={index === SETTINGS_OPTIONS.length - 1}
                />
              );
            })}
          </View>
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
