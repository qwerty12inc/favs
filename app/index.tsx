import React, { useCallback, useMemo, useRef } from "react";
import { Link } from "expo-router";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Dimensions,
} from "react-native";
import { Avatar, View } from "react-native-ui-lib";
import MapBlock from "../src/components/Map";
import { useSelector } from "react-redux";
import { IStateInterface } from "../src/store/store";
import CityPicker from "../src/components/CityPicker";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export default function Layout() {
  const auth = useSelector(
    (state: IStateInterface) => state.authentication.isLogined
  );
  const cities = useSelector((state: IStateInterface) => state.cities.cities);
  const currentCity = useSelector(
    (state: IStateInterface) => state.cities.current
  );
  const snapPoints = useMemo(() => [100, height - 195], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const BottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [text, onChangeText] = React.useState("");

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.userProfile}>
            <SafeAreaView>
              <CityPicker />
            </SafeAreaView>
            <Link href={"/profile"} style={styles.userAvatar}>
              <Avatar
                source={{
                  uri: "https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg",
                }}
                label={"it"}
              />
            </Link>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              zIndex: 20,
              backgroundColor: "white",
              paddingBottom: 16,
              shadowColor: "#888888",
              shadowOffset: {
                width: 0,
                height: 24,
              },
              shadowOpacity: 0.1,
              shadowRadius: 10.0,
              elevation: 10,
            }}
          >
            <View style={{ paddingVertical: 0 }}>
              <TextInput
                // value={text}
                onChangeText={onChangeText}
                placeholder={"Search"}
                onChange={(e) => {
                  console.log(e.nativeEvent.text);
                }}
                style={{
                  backgroundColor: "rgba(118, 118, 128, 0.12)",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  fontSize: 17,
                  lineHeight: 22,
                  marginVertical: 20,

                  borderRadius: 10,
                }}
              />
              <SegmentedControl
                values={["Coffee", "Drink", "Eat"]}
                selectedIndex={0}
                style={{ paddingVertical: 16 }}
                // onChange={(event) => {
                //   this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
                // }}
              />
            </View>
          </View>
          <View style={styles.mapContainer}>
            <MapBlock initialPosition={cities[currentCity]} />
          </View>
          <BottomSheet
            style={styles.shadow}
            ref={BottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <View
              style={{
                display: "flex",
                gap: 8,
                paddingHorizontal: 16,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  // marginBottom: 24,
                  fontWeight: "500",
                  fontSize: 18,
                  marginTop: 14,
                  marginBottom: 14,
                }}
              >
                24 places
              </Text>
              <Link href={"/places/1"}>Go to place #1</Link>
              <Link href={"/places/2"}>Go to place #2</Link>
            </View>
          </BottomSheet>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    display: "flex",
    backgroundColor: "white",
  },
  mapContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 32,
  },
  userProfile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  userAvatar: {
    marginLeft: "auto",
  },
  padding: {
    marginTop: 100,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    zIndex: 10,
  },
});
