import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LatLng } from "react-native-maps";

type TCoordinates = { latitude: number; longitude: number };

export interface TCityMap {
  [cityName: string]: LatLng;
}

export const CITY_POSITION: TCityMap = {
  Milan: { latitude: 45.46427, longitude: 9.18951 },
  Amsterdam: { latitude: 52.37403, longitude: 4.88969 },
  // Berlin: { latitude: 52.52437, longitude: 13.41053 },
};

export interface ICityState {
  cities: TCityMap;
  // cities: string[];
  current: string;
}

const initialState  = {
  cities: CITY_POSITION,
  current: "Milan",
};

export const CitySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      // console.log(action);
      state.current = action.payload;
    },
    setCities: (state, action: PayloadAction<TCityMap>) => {
      state.cities = action.payload;
    },
  },
});

export const { setCurrent, setCities } = CitySlice.actions;

export default CitySlice.reducer;
