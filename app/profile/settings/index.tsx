import { Link, Stack } from "expo-router";
import React from "react";
import { StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, View, Image } from "react-native-ui-lib";
import { globalTokens } from "../../../src/styles";
import { CustomText as Text} from "../../../src/components/Text/CustomText";

const profileIcon = require("../../../assets/link.png");

const SETTINGS_OPTIONS: TSettingsProps[] = [
  {
    name: "Edit profile",
    icon: profileIcon,
    link: "profile",
  },
  {
    name: "My subscription",
    icon: profileIcon,
    link: "subscription",
  },
  {
    name: "How it works",
    icon: profileIcon,
    link: "how",
  },
  {
    name: "Help",
    icon: profileIcon,
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
    borderBottomColor: globalTokens.colors.lightGrey,
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
            headerBackTitleVisible: true,
          }}
        />
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
    backgroundColor: globalTokens.colors.white,
    paddingLeft: 16,
    paddingBottom: 4,
    paddingTop: 7,
    borderRadius: 16,
  },
});
