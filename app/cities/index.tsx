import { Text, Pressable, SafeAreaView } from 'react-native'
import { Avatar, View, Image } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react'
import CityPicker from '../../src/components/CityPicker'
import MapService from '../../src/http/MapService';
import { useDispatch, useSelector } from 'react-redux';
import { setCities } from '../../src/store/features/CitySlice';
import { IStateInterface } from '../../src/store/store';
import { useNavigation } from 'expo-router';
const profileDefaultAvatar = require("../../assets/icons/user.png");


export default function CitiesPage() {
    const dispatch = useDispatch();
    const cities = useSelector((state: IStateInterface) => state.cities.cities);
    const navigation = useNavigation();

    const onProfilePress = () => {
        //@ts-ignore
        navigation.navigate('profile/index');
    };

    // useEffect(() => {
    //     MapService.getCitiesList().then((res) => {
    //         console.log(res.data)
    //         // dispatch(setCities(res.data))
    //     })
    //     .catch((err) => {
    //         console.error(err)
    //     });
    // }, [])

    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.userProfile}>
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
                <View>
                    {
                        Object.keys(cities).map((city) => {
                            return (
                                <View key={city}>
                                    <Text>{city}</Text>
                                </View>
                            )
                        })
                    }
                </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        display: 'flex',
        backgroundColor: 'white',
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
});
