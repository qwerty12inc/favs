import { Link, Stack } from "expo-router";
import React from "react";
import { StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, View, Text, Image } from "react-native-ui-lib";

const settingsIcon = require("../../assets/icon--settings.png");

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Stack.Screen
          options={{
            headerTransparent: true,
            //   headerLeft: () => <Text>Back</Text>,
            headerBackButtonMenuEnabled: true,
            headerRight: () => (
              <Link href={"/profile/settings"}>
                <Image
                  source={settingsIcon}
                  style={{ width: 24, height: 24, opacity: 0.7 }}
                />
              </Link>
            ),
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
