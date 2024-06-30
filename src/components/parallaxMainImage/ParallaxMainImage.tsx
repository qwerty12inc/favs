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
  View,
  AnimatedImage,
} from "react-native-ui-lib";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { TMapApiResponse } from "../../../src/models/maps";

const dogPhoto = require("../../assets/random_img.jpeg");
const qr = require("../../assets/qr.png");

const { width, height } = Dimensions.get("window");
const IMG_HEIGHT = 300;

export default function ParallaxMainImage() {
  
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);
  
    // ref
    const BottomSheetModalRef = useRef<BottomSheetModal>(null);
    const checkInModalRef = useRef<BottomSheetModal>(null);
  
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