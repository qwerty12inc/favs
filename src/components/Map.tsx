import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { Marker, MarkerPressEvent, Region } from "react-native-maps";
import React, { useCallback, useEffect, useState } from "react";
import MapService from "../http/MapService";
import { useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { resetPlaces, setCurrentPlace, setPlaces } from "../store/features/PlacesSlice";
import { IStateInterface } from "../store/store";
import { Image } from "react-native-ui-lib";
const placeIcon = require('../../assets/icons/coffee.png');

type TMapType = 'general' | 'detailed';

type Props = {
  initialPosition?: { latitude: number; longitude: number };
  zoom?: number;
  marker?: { latitude: number; longitude: number };
  type?: TMapType
};

const MapBlock: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const places = useSelector((state: IStateInterface) => state.places.places);
  const currentCity = useSelector((state: IStateInterface) => state.cities.currentCity);

  const { zoom, marker, type = 'general' } = props;

  const { width, height } = Dimensions.get("window");

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = zoom ? zoom : 0.12;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [region, setRegion] = useState<Region>({
    latitude: currentCity?.center?.latitude || 0,
    longitude: currentCity?.center?.longitude || 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [loading, setLoading] = useState(false);
  const currentFilter = useSelector((state: IStateInterface) => state.places.currentFilter);
  const currentCategory = useSelector((state: IStateInterface) => state.places.currentCategory);

  useEffect(() => {
    setRegion((prev) => ({
      ...prev,
      latitude: currentCity?.center?.latitude || 0,
      longitude: currentCity?.center?.longitude || 0,
    }));

    if (type === 'general' && currentCity?.name && currentCategory?.name && currentFilter) {
      setLoading(true);
      MapService.getPlacesByCity(currentCity.name, currentCategory, currentFilter === 'all' ? null : currentFilter)
        .then((res) => res.data)
        .then((data) => {
          dispatch(setPlaces(data));
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            dispatch(resetPlaces());
          }
          console.error('Error fetching places:', err);
        })
        .finally(() => setLoading(false));
    }
  }, [currentCategory, currentFilter, currentCity, type]);

  const handleMarkerClick = useCallback((event: MarkerPressEvent) => {
    const placeId = event.nativeEvent.id;
    if (placeId) {
      dispatch(setCurrentPlace(placeId));
      //@ts-ignore
      navigation.navigate('places/[id]', { id: placeId });
    }
  }, [dispatch, navigation]);

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        region={region}
        showsMyLocationButton={true}
        showsCompass={true}
        onMarkerPress={type === 'general' ? handleMarkerClick : undefined}
        mapPadding={{ top: 15, right: 15, bottom: 25, left: 15 }}
        onMapReady={() => setRegion(region)}
      >
        {(marker && type === 'detailed') && (
          <Marker
            key={(marker.longitude + marker.latitude).toString()}
            coordinate={marker}
          >
            <Image style={styles.marker} source={placeIcon} />
          </Marker>
        )}
        {places.length > 0 && type === 'general' && places.map((place) => (
          <Marker
            key={place.id}
            coordinate={place.coordinates}
            identifier={place.id}
            onPress={handleMarkerClick}
          >
            <Image style={styles.marker} source={placeIcon} />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
    marker: {
    width: 25,
    height: 30
  }
});

export default MapBlock;


// {"address": "Carrer de Sabino Arana, 6, 08028 Barcelona, Spain",
//    "category": "food",
//    "city": "barcelona",
//   "coordinates": {"latitude": 41.3856179, "longitude": 2.1263733}, 
//   "description": "", 
//   "geoHash": "sp3e2qh2sn6f", 
//   "googleMapsInfo": {
//     "delivery": false, 
//     "formattedAddress": "", 
//     "locationURL": "", 
//     "openingInfo": ["Monday: 07:30-17:00", "Tuesday: 07:30-17:00", "Wednesday: 07:30-17:00", "Thursday: 07:30-17:00", "Friday: 07:30-16:00", "Saturday: Closed", "Sunday: Closed"], 
//     "photoRef": ["https://storage.googleapis.com/favs-85f44.appspot.com/places/barcelona/06b65566-ca6d-4256-9a32-50ab1cbc37ba/1.jpg?Expires=1720545661&GoogleAccessId=firebase-adminsdk-gu2tz%40favs-85f44.iam.gserviceaccount.com&Signature=UzoCj8gLf8uXRcubtBgwjZs6STBUldcvBv3%2Fdho%2FI5B5zfBsy0M1REsHdpoq7vqtN4QsWRmfBYDM%2FneexAGZiiAOqSzbFo70gA2pd%2FluH6gQ0t8ht7AV8rhEnB6ZtzfWShKAtsbfNNy8FiDRgyAVFpCZ4mjBrZar%2FH6%2B3eWkvmsrnT4VW5JN2CvWp3BW%2B%2FLjyNwJKnDQUmbaxmO2ogJfglyylBZxhlgio0h3stjAP%2FQm8KPEEKdb8hrNHawQ%2FnWQ3hkdJaYozGlfHc%2B1yUZ1uMM%2FJH8WLyJKE2x5I27SbHgWvdaDsFlwL0JF3I6Fs9pKmGOx4kbHHSTZ7JP%2Bpk2JPA%3D%3D"], 
//     "placeID": "", 
//     "rating": 0, 
//     "reservable": false, 
//     "website": ""
//   }, 
//   "id": "06b65566-ca6d-4256-9a32-50ab1cbc37ba", 
//   "imagePreview": "https://storage.googleapis.com/favs-85f44.appspot.com/places/barcelona/06b65566-ca6d-4256-9a32-50ab1cbc37ba/1.jpg?Expires=1720545661&GoogleAccessId=firebase-adminsdk-gu2tz%40favs-85f44.iam.gserviceaccount.com&Signature=UzoCj8gLf8uXRcubtBgwjZs6STBUldcvBv3%2Fdho%2FI5B5zfBsy0M1REsHdpoq7vqtN4QsWRmfBYDM%2FneexAGZiiAOqSzbFo70gA2pd%2FluH6gQ0t8ht7AV8rhEnB6ZtzfWShKAtsbfNNy8FiDRgyAVFpCZ4mjBrZar%2FH6%2B3eWkvmsrnT4VW5JN2CvWp3BW%2B%2FLjyNwJKnDQUmbaxmO2ogJfglyylBZxhlgio0h3stjAP%2FQm8KPEEKdb8hrNHawQ%2FnWQ3hkdJaYozGlfHc%2B1yUZ1uMM%2FJH8WLyJKE2x5I27SbHgWvdaDsFlwL0JF3I6Fs9pKmGOx4kbHHSTZ7JP%2Bpk2JPA%3D%3D", 
//   "instagram": "", 
//   "isOpen": false, 
//   "labels": null, 
//   "links": ["http://www.cupsandcoffeebcn.com/", "https://www.facebook.com/cupsandcoffeebcn", "https://www.instagram.com/cupsandcoffeebcn/"], 
//   "locationURL": "", 
//   "name": "Cups & Coffee", 
//   "openingInfo": ["Monday: 07:30-17:00", "Tuesday: 07:30-17:00", "Wednesday: 07:30-17:00", "Thursday: 07:30-17:00", "Friday: 07:30-16:00", "Saturday: Closed", "Sunday: Closed"], 
//   "services": null,
//   "serving": null,
//   "website": ""
// }