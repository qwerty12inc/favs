import { View, StyleSheet, ImageSourcePropType, Pressable, Linking } from 'react-native'
import { Text, Image } from 'react-native-ui-lib';

import React, { useCallback } from 'react'
import { globalTokens } from '../../styles'
import { useNavigation } from 'expo-router';

type TBannerSize = 'large' | 'small'

type TBanner = {
    title: string,
    description?: string,
    link: string,
    backgroundImage?: ImageSourcePropType
    backgroundColor?: string
    darkBackground?: boolean
    size?: TBannerSize
}

const Banner: React.FC<TBanner> = (props) => {
    const { title, description, link, backgroundImage, backgroundColor, darkBackground, size = "small" } = props
    navigator = useNavigation();

    const handleClick = useCallback(() => {
        Linking.openURL(link);
    }, []);

    return (
        <Pressable onPress={handleClick}>
            <View style={[styles.block, (size === 'large') && styles.block__large, { backgroundColor: backgroundColor || globalTokens.colors.white }]}>
                <View style={styles.text__container}>
                    <Text style={[styles.subscription__title, darkBackground && styles.subscription__title_dark]}>{title}</Text>
                    <Text style={[styles.subscription__description, darkBackground && styles.subscription__description_dark]}>{description}</Text>
                </View>
                {
                    backgroundImage &&
                    <View style={styles.image__container}>
                        <Image source={backgroundImage} style={styles.image} />
                    </View>
                }
            </View>
        </Pressable>
    )
}

export default Banner;

const styles = StyleSheet.create({
    block: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 12,
        overflow: 'hidden',
        justifyContent: 'space-between',
        maxHeight: 70,
        width: 160,
        padding: 16,
        borderWidth: 1,
        flex: 1,
    },
    block__large: {
        maxHeight: 120,
        width: 185,
    },
    text__container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 4,
    },
    subscription__title: {
        fontSize: 14,
        fontWeight: '600',
        color: globalTokens.colors.black,
        fontFamily: 'ClashDisplay-Medium',
    },
    subscription__title_dark: {
        color: globalTokens.colors.white,
    },
    subscription__description: {
        fontSize: 12,
        color: globalTokens.colors.darkGrey,
        fontFamily: 'Archivo-Medium',
    },
    subscription__description_dark: {
        color: globalTokens.colors.grey,
    },
    image__container: {
        position: 'absolute',
        right: 0,
        left: 'auto',
        height: '100%',
        width: '50%',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
});
