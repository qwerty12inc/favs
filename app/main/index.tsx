import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigation, useRouter } from 'expo-router';
import { StyleSheet, SafeAreaView, TextInput, Dimensions, Pressable } from 'react-native';
import { Avatar, View } from 'react-native-ui-lib';
import MapBlock from '../../src/components/Map';
import { useSelector } from 'react-redux';
import { IStateInterface } from '../../src/store/store';
import CityPicker from '../../src/components/CityPicker';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PlaceItem from '../../src/components/PlacesList/PlaceItem';
import PlaceList, { PLACES_LIST_MOCK } from '../../src/components/PlacesList/PlaceList';
import { CustomText as Text, CustomTitle as Title } from '../../src/components/Text/CustomText';

const { width, height } = Dimensions.get('window');

export default function MainPage() {

    const cities = useSelector((state: IStateInterface) => state.cities.cities);
    const currentCity = useSelector((state: IStateInterface) => state.cities.current);
    const places = useSelector((state: IStateInterface) => state.places.places);
    const placesAmount = useSelector((state: IStateInterface) => state.places.placesAmount);

    const snapPoints = useMemo(() => [100, height - 195], []);

    const BottomSheetModalRef = useRef<BottomSheetModal>(null);

    const [text, onChangeText] = React.useState('');

    const navigation = useNavigation();

    const onProfilePress = () => {
        //@ts-ignore
        navigation.navigate('profile/index');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userProfile}>
                <SafeAreaView>
                    <CityPicker />
                </SafeAreaView>
                <Pressable
                    onPress={onProfilePress}
                    style={styles.userAvatar}
                >
                    <Avatar
                        source={{
                            uri: 'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg',
                        }}
                        label={'it'}
                    />
                </Pressable>
            </View>
            <View style={styles.searchBar_shadow}>
                <View style={{ paddingVertical: 0 }}>
                    <TextInput
                        // value={text}
                        onChangeText={onChangeText}
                        placeholder={'Search'}
                        onChange={(e) => {
                            console.log(e.nativeEvent.text);
                        }}
                        style={styles.input}
                    />
                    <SegmentedControl
                        values={['Coffee', 'Drink', 'Eat']}
                        selectedIndex={0}
                        style={{ paddingVertical: 20 }}
                        fontStyle={{ fontFamily: 'ClashDisplay-Medium' }}
                    // onChange={(event) => {
                    //   this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
                    // }}
                    />
                </View>
            </View>
            <View style={styles.mapContainer}>
                <MapBlock initialPosition={cities[currentCity]} />
            </View>
            <BottomSheet
                style={styles.shadow}
                ref={BottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
            >
                <Text style={styles.placesCount}>{placesAmount} places in {currentCity}</Text>
                <PlaceList />
            </BottomSheet>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        display: 'flex',
        backgroundColor: 'white',
    },
    mapContainer: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 32,
    },
    userProfile: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    userAvatar: {
        marginLeft: 'auto',
    },
    input: {
        backgroundColor: 'rgba(118, 118, 128, 0.12)',
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 17,
        lineHeight: 22,
        marginVertical: 20,

        borderRadius: 10,
        fontFamily: 'ClashDisplay-Medium',
    },
    padding: {
        marginTop: 100,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
        zIndex: 10,
    },
    searchBar_shadow: {
        paddingHorizontal: 16,
        zIndex: 20,
        backgroundColor: 'white',
        paddingBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 24,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10.0,
        elevation: 10,
    },
    placesCount: {
        textAlign: 'center',
        fontFamily: 'ClashDisplay-Medium',
        fontWeight: '500',
        fontSize: 18,
        marginTop: 14,
        // marginBottom: 14,
    },
});
