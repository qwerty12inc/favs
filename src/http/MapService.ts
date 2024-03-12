import {AxiosRequestConfig, AxiosResponse } from "axios";
import api from ".";
import { auth } from "../utils/firebase";
import { Region } from "react-native-maps";

export default class MapService {
    static async getPlaceByRegion(region : Region) :Promise<AxiosResponse> {
        const {latitude, longitude, latitudeDelta, longitudeDelta} = region
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: auth.currentUser.providerId
            },
            params: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta,
            },
        }
        return api.get('/places', config)
    }
}