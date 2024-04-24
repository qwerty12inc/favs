import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useCallback, useState } from 'react'
import { globalTokens } from '../../styles'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCategory, setSelectedFilter } from '../../store/features/PlacesSlice'
import { IStateInterface } from '../../store/store'

type TProps = {
    title: string,
    subtitle?: string,
    emoji?: string,
    active?: boolean,
    disabled?: boolean,
}

export const CategoryItem: React.FC<TProps> = (props) => {
    const {title, subtitle, active, disabled, emoji} = props;
    const dispatch = useDispatch();
    const categories = useSelector((state: IStateInterface) => state.places.categoriesList);
    const currentCategory = useSelector((state: IStateInterface) => state.places.currentCategory);

    // const [selected, setSelected] = useState(false)

    const didPressed = useCallback(()=> {
        const clickedCategory = categories.find((category) => category.name === title)
        dispatch(setCurrentCategory(clickedCategory))

    },[currentCategory])

    return (
        <Pressable onPress={!disabled ? didPressed : null}>
            <View style={[style.card, active && style.active, disabled && style.disabled]}>
                <Text>{emoji ? emoji : "🍪"}</Text>
                <View>
                    <Text style={[style.cardTitle, active && style.cardTitle_active]}>
                        {title}
                    </Text>
                    {
                        disabled &&
                        <Text style={[style.cardSubtitle, active && style.cardSubtitle_active]}>
                            Soon
                        </Text>
                    }
                    {   !disabled &&
                        <Text style={[style.cardSubtitle, active && style.cardSubtitle_active]}>
                            {(subtitle && !disabled) ? subtitle : "The most delicious places"}
                        </Text>
                    }
                </View>
            </View>
        </Pressable>
    )
}

const style = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: "row",
        height: 60,
        minWidth: 120,
        borderRadius: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: globalTokens.colors.white,
        paddingHorizontal: 15,
        gap: 12,
    },
    active: {
        backgroundColor: globalTokens.colors.black,
        paddingHorizontal: 15,
    },
    disabled: {
        opacity: .8,
        backgroundColor: globalTokens.colors.white,
    },
    textBlock: {
        display: "flex",
        flexDirection: "column"
    },
    cardTitle: {
        textTransform: "capitalize",
        fontSize: 15,
        fontWeight: "600",
        color: globalTokens.colors.black,
    },
    cardTitle_active: {
        color: globalTokens.colors.white,
    },
    cardSubtitle: {
        textTransform: "capitalize",
        fontSize: 10,
        fontWeight: "400",
        color: globalTokens.colors.black,
    },
    cardSubtitle_active: {
        color: globalTokens.colors.white,
    }
})