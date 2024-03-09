import React, { useCallback, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import Navigator from './(navigator)/Navigator';
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function RootLayout({ children }) {
    return (
        <Provider store={store}>
            <GestureHandlerRootView >
                <BottomSheetModalProvider>
                    <Slot />
                </BottomSheetModalProvider>
            </GestureHandlerRootView >
        </Provider>
    );
}
