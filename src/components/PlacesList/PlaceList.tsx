import { View, Text, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import PlaceItem from "./PlaceItem";
import { BottomSheetVirtualizedList } from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { IStateInterface } from "../../store/store";
import { TMapApiResponse } from "../../models/maps";

// city: "amsterdam"
// coordinates: { latitude: 52.3561044, longitude: 4.8525852 },
// description: "Ð¼Ð°Ð»ÐµÐ½ÑÐºÐ°Ñ ÑÐ¾ÑÐºÐ°, Ð¼Ð¾Ð¶Ð½Ð¾ ÑÐºÐ°Ð·Ð°ÑÑ to go, Ñ ÑÐ¾ÑÐ¾ÑÐ¸Ð¼ ÐºÐ¾ÑÐµ, ÐÑÑÑ 2Ð°Ñ ÑÐ¾ÑÐºÐ° Ñ ÐµÐ´Ð¾Ð¹"
// geoHash: "u173y7js3mjz"
// id: "84de1c94-421d-4426-9f7b-a895f1d5722a"
// instagram: "https://www.instagram.com/locals.coffee/"
// labels: ["specialty coffee"]
// locationURL: "https://maps.app.goo.gl/VvYSsGviDEPr8cFm8"
// name: "LOCALS"
// website: "https://www.localscoffee.nl/"

export const PLACES_LIST_MOCK: TMapApiResponse[] = [
  {
    city: "amsterdam",
    coordinates: { latitude: 52.3561044, longitude: 4.8525852 },
    description: "Bla bla bla",
    id: "1",
    instagram: "https://www.instagram.com/locals.coffee/",
    labels: ["specialty coffee"],
    locationURL: "https://maps.app.goo.gl/VvYSsGviDEPr8cFm8",
    name: "LOCALS",
    website: "https://www.localscoffee.nl/",
    photos: [
      "https://media-cdn.tripadvisor.com/media/photo-s/15/27/3b/77/caption.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/15/27/3b/77/caption.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/15/27/3b/77/caption.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/15/27/3b/77/caption.jpg",
    ],
  },
  {
    city: "amsterdam",
    coordinates: { latitude: 52.3551044, longitude: 4.8522852 },
    description: "Bla bla bla",
    id: "2",
    instagram: "https://www.instagram.com/locals.coffee/",
    labels: ["specialty coffee"],
    locationURL: "https://maps.app.goo.gl/VvYSsGviDEPr8cFm8",
    name: "Chay",
    website: "https://www.localscoffee.nl/",
    photos: [
      "https://media-cdn.tripadvisor.com/media/photo-s/15/27/3b/77/caption.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/15/27/3b/77/caption.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/15/27/3b/77/caption.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/15/27/3b/77/caption.jpg",
    ],
  },
  {
    city: "amsterdam",
    coordinates: { latitude: 52.3551041, longitude: 4.8522822 },
    description: "Bla bla bla",
    id: "3",
    instagram: "https://www.instagram.com/locals.coffee/",
    labels: ["specialty coffee"],
    locationURL: "https://maps.app.goo.gl/VvYSsGviDEPr8cFm8",
    name: "Coffee",
    website: "https://www.localscoffee.nl/",
    photos: [
      "https://media-cdn.tripadvisor.com/media/photo-s/15/27/3b/77/caption.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/15/27/3b/77/caption.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/15/27/3b/77/caption.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/15/27/3b/77/caption.jpg",
    ],
  },
];

type TPlaceList = {
  searchInProgress?: boolean
}

const PlaceList: React.FC<TPlaceList> = (props) => {

  const { searchInProgress } = props

  const places = useSelector((state: IStateInterface) => state.places.filteredPlaces);

  const renderItem = useCallback(
    ( {item}) => (
      <PlaceItem
        name={item?.name}
        address={item?.googleMapsInfo?.formattedAddress}
        photos={item?.photosUrl}
        id={item.id}
      />
    ),
    []
  );

  if (places.length === 0) {
    return (
      <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: searchInProgress && 265 }}>
        <View>
          <Text style={styles.fallback_text}>There are no places :(</Text>
        </View>
      </View >
    )
  }

  return (
    <BottomSheetVirtualizedList
      data={places}
      keyExtractor={(item, index) => "key" + index}
      getItemCount={(data) => data.length}
      getItem={(data, index) => data[index]}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 15,
    paddingBottom: 45,
  },
  fallback_text: {
    fontFamily: 'ClashDisplay-Medium',
  }
});

export default PlaceList;
