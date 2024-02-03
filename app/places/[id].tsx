import React, { useCallback, useMemo, useRef } from "react";
import {
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  useAnimatedValue,
  ActivityIndicator,
  Pressable,
} from "react-native";
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import {
  Carousel,
  View,
  AnimatedImage,
  Image,
  Chip,
  Card,
} from "react-native-ui-lib";
import MapBlock from "../(components)/Map";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Product from "../(components)/Product";

const mapIcon = require("../../assets/map.png");
const timeIcon = require("../../assets/clock.png");
const linkIcon = require("../../assets/link.png");

const dogPhoto = require("../../assets/random_img.jpeg");
const qr = require("../../assets/qr.png");

const { width, height } = Dimensions.get("window");
const IMG_HEIGHT = 300;

export default function PlacePage() {
  const { id } = useLocalSearchParams();

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  // ref
  const BottomSheetModalRef = useRef<BottomSheetModal>(null);
  const checkInModalRef = useRef<BottomSheetModal>(null);

  const handleOpenModalRef = useCallback((id) => {
    console.log(id)
    checkInModalRef.current?.present();
  }, []);

  const handleCloseModalRef = useCallback(() => {
    checkInModalRef.current?.dismiss();
    handlePresentModalPress();
  }, []);

  const handlePresentModalPress = useCallback(() => {
    BottomSheetModalRef.current?.present();
  }, []);

  // variables
  const snapPoints = useMemo(() => [height - 100, "50%"], []);
  const modalSnapPoints = useMemo(() => ["55%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <Stack.Screen
            options={{
              headerTransparent: true,
              // headerLeft: () => <Text>Back</Text>
            }}
          />
          <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
            <Animated.View style={[styles.image, imageAnimatedStyle]}>
              <Carousel
                containerStyle={{ height: 360, padding: 0, margin: 0 }}
                containerMarginHorizontal={0}
                pagingEnabled
                itemSpacings={0}
                pageWidth={width}
                pageControlPosition={"over"}
                allowAccessibleLayout
              >
                {[1, 2, 3, 4, 5].map((item) => (
                  <View
                    style={{
                      width: "100%",
                      padding: 0,
                      backgroundColor: "grey",
                    }}
                    key={item}
                  >
                    <AnimatedImage
                      style={{ height: "100%", width: "100%" }}
                      source={dogPhoto}
                      loader={<ActivityIndicator />}
                    />
                  </View>
                ))}
              </Carousel>
            </Animated.View>
            <View
              style={{
                display: "flex",
                backgroundColor: "#fff",
                minHeight: height - IMG_HEIGHT,
                borderRadius: 24,
              }}
            >
              <View style={styles.content}>
                <Text
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "left",
                    marginBottom: 8,
                  }}
                >
                  Place name
                </Text>
                <View
                  style={{
                    width: 100,
                  }}
                >
                  <Chip
                    label={"Cafe"}
                    onPress={() => console.log("pressed")}
                    dismissContainerStyle={{ width: 10 }}
                  />
                </View>
                <Text
                  style={{
                    marginTop: 16,
                    fontSize: 14,
                    color: "#aaabab",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Text>
                <View
                  style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 24,
                  }}
                >
                  <Card row>
                    <Card.Section
                      imageSource={mapIcon}
                      imageStyle={{
                        width: 24,
                        height: 24,
                        marginLeft: 20,
                        marginVertical: 25,
                      }}
                    />
                    <Card.Section
                      content={[
                        {
                          text: "Berlin, Fasanenstrasse 40",
                          text80: true,
                          $textDefault: true,
                        },
                        {
                          text: "wix.to/A465c",
                          text90: true,
                          $textDisabled: true,
                        },
                      ]}
                      style={{ padding: 20, flex: 1 }}
                    />
                  </Card>
                  <Card row>
                    <Card.Section
                      imageSource={timeIcon}
                      imageStyle={{
                        width: 24,
                        height: 24,
                        marginLeft: 20,
                        marginVertical: 25,
                      }}
                    />
                    <Card.Section
                      content={[
                        {
                          text: "Wednesday 11:30 AM–11 PM",
                          text90: true,
                          $textDisabled: false,
                        },
                        {
                          text: "Thursday 11:30 AM–11 PM",
                          text90: true,
                          $textDisabled: true,
                        },
                        {
                          text: "Friday 11:30 AM–11 PM",
                          text90: true,
                          $textDisabled: true,
                        },
                        {
                          text: "Sunday 11:30 AM–11 PM",
                          text90: true,
                          $textDisabled: true,
                        },
                        {
                          text: "Monday 11:30 AM–11 PM",
                          text90: true,
                          $textDisabled: true,
                        },
                        {
                          text: "Tuesday 11:30 AM–11 PM",
                          text90: true,
                          $textDisabled: true,
                        },
                      ]}
                      style={{ padding: 20, flex: 1 }}
                    />
                  </Card>
                  <Card row>
                    <Card.Section
                      imageSource={linkIcon}
                      imageStyle={{
                        width: 24,
                        height: 24,
                        marginLeft: 20,
                        marginVertical: 25,
                      }}
                    />
                    <Card.Section
                      content={[
                        {
                          text: "burgermeister.com",
                          text90: true,
                          $textDisabled: false,
                        },
                        {
                          text: "@meisterburger",
                          text90: true,
                          $textDisabled: true,
                        },
                        {
                          text: "+49 179 5154938",
                          text90: true,
                          $textDisabled: true,
                        },
                      ]}
                      style={{ padding: 20, flex: 1 }}
                    />
                  </Card>
                </View>
              </View>
              <View
                style={{
                  width: width,
                  height: 300,
                }}
              >
                <MapBlock
                  initialPosition={{ latitude: 52.52437, longitude: 13.41053 }}
                  zoom={0.05}
                  markers={[{ latitude: 52.52437, longitude: 13.41053 }]}
                />
              </View>
              <View style={{ marginTop: 0 }}>
                <Pressable
                  style={styles.button}
                  onPress={handlePresentModalPress}
                >
                  <Text style={styles.text}>Check in</Text>
                </Pressable>
              </View>
            </View>
          </Animated.ScrollView>
        </View>
        <BottomSheetModal
          ref={BottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          style={styles.shadow}
        >
          <View
            style={[
              styles.content,
              {
                display: "flex",
                gap: 8,
                marginTop: 24,
              },
            ]}
          >
            {["cappuccino", "latte", "water", "espresso", "flat white"].map((item, index) => (
              <Product name={item} description={"Lorem ipsum dolor sit amet"} actionFn={() => handleOpenModalRef(index)} key={index}/>
            ))}
          </View>
        </BottomSheetModal>
        <BottomSheetModal
          ref={checkInModalRef}
          index={0}
          snapPoints={modalSnapPoints}
          detached={true}
          bottomInset={height/3}
          style={[styles.sheetContainer, styles.shadow]}
        >
            <Image
              style={{ height: 280, width: 280 }}
              source={qr}
              // loader={<ActivityIndicator />}
            />
            <View style={{ marginTop: "auto" }}>
              <Pressable
                style={styles.modalButton}
                onPress={handleCloseModalRef}
              >
                <Text style={styles.text}>Close</Text>
              </Pressable>
            </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
  {
    // <View style={styles.placeContent}>
    //   <Text>Place page! {id}</Text>
    // </View>
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "black",
    justifyContent: "center",
  },
  content: {
    marginTop: 25,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  image: {
    width: width,
    height: IMG_HEIGHT,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 24,
    paddingBottom: 64,
    paddingHorizontal: 32,
    borderRadius: 0,
    elevation: 3,
    backgroundColor: "black",
  },
  modalButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  sheetContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
    marginHorizontal: 16,
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
  },
});
