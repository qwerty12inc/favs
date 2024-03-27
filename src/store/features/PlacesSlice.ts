import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TMapApiResponse } from '../../models/maps';

export interface IPlaceState {
    places: TMapApiResponse[],
    placesAmount: number,
    filteredPlaces: TMapApiResponse[],
    filteredPlacesAmount: number,
}

const initialState: IPlaceState = {
  places: [],
  placesAmount: 0,
  filteredPlaces: [],
  filteredPlacesAmount: 0,
};

export const PlacesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        setPlaces: (state, action: PayloadAction<TMapApiResponse[]>) => {
            state.places = action.payload;
            state.placesAmount = action.payload.length;
            state.filteredPlaces = action.payload;
            state.filteredPlacesAmount = action.payload.length;
        },
        patchPlaces: (state, action: PayloadAction<TMapApiResponse>) => {
            state.places = state.places.map((place) => {
                if (place.id === action.payload.id) {
                    return {
                        ...place,
                        ...action.payload
                    }
                }
                return place
            })
            state.filteredPlaces = state.filteredPlaces.map((place) => {
                if (place.id === action.payload.id) {
                    return {
                        ...place,
                        ...action.payload
                    }
                }
                return place
            })
        },
        resetPlaces: (state) => {
            state.places = [];
            state.placesAmount = 0;
            state.filteredPlaces = [];
            state.filteredPlacesAmount = 0
        },
        setFilterPlaces: (state, action: PayloadAction<string>) => {
            if (action.payload.length === 0) {
                state.filteredPlaces = state.places
                state.filteredPlacesAmount = state.placesAmount
            } else {
                state.filteredPlaces = state.places.filter((place) => place.name.toUpperCase().includes(action.payload.toUpperCase()))
                state.filteredPlacesAmount = state.places.filter((place) => place.name.toUpperCase().includes(action.payload.toUpperCase())).length
            }
        }
    },
});

export const { setPlaces, resetPlaces, setFilterPlaces, patchPlaces } = PlacesSlice.actions;

export default PlacesSlice.reducer;
