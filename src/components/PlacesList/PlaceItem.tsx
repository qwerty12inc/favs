import { Link, useNavigation } from "expo-router";
import React from "react";
import {
  View,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageSourcePropType,
} from "react-native";
import { Carousel, AnimatedImage, Text } from "react-native-ui-lib";
const dogPhoto = require("../../../assets/random_img.jpeg");

const { width, height } = Dimensions.get("window");

type TProps = {
  id: number;
  name: string;
  address: string;
  photos: string[];
  isFirst?: boolean;
};

export default function PlaceItem(props: TProps) {
  const navigation = useNavigation();

  const onPress = () => {
    //@ts-ignore
    navigation.navigate("places/[id]", { id: props.id });
  };

  return (
    <Link
      style={[props.isFirst && { marginTop: 0 }, styles.container]}
      href={"/places/1"}
    >
      <View>
        <Carousel
          containerStyle={{
            height: 250,
            padding: 0,
            margin: 0,
          }}
          containerMarginHorizontal={0}
          pagingEnabled
          itemSpacings={0}
          pageWidth={width}
          pageControlPosition={"over"}
          allowAccessibleLayout
          style={{ borderRadius: 8 }}
        >
          {props.photos.map((item) => (
            <TouchableWithoutFeedback key={item.toString()} onPress={onPress}>
              <View
                style={{
                  width: "100%",
                  padding: 0,
                  backgroundColor: "grey",
                }}
              >
                <AnimatedImage
                  style={{ height: "100%", width: "100%" }}
                  source={{ uri: item }}
                  loader={<ActivityIndicator />}
                />
              </View>
            </TouchableWithoutFeedback>
          ))}
        </Carousel>

        <Text style={styles.place__name}>{props.name}</Text>
        <Text style={styles.place__address}>{props.address}</Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    marginVertical: 24,
    // backgroundColor: "red",
    height: "auto",
  },
  place__name: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 8,
  },
  place__address: {
    fontSize: 16,
    fontWeight: "500",
    color: "grey",
    marginTop: 4,
  },
});
