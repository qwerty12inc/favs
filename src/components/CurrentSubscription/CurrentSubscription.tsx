import { View, StyleSheet } from "react-native";
import { Text, Image } from "react-native-ui-lib";
import React from "react";
import { globalTokens } from "../../styles";
const coffeePhoto = require("../../../assets/kv--coffee.png");

export default function CurrentSubscription() {
  return (
    <View style={styles.block}>
      <View style={styles.text__container}>
        <Text style={styles.subscription__title}>Subscription name</Text>
        <Text style={styles.subscription__description}>5 € per month</Text>
      </View>
      <View style={styles.image__container}>
        <Image source={coffeePhoto} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 12,
    overflow: "hidden",
    width: "100%",
    justifyContent: "space-between",
    height: 150,
    backgroundColor: globalTokens.colors.white,
  },
  text__container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 4,
    paddingLeft: 16,
  },
  subscription__title: {
    fontSize: 22,
    fontWeight: "600",
    color: globalTokens.colors.black,
  },
  subscription__description: {
    fontSize: 16,
    color: globalTokens.colors.darkGrey,
  },
  image__container: {
    height: "100%",
    width: "50%",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
