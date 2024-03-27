import { Picker } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { IStateInterface } from '../store/store';
import { useEffect, useMemo, useState } from 'react';
import { setCities, setCurrent } from '../store/features/CitySlice';
import MapService from '../http/MapService';
import { setFilters } from '../store/features/PlacesSlice';

const CityPicker: React.FC = () => {
    const cities = useSelector((state: IStateInterface) => state.cities.cities);
    const currentCity = useSelector((state: IStateInterface) => state.cities.current);
    const dispatch = useDispatch();

    const handleCityChange = (item) => {
        dispatch(setCurrent(item));
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
                    dispatch(setCurrent(data[1].name))
                });
        } else {
            dispatch(setFilters(currentCity.categories[0].labels))
        }
    },[currentCity])

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
