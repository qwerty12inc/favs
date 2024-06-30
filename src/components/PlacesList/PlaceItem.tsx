import React, { useCallback } from 'react';
import {
    View,
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    Pressable,
} from 'react-native';
import { Carousel, AnimatedImage, Image } from 'react-native-ui-lib';
import { CustomTitle as Title, CustomText as Text } from '../Text/CustomText';
import { setCurrentPlace } from '../../store/features/PlacesSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

type TProps = {
    id: string;
    name: string;
    address: string;
    photo: string;
    isFirst?: boolean;
};

export default function PlaceItem(props: TProps) {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleItemClick = useCallback((id: string) => {
        // console.log(event.nativeEvent.id);
        dispatch(setCurrentPlace(id))
        //@ts-ignore
        router.replace('places/[id]', { id: id });
      },[])

    return (
        <Pressable
            style={[props.isFirst && { marginTop: 0 }, styles.container]}
            onPress={() => handleItemClick(props.id)}
        >
            <View>
                {props.photo &&
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
                            <TouchableWithoutFeedback onPress={()=> handleItemClick(props.id)}>
                                <View
                                    style={{
                                        width: '100%',
                                        padding: 0,
                                        backgroundColor: 'grey',
                                    }}
                                >
                                    <AnimatedImage
                                        style={{ height: '100%', width: '100%' }}
                                        source={{ uri: props.photo }}
                                        loader={<ActivityIndicator />}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                    </Carousel>
                }
                {
                    !props.photo &&
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