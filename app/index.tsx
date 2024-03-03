import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Dimensions, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { IStateInterface } from '../src/store/store';
import MainPage from './main';
import LoginPage from './auth/index';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Navigator from './(navigator)/Navigator';

// import AppRoot from './(navigator)/AppRoot';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useNavigation, useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Layout() {
    SplashScreen.preventAutoHideAsync();

    // const authenticated = useSelector((state: IStateInterface) => state.authentication.isLogined);
    // const navigation = useNavigation();
    // const router = useRouter();

    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                // Pre-load fonts, make any API calls you need to do here
                await Font.loadAsync({
                    'Archivo-Medium': require('../assets/fonts/Archivo-Medium.ttf'),
                    'Archivo-Bold': require('../assets/fonts/Archivo-Bold.ttf'),
                    'ClashDisplay-Medium': require('../assets/fonts/ClashDisplay-Medium.ttf'),
                    'ClashDisplay-Bold': require('../assets/fonts/ClashDisplay-Bold.ttf'),
                });
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
                console.clear();
                console.log('ready');
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    } else
        return (
            <GestureHandlerRootView onLayout={onLayoutRootView}>
                <BottomSheetModalProvider>
                    <MainPage />
                    {/* <Text>qwerty</Text> */}
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
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
        // fontFamily: 'ClashDisplay-Medium',
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
        // marginBottom: 24,
        fontWeight: '500',
        fontSize: 18,
        marginTop: 14,
        marginBottom: 14,
    },
});
