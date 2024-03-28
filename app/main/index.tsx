import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigation, useRouter } from 'expo-router';
import { StyleSheet, TextInput, Dimensions, Pressable, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Avatar, View, Image, SafeAreaSpacerView } from 'react-native-ui-lib';
import MapBlock from '../../src/components/Map';
import { useDispatch, useSelector } from 'react-redux';
import { IStateInterface } from '../../src/store/store';
import CityPicker from '../../src/components/CityPicker';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PlaceItem from '../../src/components/PlacesList/PlaceItem';
import PlaceList, { PLACES_LIST_MOCK } from '../../src/components/PlacesList/PlaceList';
import { CustomText as Text, CustomTitle as Title } from '../../src/components/Text/CustomText';
import Banner from '../../src/components/Banner/Banner';
import BannerSlider from '../../src/components/Banner/BannerSlider';
import { globalTokens } from '../../src/styles';
import { TMapApiResponse } from '../../src/models/maps';
import { setFilterPlaces } from '../../src/store/features/PlacesSlice';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';
import { FirebaseStorageTypes, firebase } from '@react-native-firebase/storage';
import FilterList from '../../src/components/FilterList/FilterList';
const profileDefaultAvatar = require("../../assets/icons/user.png");

const { width, height } = Dimensions.get('window');

export default function MainPage() {

    const cities = useSelector((state: IStateInterface) => state.cities.cities);
    const currentCity = useSelector((state: IStateInterface) => state.cities.current);
    const filterPlaces = useSelector((state: IStateInterface) => state.places.filteredPlaces);
    const filterPlacesAmount = useSelector((state: IStateInterface) => state.places.filteredPlacesAmount);
    const [bottomSheetState, setBottomSheetState] = useState<1 | 0>(0)
    const [searchFocused, setSearchFocused] = useState<boolean>(false)
    const [placesList, setPlacesList] = useState<TMapApiResponse[]>([])

    const snapPoints = useMemo(() => [100, height - 125], []);

    const BottomSheetModalRef = useRef<BottomSheetModal>(null);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleDonateLink = () => {
        switch (currentCity) {
            case 'Milan':
                return 'https://favsapp.gumroad.com/l/hgpkc'
                break;
            case 'Amsterdam':
                return 'https://favsapp.gumroad.com/l/Lerasguide'
                break
        }
    }

    useEffect(() => {
        setPlacesList(filterPlaces)
    }, [filterPlaces])

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
            <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.searchBar_shadow}>
                    {/* <BannerSlider style={{ background: globalTokens.colors.white }}>
                        <Banner
                            title='Support author'
                            description={`Donate to Author of ${currentCity} places list `}
                            link={handleDonateLink()}
                            backgroundColor='#260202'
                            darkBackground
                        />
                        <Banner
                            title='What is Favs?'
                            description='Learn more'
                            link='https://favs.website'
                        />
                    </BannerSlider> */}
                </View>
            </TouchableWithoutFeedback>
            <View style={{flex: 1}} accessible={false}>
                <View style={styles.mapContainer}>
                    <MapBlock initialPosition={currentCity?.center} />
                    <View style={styles.overlay}>
                        <TextInput
                            // value={text}
                            onChangeText={onInputChange}
                            placeholder={'Search'}
                            style={styles.input}
                            onFocus={onInputFocus}
                            onBlur={onInputBlur}
                        />
                        <FilterList/>
                        {/* <SegmentedControl
                            values={['Coffee', 'Drink', 'Eat']}
                            selectedIndex={0}
                            style={{ paddingVertical: 20 }}
                            fontStyle={{ fontFamily: 'ClashDisplay-Medium' }}
                        // onChange={(event) => {
                        //   this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
                        // }}
                        /> */}
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
        position: "absolute",
        zIndex: 20,
        // backgroundColor: 'white',
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
