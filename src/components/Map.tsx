import { StyleSheet, Text, SafeAreaView, Dimensions } from "react-native";
import { Avatar, View, Picker, ModalProps, Image } from "react-native-ui-lib";
import MapView, { Details, LatLng, Marker, MarkerPressEvent, Region } from "react-native-maps";
import React, { useEffect, useState } from "react";
import MapService from "../http/MapService";
import { TMapApiResponse } from "../models/maps";
import { useNavigation } from "expo-router";
import { debounce } from 'lodash';
import { useDispatch, useSelector } from "react-redux";
import { resetPlaces, setPlaces } from "../store/features/PlacesSlice";
import { IStateInterface } from "../store/store";
import { PLACES_LIST_MOCK } from "./PlacesList/PlaceList";
const placeIcon = require('../../assets/icons/coffee.png');


type TMapType = 'general' | 'detailed';

type Props = {
  initialPosition: LatLng;
  zoom?: number;
  marker?: any;
  type?: TMapType
}

const MapBlock: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const places = useSelector((state: IStateInterface) => state.places.places);
  const currentCity = useSelector((state: IStateInterface) => state.cities.current);

  const { initialPosition, zoom, marker, type = 'general' } = props

  const { width, height } = Dimensions.get("window");

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = zoom ? zoom : 0.12;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [region, setRegion] = useState<Region>({
    latitude: initialPosition.latitude,
    longitude: initialPosition.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  // const [mapMarkers, setMapMarkers] = useState<TMapApiResponse[]>([])

  useEffect(() => {
    setRegion((prev) => {
      return {
        ...prev,
        latitude: initialPosition.latitude,
        longitude: initialPosition.longitude,
      };
    });
    // dispatch(setPlaces(PLACES_LIST_MOCK))
    MapService.getPlacesByCity(currentCity)
      .then((res) => res.data)
      .then((data) => {
        // console.log(data)
        // setMapMarkers(data)
        dispatch(setPlaces(data))
      })
      .catch((err) => {
        if (err.response.status === '404') {
          dispatch(resetPlaces())
        }
        console.log('err: ', err);
        console.log('err code: ', err.response.status);
      });
  }, [initialPosition]);

  // const handleRegionChange =
  //   debounce((region: Region, details: Details) => {
  //     MapService.getPlaceByRegion(region)
  //       .then((res) => res.data)
  //       .then((data) => {
  //         // console.log(data)
  //         setMapMarkers(data)
  //       })
  //       .catch((err) => {
  //         if (err.response.status === 404) {
  //           console.log('404!');
  //           dispatch(resetPlaces())
  //         }
  //         console.log('err: ', err);
  //         console.log('err code: ', err.response.status);
  //       });
  //     // console.log(region, details)
  //   }, 500)


  const handleMarkerClick = (event: MarkerPressEvent) => {
    console.log(event.nativeEvent.id)
    //@ts-ignore
    navigation.navigate('places/[id]', { id: event.nativeEvent.id });
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        region={region}
        //   onPress={e => this.onMapPress(e)}
        onMarkerPress={type === 'general' && handleMarkerClick}
        // onRegionChange={type === 'general' && handleRegionChange}
        // onRegionChangeComplete={() => console.log('complete')}
        scrollEnabled={type === 'general'}
        zoomEnabled={type === 'general'}
      // onMapReady={() => setRegion(region)}
      >
        {(marker && type === 'detailed') &&
          <Marker
            key={(marker?.Longitude + marker?.Latitude).toString()}
            coordinate={marker}
          >
            <Image style={styles.marker} source={placeIcon} />
          </Marker>
        }
        {
          (places.length > 0 && type === 'general') &&
          places.map((marker) => (
            <Marker
              key={marker?.id}
              coordinate={marker?.coordinates}
              identifier={marker?.id}
              onPress={handleMarkerClick}
            >
              <Image style={styles.marker} source={placeIcon} />
            </Marker>
          ))
        }
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    //   width: "100%",
    //   height: "100%",
    //   justifyContent: 'flex-end',
    //   alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    width: 25,
    height: 30
  }
});


export default MapBlock