import React, { useCallback, useEffect, useState } from 'react';
import { Slot, Stack } from "expo-router";
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
export { ErrorBoundary } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function RootLayout({ children }) {
    const [fontLoaded, fontError] = useFonts({
        'Archivo-Medium': require('../assets/fonts/Archivo-Medium.ttf'),
        'Archivo-Bold': require('../assets/fonts/Archivo-Bold.ttf'),
        'ClashDisplay-Medium': require('../assets/fonts/ClashDisplay-Medium.ttf'),
        'ClashDisplay-Bold': require('../assets/fonts/ClashDisplay-Bold.ttf'),
      });

    useEffect(() => {
        if (fontError) throw fontError;
    }, [fontError]);

    useEffect(() => {
        if (fontLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontLoaded]);

    if (!fontLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <GestureHandlerRootView >
                <BottomSheetModalProvider>
                    <Stack 
                        screenOptions={{ 
                            headerShown: false,
                            headerBackButtonMenuEnabled: true,
                            headerTransparent: true,
                        }}
                        initialRouteName='index'
                    >
                        <Stack.Screen
                            name="index"
                            options={{
                                headerShown: false,
                                headerTitle: ''
                            }}
                        />
                        <Stack.Screen
                            name="places/[id]"
                            options={{
                                headerShown: true,
                                headerTitle: '',
                            }}
                        />
                        <Stack.Screen
                            name="profile/index"
                            options={{
                                headerShown: true,
                                headerTitle: '',
                            }}
                        />
                        <Stack.Screen
                            name="profile/settings/index"
                            options={{
                                headerShown: true,
                                headerTitle: 'Settings',
                                headerStyle: {
                                    backgroundColor: 'transparent',
                                },
                            }}
                        />
                        <Stack.Screen
                            name="auth/welcome"
                            options={{
                                headerShown: false,
                                headerTitle: ''
                            }}
                        />
                        <Stack.Screen
                            name="auth/login"
                            options={{
                                headerShown: true,
                                headerTitle: '',
                            }}
                        />
                        <Stack.Screen
                            name="auth/registration"
                            options={{
                                headerShown: true,
                                headerTitle: '',
                            }}
                        />
                    </Stack>
                </BottomSheetModalProvider>
            </GestureHandlerRootView >
        </Provider>
    );
}
