import { Picker } from "react-native-ui-lib";
import { useDispatch, useSelector } from "react-redux";
import { IStateInterface } from "../store/store";
import { useEffect, useState } from "react";
import { setCurrent } from "../store/features/CitySlice";

const CityPicker: React.FC = () => {
  const cities = useSelector((state: IStateInterface) => state.cities.cities);
  const currentCity = useSelector(
    (state: IStateInterface) => state.cities.current
  );
  const dispatch = useDispatch();

  const CITY_PICKER_OPTIONS = [];

  const handleCityChange = (item) => {
    console.log(item);
    dispatch(setCurrent(item));
  };

  Object.keys(cities).forEach((city) => {
    CITY_PICKER_OPTIONS.push({ label: city, value: city });
  });

  if (CITY_PICKER_OPTIONS.length > 0)
    return (
      <Picker
        placeholder="Choose city"
        value={currentCity ? currentCity : "value"}
        defaultValue={
          CITY_PICKER_OPTIONS.length > 0 && CITY_PICKER_OPTIONS[0].value
        }
        onChange={handleCityChange}
        mode={Picker.modes.SINGLE}
        // trailingAccessory={dropdownIcon}
        fieldType="filter"
        topBarProps={{ containerStyle: { marginTop: 60 } }}
        pickerModalProps={{
          containerStyle: { margin: 60, padding: 100, height: 200 },
          animationType: "slide",
        }}
      >
        {CITY_PICKER_OPTIONS.map((option) => (
          <Picker.Item
            key={option.value}
            value={option.value}
            label={option.label}
          />
        ))}
      </Picker>
    );
};

export default CityPicker;
