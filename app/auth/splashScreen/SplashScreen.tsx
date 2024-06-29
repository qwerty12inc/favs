import { ActivityIndicator, Alert, ImageBackground, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { globalStyles, globalTokens } from '../../../src/styles'
import { Text, Image } from 'react-native-ui-lib';
import { useNavigation, useRouter } from 'expo-router';
import { auth } from '../../../src/utils/firebase';
import { useDispatch } from 'react-redux';
import { resetAuthentication, setAuthentication } from '../../../src/store/features/isAuthSlice';


export default function SplashScreen() {

    return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* <Image style={styles.kv} source={require('../../../assets/favicon.png')} /> */}
                {/* <Text style={[globalStyles.title]}>Welcome to FAVS!</Text> */}
                <ImageBackground source={require('../../../assets/splash.png')} resizeMode="cover" style={styles.image}>
                    <ActivityIndicator size="large" color="#000" style={styles.loader} />
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        // marginTop: 45,
        // paddingHorizontal: 16,
        // height: '100%',
        backgroundColor: "#fff",
        width: "100%",
        flex: 1
    },
    image: {
        flex: 1,
        // justifyContent: 'center',
        width: "100%",
        display: "flex",
        justifyContent: "flex-end"
    },
    loader: {
        marginTop: 25
    }
});
