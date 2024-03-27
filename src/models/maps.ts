import { LatLng } from "react-native-maps"

export type TMapApiResponse = {
    address: string,
    category: string,
    city: string,
    coordinates: LatLng,
    description: string,
    geoHash: string,
    googleMapsInfo: {
      delivery: true,
      formattedAddress: string,
      locationURL: string,
      openingInfo: string[],
      photoRef: string[],
      placeID: string,
      rating: number,
      reservable: true,
      website: string
    },
    id: string,
    instagram: string,
    labels: string[],
    name: string,
    website: string
}