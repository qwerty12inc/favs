import { StyleSheet, Text, SafeAreaView, Dimensions } from "react-native";
import { Avatar, View, Picker, ModalProps } from "react-native-ui-lib";
import MapView, { Details, LatLng, Marker, MarkerPressEvent, Region } from "react-native-maps";
import React, { useEffect, useState } from "react";
import MapService from "../http/MapService";
import { TMapApiResponse } from "../models/maps";
import { useNavigation } from "expo-router";
import { debounce } from 'lodash';

type TMapType = 'general' | 'detailed';

type Props = {
  initialPosition: LatLng;
  zoom?: number;
  marker?: any;
  type?: TMapType
}

const MapBlock: React.FC<Props> = (props) => {
  const navigation = useNavigation();

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

  const [mapMarkers, setMapMarkers] = useState<TMapApiResponse[]>([])

  useEffect(() => {
    setRegion((prev) => {
      return {
        ...prev,
        latitude: initialPosition.latitude,
        longitude: initialPosition.longitude,
      };
    });
    MapService.getAllPlaces()
      .then((res) => res.data)
      .then((data) => setMapMarkers(data))
  }, [props.initialPosition]);

  const handleRegionChange =
    debounce((region: Region, details: Details) => {
      MapService.getPlaceByRegion(region)
        .then((res) => res.data)
        .then((data) => {
          console.log(data)
          setMapMarkers(data)
        })
        .catch((err) => {
          console.error(err)
        });
      console.log(region, details)
    }, 500)


  const handleMarkerClick = (e: MarkerPressEvent) => {
    console.log(e.currentTarget)
    navigation.navigate('places/[id]', { id: e.currentTarget });
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        region={region}
        // initialRegion={region}
        //   onPress={e => this.onMapPress(e)}
        onMarkerPress={type === 'general' && handleMarkerClick}
      // onRegionChange={type === 'general' && handleRegionChange}
      // scrollEnabled={type === 'general'}
      // onMapReady={() => setRegion(region)}
      >
        {(marker && type === 'detailed') &&
          <Marker
            key={(marker.longitude + marker.latitude).toString()}
            coordinate={marker}
          />
        }
        {
          (mapMarkers && type === 'general') &&
          mapMarkers.map((marker) => (
            <Marker
              key={(marker.coordinates.latitude + marker.coordinates.longitude).toString()}
              coordinate={marker.coordinates}
              identifier={marker.id}
              onPress={handleMarkerClick}
            />
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
});


export default MapBlock