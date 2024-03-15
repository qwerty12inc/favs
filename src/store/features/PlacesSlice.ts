import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TMapApiResponse } from '../../models/maps';

export interface IPlaceState {
    places: TMapApiResponse[];
    placesAmount: number,
}

const initialState: IPlaceState = {
  places: [],
  placesAmount: 0
};

export const PlacesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        setPlaces: (state, action: PayloadAction<TMapApiResponse[]>) => {
            state.places = action.payload;
            state.placesAmount = action.payload.length
        },
        resetPlaces: (state) => {
            state.places = [];
            state.placesAmount = 0
        },
    },
});

export const { setPlaces, resetPlaces } = PlacesSlice.actions;

export default PlacesSlice.reducer;
