import React, { useCallback, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import Navigator from './(navigator)/Navigator';
import { Slot } from 'expo-router';

export default function RootLayout() {
    return (
        <Provider store={store}>
            {/* <Slot /> */}
            <Navigator />
        </Provider>
    );
}
