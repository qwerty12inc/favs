import React from "react";
import { StyleSheet, ScrollView, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, View, Text, Image } from "react-native-ui-lib";
import HistoryList from "../../src/components/HistoryList/HistoryList";
import { globalStyles, globalTokens } from "../../src/styles";
import CurrentSubscription from "../../src/components/CurrentSubscription/CurrentSubscription";
import { CustomText, CustomTitle } from "../../src/components/Text/CustomText";
import useAuth from "../../src/utils/auth";

const settingsIcon = require("../../assets/icon--settings.png");

const { width, height } = Dimensions.get("window");

export default function ProfilePage() {
  const { user } = useAuth()
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ paddingHorizontal: 16, height: height - 100 }}>

        <View style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            source={{
              uri: "https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg",
            }}
            containerStyle={{ width: 120, height: 120 }}
            imageStyle={{ width: "100%", height: "100%" }}
          />
          <CustomTitle style={[globalStyles.title, { marginTop: 16 }]}>
            {user?.displayName ? user?.displayName : "–"}
          </CustomTitle>
          <CustomText>{user?.email ? user?.email : "–"}</CustomText>
        </View>
        <View style={{ display: "flex", gap: 8, marginVertical: 45 }}>
          <Text Text style={globalStyles.subtitle}>
            Your subscription
          </Text>
          <CurrentSubscription />
          <Text style={globalStyles.subtitle}>History</Text>
          <HistoryList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    // backgroundColor: globalTokens.colors.white,
  },
  list: {
    marginTop: 24,
    backgroundColor: globalTokens.colors.lightGrey,
    paddingLeft: 16,
    paddingBottom: 4,
    paddingTop: 7,
    borderRadius: 16,
  },
});
