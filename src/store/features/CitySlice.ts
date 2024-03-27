import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LatLng } from "react-native-maps";
import { TCityApiResponse } from "../../models/maps";
import { setFilters } from "./PlacesSlice";


export interface TCityMap {
  [cityName: string]: LatLng;
}

export const CITY_POSITION: TCityMap = {
  Milan: { latitude: 45.46427, longitude: 9.18951 },
  Amsterdam: { latitude: 52.37403, longitude: 4.88969 },
  // Berlin: { latitude: 52.52437, longitude: 13.41053 },
};

export interface ICityState {
  cities: TCityApiResponse[];
  // cities: string[];
  current: TCityApiResponse;
}

// categories: TCategory[],
// center: LatLng,
// imageURL: string,
// name: string,

const initialState: ICityState  = {
  cities: [
    {
      name: "Milan",
      center: {
        latitude: 45.46427,
        longitude: 9.18951
      },
      categories: [
        {
          name: '',
          labels: ['specialty coffee', 'eat', 'tea']
        }
      ],
      imageURL: '',
    }
  ],
  current: {
    name: "",
    center: {
      latitude: 45.46427,
      longitude: 9.18951
    },
    categories: [
      {
        name: '',
        labels: ['specialty coffee', 'eat', 'tea']
      }
    ],
    imageURL: '',
  }
}

export const CitySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<TCityApiResponse['name']>) => {
      // console.log(action);
      state.current = state.cities.find((city) => city.name === action.payload)
    },
    setCities: (state, action: PayloadAction<TCityApiResponse[]>) => {
      state.cities = action.payload;
    },
  //   setCurrentPlace: ( state, action: PayloadAction<TMapApiResponse['id']> ) => {
  //     state.currentPlace = state.places.find((place) => place.id === action.payload)
  // },
  },
});

export const { setCurrent, setCities } = CitySlice.actions;

export default CitySlice.reducer;
