import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Dimensions, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { IStateInterface } from '../src/store/store';
import MainPage from './main';
import LoginPage from './auth/index';
import Navigator from './(navigator)/Navigator';

// import AppRoot from './(navigator)/AppRoot';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useNavigation, useRouter } from 'expo-router';
import { View } from 'react-native-ui-lib';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function Layout({ children }) {
    SplashScreen.preventAutoHideAsync();

    const authenticated = useSelector((state: IStateInterface) => state.authentication.isLogined);
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

            <View style={{ height }} onLayout={onLayoutRootView}>
                <NavigationContainer independent={true}>
                    <Navigator />
                </NavigationContainer>
            </View>

        );
}