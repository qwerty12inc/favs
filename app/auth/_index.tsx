import React, { useCallback, useEffect, useState } from 'react';
import { Slot, Stack, useRouter } from 'expo-router';
import { View, Text, SafeAreaView } from 'react-native';
import { Provider, useSelector } from 'react-redux';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IStateInterface } from '../../src/store/store';

export default function RootLayout() {
    const authenticated = useSelector((state: IStateInterface) => state.authentication.isLogined);
    const router = useRouter();

    // useEffect(() => {
    //     if (authenticated === true) {
    //         router.replace('index');
    //     }
    // }, [authenticated]);

    return (
        <SafeAreaView>
            <Slot />
        </SafeAreaView>
    );
}
