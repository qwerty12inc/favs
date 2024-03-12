import { StyleSheet, Text, SafeAreaView, Dimensions } from "react-native";
import { Avatar, View, Picker, ModalProps } from "react-native-ui-lib";
import MapView, { Details, LatLng, Marker, MarkerPressEvent, Region } from "react-native-maps";
import React, { useEffect, useState } from "react";
// import MapService from "../http/MapService";

type TMapType = 'general' | 'detailed';

type Props = {
  initialPosition: Region;
  zoom?: number;
  markers?: any[];
  type?: TMapType
}

const MapBlock: React.FC<Props> = (props) => {

  const { initialPosition, zoom, markers, type = 'general' } = props

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

  useEffect(() => {
    setRegion((prev) => {
      return {
        ...prev,
        latitude: initialPosition.latitude,
        longitude: initialPosition.longitude,
      };
    });
  }, [props.initialPosition]);

  const handleRegionChange = (region: Region, details: Details) => {
    // MapService.getPlaceByRegion(region)
    //   .then((places) => {
    //     console.log(places)
    //   })
    //   .catch((err) => console.log(err))
    console.log(region, details)
  }

  const handleMarkerClick = (e: MarkerPressEvent) => {
    console.log(e.currentTarget)
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        region={region}
        // initialRegion={region}
        //   onPress={e => this.onMapPress(e)}
        onMarkerPress={handleMarkerClick}
        onRegionChange={handleRegionChange}
      // scrollEnabled={type === 'general'}
      // onMapReady={() => setRegion(region)}
      >
        {markers &&
          markers.map((marker: LatLng) => (
            <Marker
              key={(marker.longitude + marker.latitude).toString()}
              coordinate={marker}
            />
          ))}
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