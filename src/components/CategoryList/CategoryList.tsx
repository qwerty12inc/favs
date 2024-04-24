import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IStateInterface } from '../../store/store'
import { Chip, ScrollBar } from 'react-native-ui-lib'
import CustomScrollBar from '../CustomScrollBar/CustomScrollBar'
import { resetCategoriesList, resetCurrentCategory, setCategoriesList, setCurrentCategory } from '../../store/features/PlacesSlice'
import { CategoryItem } from './CategoryItem'

export default function CategoryList() {

    const categories = useSelector((state: IStateInterface) => state.places.categoriesList);
    const currentCategory = useSelector((state: IStateInterface) => state.places.currentCategory);

    const currentCity = useSelector((state: IStateInterface) => state.cities.currentCity);

    const dispatch = useDispatch();

    const didFilterClicked = (e) => {
      console.log(e)
    }

    useEffect(() => {
      if (currentCity.categories) {
        dispatch(setCategoriesList(currentCity?.categories))
        dispatch(setCurrentCategory(currentCity?.categories[0]))
      }
      return () => {
        dispatch(resetCategoriesList())
        dispatch(resetCurrentCategory())
      }
    }, [currentCity])

  return (
    <CustomScrollBar focusIndex={4}>
       {
            categories?.map((item) => (
              <CategoryItem
                title={item.name}
                active={item === currentCategory}
                key={item.name}
              />
            ))
        }
        {
            categories && currentCity.name.toLowerCase() === 'milan' &&
            <CategoryItem
              title='Milan Fashion Week'
              emoji='🕶️'
              disabled
            />
        }
    </CustomScrollBar>
  )
}