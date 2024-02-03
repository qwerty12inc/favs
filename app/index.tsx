import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { StyleSheet, Text, SafeAreaView, Dimensions } from "react-native";
import { Avatar, View, Picker, ModalProps } from "react-native-ui-lib";
import MapBlock from "./(components)/Map";

export default function Layout() {
  const options = [
    { label: "Moscow", value: "Moscow" },
    { label: "Milan", value: "Milan" },
    { label: "Amsterdam", value: "Amsterdam" },
    { label: "Berlin", value: "Berlin" },
  ];

  let cityPosition = new Map();
  cityPosition.set("Moscow", { latitude: 55.7522, longitude: 37.6156 });
  cityPosition.set("Milan", { latitude: 45.46427, longitude: 9.18951 });
  cityPosition.set("Amsterdam", { latitude: 52.37403, longitude: 4.88969 });
  cityPosition.set("Berlin", { latitude: 52.52437, longitude: 13.41053 });

  const [city, setCity] = useState<any>(options[2].value);

  useEffect(() => {
    console.log("Город", city);
    console.log(cityPosition.get(city));
  }, [city]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userProfile}>
        <SafeAreaView>
          <Picker
            placeholder="Choose city"
            value={city}
            defaultValue={options[0].value}
            onChange={(items) => setCity(items)}
            mode={Picker.modes.SINGLE}
            // trailingAccessory={dropdownIcon}
            fieldType="filter"
            topBarProps={{ containerStyle: { marginTop: 60 } }}
            pickerModalProps={{
              containerStyle: { margin: 60, padding: 100, height: 200 },
              animationType: "slide",
            }}
          >
            {options.map((option) => (
              <Picker.Item
                key={option.value}
                value={option.value}
                label={option.label}
              />
            ))}
          </Picker>
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
      <View>
        <Link href={"/places/1"}>Go to place #1</Link>
        <Link href={"/places/2"}>Go to place #2</Link>
      </View>
      <View style={styles.mapContainer}>
        <MapBlock initialPosition={cityPosition.get(city)} />
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
  mapContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  userProfile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#f0f0f0",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  userAvatar: {
    marginLeft: "auto",
  },
  padding: {
    marginTop: 100,
  },
});
