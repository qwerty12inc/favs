import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigation } from 'expo-router';
import { StyleSheet, Dimensions, Pressable, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { View, Image } from 'react-native-ui-lib';
import MapBlock from '../src/components/Map';
import { useDispatch, useSelector } from 'react-redux';
import { IStateInterface } from '../src/store/store';
import CityPicker from '../src/components/CityPicker';
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import PlaceList from '../src/components/PlacesList/PlaceList';
import { CustomText as Text } from '../src/components/Text/CustomText';
import { globalTokens } from '../src/styles';
import { TMapApiResponse } from '../src/models/maps';
import { setFilterPlaces } from '../src/store/features/PlacesSlice';
import FilterList from '../src/components/FilterList/FilterList';
import CategoryList from '../src/components/CategoryList/CategoryList';
const profileDefaultAvatar = require("../assets/icons/user.png");
import { useNavigationState } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function MainPage() {

    const cities = useSelector((state: IStateInterface) => state.cities.cities);
    const currentCity = useSelector((state: IStateInterface) => state.cities.currentCity);
    const filters = useSelector((state: IStateInterface) => state.places.filterList);
    const filterPlaces = useSelector((state: IStateInterface) => state.places.filteredPlaces);
    const filterPlacesAmount = useSelector((state: IStateInterface) => state.places.filteredPlacesAmount);
    const { isLogined, authData } = useSelector((state: IStateInterface) => state.authentication);
    const [bottomSheetState, setBottomSheetState] = useState<1 | 0>(0)
    const [searchFocused, setSearchFocused] = useState<boolean>(false)
    const [placesList, setPlacesList] = useState<TMapApiResponse[]>([])

    const snapPoints = useMemo(() => [75, height - 85], []);

    const BottomSheetModalRef = useRef<BottomSheetModal>(null);

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const navigationState = useNavigationState(state => state);

    useEffect(() => {
        setPlacesList(filterPlaces)
        // Alert.alert(currentStack, (navigationState?.routeNames.includes('map') ? "true" : "false") + (navigationState?.routeNames.includes('auth') ? "true" : "false"))
    }, [])

    const onProfilePress = () => {
        //@ts-ignore
        navigation.navigate('profile/index');
    };

    const onInputChange = (text) => {
        dispatch(setFilterPlaces(text))
    }

    const onInputFocus = () => {
        setBottomSheetState(1)
        setSearchFocused(true)
    }

    const onInputBlur = () => {
        setBottomSheetState(0)
        setSearchFocused(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback style={{flex: 1, borderRadius: 8}} onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.userProfile}>
                    <SafeAreaView>
                        <CityPicker />
                    </SafeAreaView>
                    <Pressable
                        onPress={onProfilePress}
                        style={styles.userAvatar}
                    >
                        <Image
                            width={25}
                            height={25}
                            source={profileDefaultAvatar}
                        />
                    </Pressable>
                </View>
            </TouchableWithoutFeedback>
            <View style={{flex: 1}} accessible={false}>
                <View style={styles.mapContainer}>
                    <MapBlock />
                    <View style={styles.overlay}>
                        <CategoryList/>
                        <FilterList/>
                    </View>
                </View>
            </View>
            <BottomSheet
                style={styles.shadow}
                ref={BottomSheetModalRef}
                index={bottomSheetState}
                snapPoints={snapPoints}
            >
                <Text style={styles.placesCount}>{filterPlacesAmount} places in {currentCity.name}</Text>
                <PlaceList searchInProgress={searchFocused} />
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
        position: "relative",
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: -10,
        marginBottom: 40,
        // paddingHorizontal: 16,
    },
    overlay: {
        position: "absolute",
        top: 10,
        width: "100%",
        display: "flex",
        gap: 0, 
    },
    userProfile: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        zIndex: 100,
    },
    userAvatar: {
        marginLeft: 'auto',
    },
    input: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 17,
        lineHeight: 22,
        marginTop: 8,
        marginBottom: 8,
        marginHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: globalTokens.colors.lightGrey,

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
        backgroundColor: '#fff',
        elevation: 24,
        zIndex: 10,
    },
    searchBar_shadow: {
        position: "absolute",
        zIndex: 20,
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
        marginTop: 8,
        paddingBottom: 8,
    },
});
