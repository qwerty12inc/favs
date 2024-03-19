import { View, Text } from 'react-native'
import React from 'react'
import { globalTokens } from '../../styles'

type TProps = {
    height: number,
    width: number
}

const Skeleton: React.FC<TProps | any> = (props, { ...otherProps }) => {
    const { height, width } = props;
    return (
        <View {...otherProps} style={[{ height: height, width: width, backgroundColor: globalTokens.colors.lightGrey, borderRadius: 4, opacity: 0.5 }, otherProps.style]} >
        </View>
    )
}

export default Skeleton