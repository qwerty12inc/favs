import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Dimensions, Text, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IStateInterface } from '../src/store/store';
import MainPage from './main';
import LoginPage from './auth/index';
import Navigator from './(navigator)/Navigator';
import 'expo-dev-client';

// import AppRoot from './(navigator)/AppRoot';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useNavigation, useRootNavigationState, useRouter } from 'expo-router';
import { View } from 'react-native-ui-lib';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { setAuthentication, resetAuthentication } from '../src/store/features/isAuthSlice';
import useAuth from '../src/utils/auth';

const { width, height } = Dimensions.get('window');

export default function Layout({ children }) {
    // SplashScreen.preventAutoHideAsync();
    const auth = useAuth();

    // const navigation = useNavigation();
    // const router = useRouter();
    const navigationState = useRootNavigationState();

    const [appIsReady, setAppIsReady] = useState(false);
    const { isLogined, authData } = useSelector((state: IStateInterface) => state.authentication);

    // useEffect(() => {
    //     async function prepare() {
    //         try {
    //             // Pre-load fonts, make any API calls you need to do here
    //             await Font.loadAsync({
    //                 'Archivo-Medium': require('../assets/fonts/Archivo-Medium.ttf'),
    //                 'Archivo-Bold': require('../assets/fonts/Archivo-Bold.ttf'),
    //                 'ClashDisplay-Medium': require('../assets/fonts/ClashDisplay-Medium.ttf'),
    //                 'ClashDisplay-Bold': require('../assets/fonts/ClashDisplay-Bold.ttf'),
    //             });
    //         } catch (e) {
    //             console.warn(e);
    //         } finally {
    //             setAppIsReady(true);
    //         }
    //     }

    //     prepare();
    // }, []);

    // const navigation = useNavigation();
    // const dispatch = useDispatch();

    // const onLayoutRootView = useCallback(async () => {
    //     if (appIsReady) {
    //         await SplashScreen.hideAsync();
    //     }
    // }, [appIsReady]);

    // if (!appIsReady && !authData) {
    //     return null;
    // } else
        return (

            <View style={{ height }} >
                <Navigator />
            </View>

        );
}