import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TCategory, TMapApiResponse } from '../../models/maps';

export interface IPlaceState {
    filterList: string[],
    currentFilter: string | null,

    places: TMapApiResponse[],
    placesAmount: number,

    filteredPlaces: TMapApiResponse[],
    filteredPlacesAmount: number,
    currentPlace: TMapApiResponse | null,

    categoriesList: TCategory[],
    currentCategory: TCategory | null,
}

const initialState: IPlaceState = {
    filterList: [],
    currentFilter: null,
    places: [],
    placesAmount: 0,
    filteredPlaces: [],
    filteredPlacesAmount: 0,
    currentPlace: null,

    categoriesList: [],
    currentCategory: null
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
        },
        setCurrentPlace: ( state, action: PayloadAction<TMapApiResponse['id']> ) => {
            state.currentPlace = state.places.find((place) => place.id === action.payload)
        },
        resetCurrentPlace: ( state ) => {
            state.currentPlace = null
        },
        setFilters: ( state, action: PayloadAction<TMapApiResponse['labels']> ) => {
            state.filterList = ['all'].concat(action.payload)
        },
        resetFilters: ( state ) => {
            state.filterList = []
        },
        setSelectedFilter: ( state, action: PayloadAction<string> ) => {
            state.currentFilter = action.payload
        },
        resetSelectedFilter: ( state ) => {
            state.currentFilter = null
        },
        setCategoriesList: ( state, action: PayloadAction<TCategory[]> ) => {
            state.categoriesList = action.payload
        },
        resetCategoriesList: ( state ) => {
            state.categoriesList = null
        },
        setCurrentCategory: ( state, action: PayloadAction<TCategory> ) => {
            state.currentCategory = action.payload
        },
        resetCurrentCategory: ( state ) => {
            state.currentCategory = null
        },
    },
});

export const {  setPlaces, resetPlaces, setFilterPlaces, patchPlaces,
                setCurrentPlace, resetCurrentPlace, setFilters, resetFilters,
                setSelectedFilter, resetSelectedFilter, setCategoriesList,
                setCurrentCategory, resetCurrentCategory, resetCategoriesList } = PlacesSlice.actions;

export default PlacesSlice.reducer;
