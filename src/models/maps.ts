import { LatLng } from "react-native-maps"

export type TMapApiResponse = {
    city: string,
    coordinates: LatLng,
    description?: string,
    id: string,
    instagram?: string,
    labels?: string[],
    locationURL?: string,
    name: string,
    website?: string
}