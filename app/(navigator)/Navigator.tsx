import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import MainPage from '../main';
import PlacePage from '../places/[id]';
import ProfilePage from '../profile';
import ProfileSettingsPage from '../profile/settings';
import TestPage from '../test';
import WelcomePage from '../auth';
import LoginPage from '../auth/login';
import RegisterPage from '../auth/register';
import useAuth from '../../src/utils/auth';
import { useSelector } from 'react-redux';
import { IStateInterface } from '../../src/store/store';
import SplashScreen from '../auth/splashScreen/SplashScreen';

export default function Navigator() {
    const authenticated = useSelector((state: IStateInterface) => state.authentication.isLogined);
    const { user } = useAuth();
    const Stack = createNativeStackNavigator()

    useEffect(() => {
        console.log('user: ', user)
    }, [user])

    if (user) {
        console.log('private screens')
        return (
            <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName='index'>
                <Stack.Screen
                    name="index"
                    options={{ headerShown: false, headerTitle: '' }}
                    component={MainPage}
                />
                <Stack.Screen
                    name="places/[id]"
                    options={{
                        headerShown: true,
                        headerTransparent: true,
                        headerTitle: ''
                    }}
                    component={PlacePage}
                />
                <Stack.Screen
                    name="profile/index"
                    options={{
                        headerShown: true,
                        headerTransparent: true,
                        headerTitle: ''
                    }}
                    component={ProfilePage}
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
                    component={ProfileSettingsPage}
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
                    component={TestPage}
                />
            </Stack.Navigator>
        )
    } else {
        console.log('login screens')
        return (
            <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName='loader'>
                <Stack.Screen
                    name="loader"
                    options={{
                        headerShown: false,
                        headerTitle: ''
                    }}
                    component={SplashScreen}
                />
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false,
                        headerTitle: ''
                    }}
                    component={WelcomePage}
                />
                <Stack.Screen
                    name="auth/login/index"
                    options={{
                        headerShown: true,
                        headerTransparent: true,
                        headerTitle: ''
                    }}
                    component={LoginPage}
                />

                <Stack.Screen
                    name="auth/register/index"
                    options={{
                        headerShown: true,
                        headerTransparent: true,
                        headerTitle: ''
                    }}
                    component={RegisterPage}
                />
            </Stack.Navigator>
        )
    }
}
