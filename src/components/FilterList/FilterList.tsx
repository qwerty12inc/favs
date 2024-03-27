import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { IStateInterface } from '../../store/store'
import { Chip, ScrollBar } from 'react-native-ui-lib'
import CustomScrollBar from '../CustomScrollBar/CustomScrollBar'

export default function FilterList() {

    const filters = useSelector((state: IStateInterface) => state.places.filterList)
    const selectedFilter = useSelector((state: IStateInterface) => state.places)
  return (
    <CustomScrollBar>
        {
            filters?.map((chip) => (
                <Chip
                  key={chip}
                  label={chip}
                //   style={{backgroundColor: ""}}
                containerStyle={{backgroundColor: '#fff', borderColor: '#f1f1f1'}}
                />
              ))
        }
    </CustomScrollBar>
  )
}