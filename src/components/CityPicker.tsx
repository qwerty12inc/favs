import { Picker } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { IStateInterface } from '../store/store';
import { useEffect, useMemo, useState } from 'react';
import { setCities, setCurrentCity } from '../store/features/CitySlice';
import MapService from '../http/MapService';
import { resetCategoriesList, resetCurrentCategory, resetFilters, resetPlaces, resetSelectedFilter, setCategoriesList, setFilters, setPlaces } from '../store/features/PlacesSlice';

const CityPicker: React.FC = () => {
    const cities = useSelector((state: IStateInterface) => state.cities.cities);
    const currentCity = useSelector((state: IStateInterface) => state.cities.currentCity);
    const dispatch = useDispatch();

    const handleCityChange = (item) => {
        // dispatch(resetFilters());
        // dispatch(resetSelectedFilter());
        // dispatch(resetCategoriesList());
        // dispatch(resetCurrentCategory());
        dispatch(setCurrentCity(item));
    };

    const CITY_PICKER_OPTIONS = cities.map((city) => {
        return ({ label: city.name, value: city.name });
    });

    const value = useMemo(() => {
        return currentCity.name
    }, [currentCity])

    useEffect(()=>{
        if (cities.length <= 1) {
            MapService.getAvalibleCities()
                .then((res) => res.data)
                .then((data) => {
                    dispatch(setCities(data))
                    dispatch(setCurrentCity(data[1].name))
                    // dispatch(setCategoriesList(data[]))
                });
        } else {
            MapService.getPlacesByCity(currentCity?.name, currentCity.categories[0].name, null)
                .then((res) => res.data)
                .then((data) => {

                    // setMapMarkers(data)
                    dispatch(setPlaces(data))
                })
                .catch((err) => {
                    if (err.response.status === '404') {
                        dispatch(resetPlaces())
                    }
                    console.error('err code: ', err.response.status);
                })
                // .finally(() => setLoading(false));
        }
    },[])

    if (CITY_PICKER_OPTIONS.length > 0)
        return (
            <Picker
                placeholder={value}
                value={currentCity.name}
                defaultValue={CITY_PICKER_OPTIONS.length > 0 && CITY_PICKER_OPTIONS[0].value}
                onChange={handleCityChange}
                mode={Picker.modes.SINGLE}
                fieldType="filter"
                style={{
                    fontSize: 24,
                    fontWeight: '600',
                    fontFamily: 'ClashDisplay-Medium',
                }}
            >
                {CITY_PICKER_OPTIONS.map((option) => (
                    <Picker.Item key={option.value} value={option.value} label={option.label} />
                ))}
            </Picker>
        );
};

export default CityPicker;
