import { Stack } from "expo-router";
import React from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native-ui-lib";

export default function Profile() {
  return (
    <SafeAreaView
        style={styles.container}
    >
      <Stack.Screen
        options={{
          headerTransparent: true,
        //   headerLeft: () => <Text>Back</Text>,
          headerBackButtonMenuEnabled: true
        }}
      />
      <Text>Profile page</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 45,
    }
});