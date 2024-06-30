import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IStateInterface } from '../../store/store'
import { Chip, ScrollBar } from 'react-native-ui-lib'
import CustomScrollBar from '../CustomScrollBar/CustomScrollBar'
import { FilterItem } from './FilterItem'
import { resetFilters, resetSelectedFilter, setFilters, setSelectedFilter } from '../../store/features/PlacesSlice'

export default function FilterList() {

    const filters = useSelector((state: IStateInterface) => state.places.filterList);
    const currentFilter = useSelector((state: IStateInterface) => state.places.currentFilter);
    const currentCity = useSelector((state: IStateInterface) => state.cities.currentCity);
    const currentCategory = useSelector((state: IStateInterface) => state.places.currentCategory);

    const dispatch = useDispatch();

    const [index, setIndex] = useState(filters.indexOf(currentFilter))

    useEffect(() => {
      if (currentCategory?.labels) {
        dispatch(setFilters(currentCategory?.labels))
        dispatch(setSelectedFilter('all'))
      }

      return () => {
        dispatch(resetFilters())
        dispatch(resetSelectedFilter())
      }
    }, [currentCategory?.labels])

    useEffect(() => {
      setIndex((prev) => {
        if (prev <= filters.indexOf(currentFilter)) {
          return filters.indexOf(currentFilter) + 1
        } else {
          return filters.indexOf(currentFilter) - 1
        }
      })
    }, [filters.indexOf(currentFilter)])

  return (
    <CustomScrollBar focusIndex={index}>
        {
            currentFilter && filters?.map((item) => (
              <FilterItem
                title={item}
                active={item === currentFilter}
                key={item}
              />
            ))
        }
    </CustomScrollBar>
  )
}