import { View, Text, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import PlaceItem from "./PlaceItem";
import { BottomSheetVirtualizedList } from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { IStateInterface } from "../../store/store";
import { TMapApiResponse } from "../../models/maps";

// city: "amsterdam"
// coordinates: {latitude: 52.3561044, longitude: 4.8525852}
// description: "Ð¼Ð°Ð»ÐµÐ½ÑÐºÐ°Ñ ÑÐ¾ÑÐºÐ°, Ð¼Ð¾Ð¶Ð½Ð¾ ÑÐºÐ°Ð·Ð°ÑÑ to go, Ñ ÑÐ¾ÑÐ¾ÑÐ¸Ð¼ ÐºÐ¾ÑÐµ, ÐÑÑÑ 2Ð°Ñ ÑÐ¾ÑÐºÐ° Ñ ÐµÐ´Ð¾Ð¹"
// geoHash: "u173y7js3mjz"
// id: "84de1c94-421d-4426-9f7b-a895f1d5722a"
// instagram: "https://www.instagram.com/locals.coffee/"
// labels: ["specialty coffee"]
// locationURL: "https://maps.app.goo.gl/VvYSsGviDEPr8cFm8"
// name: "LOCALS"
// website: "https://www.localscoffee.nl/"

export const PLACES_LIST_MOCK = [
  {
    id: 1,
    name: "Cofegeo fav",
    address: "Lisboa, Lenina st.",
    photos: [
      "https://media-cdn.tripadvisor.com/media/photo-s/15/27/3b/77/caption.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/15/27/3b/77/caption.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/15/27/3b/77/caption.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/15/27/3b/77/caption.jpg",
    ],
  },
  {
    id: 2,
    name: "krusty krabs",
    address: "Bikini Bottom, Krusty st.",
    photos: [
      "https://img.buzzfeed.com/buzzfeed-static/static/2021-05/19/15/tmp/0f864cf5b6af/tmp-name-2-7375-1621438014-0_dblbig.jpg",
      "https://i.pinimg.com/originals/33/e9/31/33e9318abad9a87418c3eace3effae30.jpg",
      "https://img.buzzfeed.com/buzzfeed-static/static/2021-05/19/15/tmp/0f864cf5b6af/tmp-name-2-7375-1621438014-0_dblbig.jpg",
      "https://i.pinimg.com/originals/33/e9/31/33e9318abad9a87418c3eace3effae30.jpg",
    ],
  },
  {
    id: 3,
    name: "Mc Shnakneks",
    address: "Lisboa, Krusty st.",
    photos: [
      "https://resizer.mail.ru/p/01f47cba-e424-5770-b15a-2c30d0b1ea38/AQAK9XH6hV4osDdCKneR5ZGOmGwMHi20h49w6AVCT_cuXsLg4oBPtumE-lzNkOrrtahmJQROtAMixtXf7PytXhtPzpQ.jpg",
      "https://ss.metronews.ru/userfiles/materials/179/1791624/858x540_c29f4c8e.jpg",
      "https://resizer.mail.ru/p/01f47cba-e424-5770-b15a-2c30d0b1ea38/AQAK9XH6hV4osDdCKneR5ZGOmGwMHi20h49w6AVCT_cuXsLg4oBPtumE-lzNkOrrtahmJQROtAMixtXf7PytXhtPzpQ.jpg",
      "https://i.pinimg.com/originals/33/e9/31/33e9318abad9a87418c3eace3effae30.jpg",
    ],
  },
];

const PlaceList = () => {

  const places = useSelector((state: IStateInterface) => state.places.places);

  const renderItem = useCallback(
    ({ item }) => (
      <PlaceItem
        name={item.name}
        address={item.name}
        photos={item.photos}
        id={item.id}
      />
    ),
    []
  );

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
});

export default PlaceList;
