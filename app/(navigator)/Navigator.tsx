import { Stack, useNavigation, useRouter } from 'expo-router';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IStateInterface } from '../../src/store/store';

const PrivateScreens = (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, headerTitle: '' }} />
        <Stack.Screen
            name="places/[id]"
            options={{
                headerShown: true,
                headerTitle: '',
                headerStyle: {
                    backgroundColor: 'transparent',
                },
            }}
        />
        <Stack.Screen
            name="profile/index"
            options={{
                headerShown: true,
                headerTitle: 'Profile',
                headerStyle: {
                    backgroundColor: 'transparent',
                },
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
            name="test/index"
            options={{
                headerShown: true,
                headerTitle: 'test',
                headerStyle: {
                    backgroundColor: 'transparent',
                },
                headerBackVisible: false,
            }}
        />
    </Stack>
);

const LoginScreens = (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, headerTitle: '' }} />
        <Stack.Screen
            name="auth/index"
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="auth/login/index"
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="auth/register/index"
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="auth/register/pending"
            options={{
                headerShown: false,
            }}
        />
    </Stack>
);

export default function Navigator() {
    const authenticated = useSelector((state: IStateInterface) => state.authentication.isLogined);

    console.log(authenticated, authenticated ? 'PrivateScreens' : 'LoginScreens');
    return authenticated ? PrivateScreens : LoginScreens;
}
