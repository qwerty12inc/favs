import { View, Text } from 'react-native'
import React from 'react'
import { ScrollBar } from 'react-native-ui-lib'

export default function BannerSlider({ children, ...props }) {
    return (
        <ScrollBar
            {...props}
            style={[{ marginVertical: 12 }, props.style]}
            contentContainerStyle={{ gap: 10, display: 'flex', flexDirection: "row" }}
            contentInset={{ left: 16, right: 16 }}
            contentOffset={{ x: -16, y: 0 }}
        >
            {children}
        </ScrollBar>
    )
}