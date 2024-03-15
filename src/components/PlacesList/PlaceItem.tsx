import { Link, useNavigation } from 'expo-router';
import React from 'react';
import {
    View,
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    ImageSourcePropType,
    Pressable,
} from 'react-native';
import { Carousel, AnimatedImage, Image } from 'react-native-ui-lib';
import { CustomTitle as Title, CustomText as Text } from '../Text/CustomText';

const { width, height } = Dimensions.get('window');

type TProps = {
    id: string;
    name: string;
    address: string;
    photos: string[];
    isFirst?: boolean;
};

export default function PlaceItem(props: TProps) {
    const navigation = useNavigation();

    const onPress = () => {
        //@ts-ignore
        navigation.navigate('places/[id]', { id: props.id });
    };

    return (
        <Pressable
            style={[props.isFirst && { marginTop: 0 }, styles.container]}
            onPress={onPress}
        >
            <View>
                {props.photos && props.photos?.length > 0 &&
                    <Carousel
                        containerStyle={{
                            height: 250,
                            padding: 0,
                            margin: 0,
                        }}
                        containerMarginHorizontal={0}
                        pagingEnabled
                        itemSpacings={0}
                        pageWidth={width}
                        pageControlPosition={'over'}
                        allowAccessibleLayout
                        style={{ borderRadius: 8 }}
                    >
                        {props.photos.map((item) => (
                            <TouchableWithoutFeedback key={item.toString()} onPress={onPress}>
                                <View
                                    style={{
                                        width: '100%',
                                        padding: 0,
                                        backgroundColor: 'grey',
                                    }}
                                >
                                    <AnimatedImage
                                        style={{ height: '100%', width: '100%' }}
                                        source={{ uri: item }}
                                        loader={<ActivityIndicator />}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        ))
                        }
                    </Carousel>
                }
                {
                    !props.photos &&
                    <Image
                        style={{
                            height: 250,
                            padding: 0,
                            margin: 0,
                        }}
                        source={require('../../../assets/default-fallback-image.png')}
                    />

                }

                <Title style={styles.place__name}>{props.name}</Title>
                <Text style={styles.place__address}>{props.address}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginVertical: 24,
        // backgroundColor: "red",
        height: 'auto',
    },
    place__name: {
        fontSize: 24,
        fontWeight: '700',
        marginTop: 8,
    },
    place__address: {
        fontSize: 16,
        fontWeight: '500',
        color: 'grey',
        marginTop: 4,
    },
});
