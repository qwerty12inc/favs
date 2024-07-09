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
    website: string,
    photosUrl?: string[],
    locationURL?: string,
    openingInfo: string[],
    imagePreview?: string, // для отображения фотографий после их загрузки из firebase (не api)
}

export type TCategory = {
  labels: string[],
  name: string,
}

export type TCityApiResponse = {
  categories: TCategory[],
  center: LatLng,
  imageURL: string,
  name: string,
}