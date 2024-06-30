import { Redirect, Stack } from 'expo-router';

import { Text } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import { IStateInterface } from '../../src/store/store';
import useAuth from '../../src/utils/auth';
import { useEffect } from 'react';

export default function AppLayout() {
  const auth = useAuth();
  const { isLogined, authData } = useSelector((state: IStateInterface) => state.authentication);

  // useEffect(() => {
  //   console.log(auth);
  //   console.log(authData);
  // }, [])

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (auth === undefined) {
    return <Text>Loading</Text>
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (authData === null) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/welcome" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
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
    </Stack>
  );
}
