import React from 'react';
import {Link} from "expo-router"
import {StyleSheet, View, Text, SafeAreaView } from 'react-native';

export default function Layout() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userProfile}>
        <Text>Hello!</Text>
        <View >
          <Link
            href={"/places/1"}
          >
            Go to user
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "#f5f5f7",
    display: "flex",
  },
  userProfile: {
    backgroundColor: "#f9f9f9",
  }
});
