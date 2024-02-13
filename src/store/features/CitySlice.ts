import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TCoordinates = { latitude: number; longitude: number };

export interface TCityMap {
  [cityName: string]: TCoordinates;
}

export const CITY_POSITION: TCityMap = {
  Moscow: { latitude: 55.7522, longitude: 37.6156 },
  Milan: { latitude: 45.46427, longitude: 9.18951 },
  Amsterdam: { latitude: 52.37403, longitude: 4.88969 },
  Berlin: { latitude: 52.52437, longitude: 13.41053 },
};

export interface ICityState {
  cities: TCityMap;
  current: string;
}

const initialState: ICityState = {
  cities: CITY_POSITION,
  current: "Berlin",
};

export const CitySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      console.log(action);
      state.current = action.payload;
    },
  },
});

export const { setCurrent } = CitySlice.actions;

export default CitySlice.reducer;
