import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
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
import { useLocalSearchParams } from "expo-router";
import {
  Carousel,
  View,
  AnimatedImage,
  Image,
  Chip,
  Text,
  ScrollBar,
} from "react-native-ui-lib";
import MapBlock from "../../src/components/Map";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Product from "../../src/components/Product";
import ContactsList from "../../src/components/ContactsList/ContactsList";
import OpeningHours from "../../src/components/OpeningHours/OpeningHours";
import AddressBlock from "../../src/components/AddressBlock/AddressBlock";
import { globalStyles, globalTokens } from "../../src/styles";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapService from "../../src/http/MapService";
import { TMapApiResponse } from "../../src/models/maps";
import Skeleton from "../../src/components/Skeleton/Skeleton";

const dogPhoto = require("../../assets/random_img.jpeg");
const qr = require("../../assets/qr.png");

const { width, height } = Dimensions.get("window");
const IMG_HEIGHT = 300;


const { width, height } = Dimensions.get("window");
const IMG_HEIGHT = 300;

export default function ParallaxMainImage() {

    const { id } = useLocalSearchParams();

    const [placeInfo, setPlaceInfo] = useState<TMapApiResponse>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
  
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);
  
    // ref
    const BottomSheetModalRef = useRef<BottomSheetModal>(null);
    const checkInModalRef = useRef<BottomSheetModal>(null);
  
    const handleOpenModalRef = useCallback((id) => {
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
      // console.log("handleSheetChanges", index);
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
<Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
            <Animated.View style={[styles.image, imageAnimatedStyle]}>
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
            </Animated.View>
            <View
              style={{
                display: "flex",
                backgroundColor: "#fff",
                minHeight: height - IMG_HEIGHT,
                borderRadius: 24,
              }}
            >

            </View>
            </Animated.ScrollView>
  )
}