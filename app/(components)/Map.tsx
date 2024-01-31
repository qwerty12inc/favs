import {StyleSheet, Text, SafeAreaView, Dimensions } from 'react-native';
import {Avatar, View, Picker, ModalProps} from "react-native-ui-lib"
import MapView, {Marker, Region} from 'react-native-maps';
import React, { useEffect, useState } from 'react';


type TPosition = {
    latitude: number,
    longitude: number,
    latitudeDelta?: number,
    longitudeDelta?: number,
  }

export default function MapBlock (props: {initialPosition: TPosition, zoom?: number, markers?: any[]}) {
    const {width, height} = Dimensions.get('window');

    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = (props.zoom) ? props.zoom : 0.12;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const [region, setRegion] = useState<Region>({
        latitude: props.initialPosition.latitude,
        longitude: props.initialPosition.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    })

    useEffect(() => {
        console.log("Изменился город")
        console.log('Данные для карты:',props.initialPosition)
        console.log('lon:',props.initialPosition.longitude)
        console.log('lat:',props.initialPosition.latitude)
        //@ts-ignore
        setRegion(prev => {
            return {
                ...prev,
                latitude: props.initialPosition.latitude,
                longitude:  props.initialPosition.longitude
            }
        })
    }, [props.initialPosition])


    return (
    <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={region}
        //   initialRegion={region}
        //   onPress={e => this.onMapPress(e)} 
        >
            {
                (props.markers) && props.markers.map((marker: TPosition) => (
            <Marker
              key={(marker.longitude+marker.latitude).toString()}
              coordinate={marker}
            />
          ))}
        </MapView>
      </View>
    )
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
    }
})