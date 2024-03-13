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
    MapService.getPlaceByRegion(
      {
        latitude: initialPosition.latitude,
        longitude: initialPosition.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      })
      .then((res) => res.data)
      .then((data) => {
        // console.log(data)
        setMapMarkers(data)
      })
      .catch((err) => {
        console.error(err)
      });
  }, [initialPosition]);

  const handleRegionChange =
    debounce((region: Region, details: Details) => {
      MapService.getPlaceByRegion(region)
        .then((res) => res.data)
        .then((data) => {
          // console.log(data)
          setMapMarkers(data)
        })
        .catch((err) => {
          console.error(err)
        });
      // console.log(region, details)
    }, 500)


  const handleMarkerClick = (event: MarkerPressEvent) => {
    console.log(event.nativeEvent.id)
    navigation.navigate('places/[id]', { id: event.nativeEvent.id });
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        region={region}
        //   onPress={e => this.onMapPress(e)}
        onMarkerPress={type === 'general' && handleMarkerClick}
        onRegionChange={type === 'general' && handleRegionChange}
        onRegionChangeComplete={() => console.log('complete')}
        scrollEnabled={type === 'general'}
        zoomEnabled={type === 'general'}
      // onMapReady={() => setRegion(region)}
      >
        {(marker && type === 'detailed') &&
          <Marker
            key={(marker?.Longitude + marker?.Latitude).toString()}
            coordinate={marker}
          />
        }
        {
          (mapMarkers.length > 0 && type === 'general') &&
          mapMarkers.map((marker) => (
            <Marker
              key={marker?.id}
              coordinate={marker?.coordinates}
              identifier={marker?.id}
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

const MOCK_POINTS = [
  {
    "ID": "dbdf7030-b361-4dd3-be12-3c121ac8cdd7",
    "Name": "Nebbia",
    "Description": "",
    "LocationURL": "https://maps.app.goo.gl/h47u74Mz9ggcjWbp6",
    "Coordinates": {
      "Latitude": 45.4448882,
      "Longitude": 9.1776552
    },
    "City": "milan",
    "Website": "",
    "Instagram": "",
    "Labels": [
      "natural wine",
      "dinner",
      "lunch"
    ],
    "GeoHash": "u0nd8bfzwv5t"
  },
  {
    "ID": "7ae7f773-f6e9-4ec3-af78-deeb381ec990",
    "Name": "Enoteca Naturale",
    "Description": "",
    "LocationURL": "https://maps.app.goo.gl/BmranbZXfZDN7Bbr5",
    "Coordinates": {
      "Latitude": 45.4535645,
      "Longitude": 9.1816985
    },
    "City": "milan",
    "Website": "",
    "Instagram": "",
    "Labels": [
      "natural wine",
      "dinner"
    ],
    "GeoHash": "u0nd8ftfjnd9"
  },
  {
    "ID": "00fc2f34-35d4-4bcc-b859-47055a078fba",
    "Name": "Hygge",
    "Description": "",
    "LocationURL": "https://maps.app.goo.gl/uTGQfgGBVfJVZ5Cq6",
    "Coordinates": {
      "Latitude": 45.4583983,
      "Longitude": 9.1766068
    },
    "City": "milan",
    "Website": "",
    "Instagram": "",
    "Labels": [
      "specialty coffee",
      "brunch",
      "lunch",
      "dinner"
    ],
    "GeoHash": "u0nd8g6nq7tu"
  },
  {
    "ID": "71e5b3ac-bcaa-49a6-95b7-88d9e7a3d125",
    "Name": "Tacito",
    "Description": "",
    "LocationURL": "https://maps.app.goo.gl/eisY4rKb6EpGTU438",
    "Coordinates": {
      "Latitude": 45.460633,
      "Longitude": 9.1765414
    },
    "City": "milan",
    "Website": "",
    "Instagram": "",
    "Labels": [
      "natural wine",
      "dinner"
    ],
    "GeoHash": "u0nd8gf5kujn"
  },
  {
    "ID": "d37a5550-2af3-46ea-b27e-ae24ee00c20c",
    "Name": "Nowhere",
    "Description": "",
    "LocationURL": "https://maps.app.goo.gl/pMo7xXRG85jxPtaL8",
    "Coordinates": {
      "Latitude": 45.4560061,
      "Longitude": 9.181708
    },
    "City": "milan",
    "Website": "",
    "Instagram": "",
    "Labels": [
      "specialty coffee"
    ],
    "GeoHash": "u0nd8gjbmm9w"
  },
  {
    "ID": "2c7bde9e-13ba-4a7b-8a05-98e6a7f967eb",
    "Name": "Insieme",
    "Description": "",
    "LocationURL": "https://maps.app.goo.gl/dpMGMfbPZZBcsZ5m8",
    "Coordinates": {
      "Latitude": 45.4678869,
      "Longitude": 9.1622625
    },
    "City": "milan",
    "Website": "",
    "Instagram": "",
    "Labels": [
      "dinner"
    ],
    "GeoHash": "u0nd8mpv8hqn"
  },
  {
    "ID": "1df90873-1a3b-4966-b2e2-fbfea2ff3af1",
    "Name": "Signor Lievito",
    "Description": "",
    "LocationURL": "https://maps.app.goo.gl/ZUNPAUJZfrGJBd777",
    "Coordinates": {
      "Latitude": 45.4563443,
      "Longitude": 9.2153779
    },
    "City": "milan",
    "Website": "",
    "Instagram": "",
    "Labels": [
      "specialty coffee"
    ],
    "GeoHash": "u0nd9en6muez"
  },
  {
    "ID": "60c39272-bf06-4be6-b2e9-1448a75cddeb",
    "Name": "Cafezal",
    "Description": "",
    "LocationURL": "https://maps.app.goo.gl/UVzFgvosEgUctMbN6",
    "Coordinates": {
      "Latitude": 45.4641645,
      "Longitude": 9.2076383
    },
    "City": "milan",
    "Website": "",
    "Instagram": "",
    "Labels": [
      "specialty coffee"
    ],
    "GeoHash": "u0nd9s2zcw89"
  },
  {
    "ID": "4a7f9f31-cc84-4b0d-8811-76bf8881b65b",
    "Name": "Nudo",
    "Description": "",
    "LocationURL": "https://maps.app.goo.gl/9hQ8MxBY1cy9D6iX9",
    "Coordinates": {
      "Latitude": 45.463114,
      "Longitude": 9.2119561
    },
    "City": "milan",
    "Website": "",
    "Instagram": "",
    "Labels": [
      "specialty coffee"
    ],
    "GeoHash": "u0nd9s7cy4sq"
  },
  {
    "ID": "3b09f913-7edf-41e1-bf36-fc02c0106297",
    "Name": "Mater",
    "Description": "",
    "LocationURL": "https://maps.app.goo.gl/i35t3C4Ei6MZAjtSA",
    "Coordinates": {
      "Latitude": 45.4654803,
      "Longitude": 9.2077764
    },
    "City": "milan",
    "Website": "",
    "Instagram": "",
    "Labels": [
      "natural wine",
      "dinner",
      "lunch"
    ],
    "GeoHash": "u0nd9s8zsezd"
  },
  {
    "ID": "c8752c04-0e25-4078-96f1-48b0d3a8edff",
    "Name": "Loste",
    "Description": "",
    "LocationURL": "https://maps.app.goo.gl/4Mpgpuxqwz8oZRNb7",
    "Coordinates": {
      "Latitude": 45.4670758,
      "Longitude": 9.2087922
    },
    "City": "milan",
    "Website": "",
    "Instagram": "",
    "Labels": [
      "specialty coffee"
    ],
    "GeoHash": "u0nd9t18umjp"
  },
  {
    "ID": "27f4c1e4-6e37-49eb-8f3d-32a689606e51",
    "Name": "Pan",
    "Description": "",
    "LocationURL": "https://maps.app.goo.gl/APYtkWdfqw1JKQbe7",
    "Coordinates": {
      "Latitude": 45.4698059,
      "Longitude": 9.2212524
    },
    "City": "milan",
    "Website": "",
    "Instagram": "",
    "Labels": [
      "specialty coffee"
    ],
    "GeoHash": "u0nd9vd8yf0j"
  },
  {
    "ID": "82cc602b-4a25-4c85-bfc4-458edc5eac13",
    "Name": "Serra di Quartiere ",
    "Description": "",
    "LocationURL": "https://maps.app.goo.gl/vAYCQQPdUHQD2SVU7",
    "Coordinates": {
      "Latitude": 45.4726281,
      "Longitude": 9.2098222
    },
    "City": "milan",
    "Website": "",
    "Instagram": "",
    "Labels": [
      "specialty coffee"
    ],
    "GeoHash": "u0nd9w43k2m0"
  },
  {
    "ID": "a05005d0-f5f7-4390-9e40-84ce562826cc",
    "Name": "Rost",
    "Description": "",
    "LocationURL": "https://maps.app.goo.gl/Yi4TNwanhVxEF5Z68",
    "Coordinates": {
      "Latitude": 45.4726281,
      "Longitude": 9.2098222
    },
    "City": "milan",
    "Website": "",
    "Instagram": "",
    "Labels": [
      "natural wine",
      "dinner",
      "lunch"
    ],
    "GeoHash": "u0nd9w43k2m0"
  },
  {
    "ID": "cea0d870-54fa-49dc-a3cd-82e4f13e9a74",
    "Name": "Bites",
    "Description": "",
    "LocationURL": "https://maps.app.goo.gl/TAYautKryZhmpwps9",
    "Coordinates": {
      "Latitude": 45.4743762,
      "Longitude": 9.2098344
    },
    "City": "milan",
    "Website": "",
    "Instagram": "",
    "Labels": [
      "natural wine",
      "dinner",
      "lunch"
    ],
    "GeoHash": "u0nd9w67kwnk"
  },
  {
    "ID": "86f1d117-5bf9-4df0-98d6-b6ebef0622d7",
    "Name": "Orsonero",
    "Description": "",
    "LocationURL": "https://maps.app.goo.gl/GQFKzaos7mcUokzv5",
    "Coordinates": {
      "Latitude": 45.4777424,
      "Longitude": 9.2112972
    },
    "City": "milan",
    "Website": "",
    "Instagram": "",
    "Labels": [
      "specialty coffee"
    ],
    "GeoHash": "u0nd9wgrnc9h"
  },
  {
    "ID": "0eb17aa7-3713-41ee-bd70-4d1ddd1b1f67",
    "Name": "Tone",
    "Description": "",
    "LocationURL": "https://maps.app.goo.gl/B6X6GgUfBLM1C3xq9",
    "Coordinates": {
      "Latitude": 45.4801984,
      "Longitude": 9.2201283
    },
    "City": "milan",
    "Website": "",
    "Instagram": "",
    "Labels": [
      "Bakery"
    ],
    "GeoHash": "u0nd9z3vke3z"
  }
]