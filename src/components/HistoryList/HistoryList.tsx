import React from "react";
import { View, Text, Image } from "react-native";

const instIcon = require("../../../assets/icon--instagram.png");

function HistoryItem() {
  return (
    <View>
      <View>
        <Image source={instIcon} />
      </View>
      <View>
        <Text>Place name</Text>
        <Text>Coffee at 13:41 05 June</Text>
      </View>
    </View>
  );
}

export default function HistoryList() {
  return <View></View>;
}
