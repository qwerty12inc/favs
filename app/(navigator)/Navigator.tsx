import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation, useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { IStateInterface } from '../../src/store/store';

import MainPage from '../main';
import PlacePage from '../places/[id]';
import ProfilePage from '../profile';
import ProfileSettingsPage from '../profile/settings';
import TestPage from '../test';
import WelcomePage from '../auth';
import LoginPage from '../auth/login';
import RegisterPage from '../auth/register';
import SplashScreen from '../auth/splashScreen/SplashScreen';
import CitiesPage from '../cities';
import { Alert } from 'react-native';

export default function Navigator() {
    const { isLogined, authData } = useSelector((state: IStateInterface) => state.authentication);
    const Stack = createNativeStackNavigator();
    const navigationState = useNavigationState(state => state);
    const navigation = useNavigation()

    useEffect(() => {
        Alert.alert('isLogined: ' + isLogined);
        Alert.alert('authData: ' + JSON.stringify(authData));
    }, [isLogined, authData, navigationState, navigation]);

    if (authData === null) {
        return (
            <NavigationContainer independent={true}>
                <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName='loading'>
                    <Stack.Screen
                        name="loading"
                        options={{
                            headerShown: false,
                            headerTitle: ''
                        }}
                        component={SplashScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer independent={true}>
            {authData ? (
                <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName='map'>
                    <Stack.Screen
                        name="map"
                        options={{ headerShown: false, headerTitle: '' }}
                        component={MainPage}
                    />
                    <Stack.Screen
                        name="test"
                        options={{ headerShown: false, headerTitle: '' }}
                        component={CitiesPage}
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
            ) : (
                <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName='auth'>
                    <Stack.Screen
                        name="auth"
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
            )}
        </NavigationContainer>
    );
}