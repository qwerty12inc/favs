import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetVirtualizedList,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PLACES_LIST_MOCK } from "../../src/components/PlacesList/PlaceList";
import PlaceItem from "../../src/components/PlacesList/PlaceItem";

const TestPage = () => {
  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  const renderItem = useCallback(
    ({ item }) => (
      <PlaceItem
        name={item.name}
        address={item.address}
        photos={item.photos}
        id={item.id}
      />
    ),
    []
  );
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
          <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
          <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
          <Button title="Close" onPress={() => handleClosePress()} />
          <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
          >
            <BottomSheetVirtualizedList
              data={PLACES_LIST_MOCK}
              keyExtractor={(i) => i}
              getItemCount={(data) => data.length}
              getItem={(data, index) => data[index]}
              renderItem={renderItem}
              contentContainerStyle={styles.contentContainer}
            />
          </BottomSheet>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop: 200,
    height: "100%",
    // backgroundColor: "red",
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});

export default TestPage;
