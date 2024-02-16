import React, { useCallback } from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { Card, Image } from "react-native-ui-lib";
import { globalTokens } from "../../styles";
import { useNavigation } from "expo-router";

const coffeePhoto = require("../../../assets/coffee_cup.png");

type TProps = {
  link: string;
};

function HistoryItem(props: TProps) {
  const navigation = useNavigation();

  const handleClick = useCallback(() => {
    //@ts-ignore
    navigation.navigate("places/[id]", { id: props.link });
  }, []);

  return (
    <Card onPress={handleClick} style={styles.item}>
      <View style={styles.item__icon}>
        <Image source={coffeePhoto} width={48} height={48} />
      </View>
      <View style={styles.item__text}>
        <Text style={styles.place_name}>Place name</Text>
        <Text style={styles.place_description}>Coffee at 13:41, 05 June</Text>
      </View>
    </Card>
  );
}

export default function HistoryList() {
  return (
    <View style={styles.list}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el, index) => (
        <HistoryItem link={el.toString()} key={index} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: "center",
    backgroundColor: globalTokens.colors.white,
    borderRadius: 0,
  },
  item__icon: {
    marginRight: 8,
  },
  item__text: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  place_name: {
    fontSize: 18,
    fontWeight: "600",
    color: globalTokens.colors.black,
  },
  place_description: {
    fontSize: 14,
    color: globalTokens.colors.darkGrey,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    borderRadius: 12,
    backgroundColor: globalTokens.colors.white,
    overflow: "hidden",
  },
});
