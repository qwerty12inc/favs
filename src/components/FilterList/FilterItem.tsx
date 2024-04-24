import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useCallback, useState } from 'react'
import { globalTokens } from '../../styles'
import { useDispatch } from 'react-redux'
import { setSelectedFilter } from '../../store/features/PlacesSlice'

type TProps = {
    title: string,
    active?: boolean
}

export const FilterItem: React.FC<TProps> = (props) => {
    const {title, active} = props;
    const dispatch = useDispatch();

    // const [selected, setSelected] = useState(false)

    const didPressed = useCallback(()=> {
        dispatch(setSelectedFilter(title))

    },[])

    return (
        <Pressable onPress={didPressed}>
            <View style={[style.card, active && style.active]}>
                <Text style={[style.cardText, active && style.cardText_active]}>
                    {title}
                </Text>
            </View>
        </Pressable>
    )
}

const style = StyleSheet.create({
    card: {
        display: 'flex',
        height: 36,
        borderRadius: 36,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: globalTokens.colors.white,
        paddingHorizontal: 15,
    },
    active: {
        backgroundColor: globalTokens.colors.black,
        paddingHorizontal: 15,
    },
    cardText: {
        fontSize: 15,
        color: globalTokens.colors.black,
        textTransform: "capitalize",
    },
    cardText_active: {
        fontSize: 15,
        color: globalTokens.colors.white,
    }
})