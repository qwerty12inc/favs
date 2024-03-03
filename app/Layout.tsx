import React, { useCallback, useEffect, useState } from 'react';
import MainPage from './main';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

export default function Layout() {
    SplashScreen.preventAutoHideAsync();

    // const authenticated = useSelector((state: IStateInterface) => state.authentication.isLogined);
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
                console.clear();
                console.log('ready');
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
            <GestureHandlerRootView onLayout={onLayoutRootView}>
                <BottomSheetModalProvider>
                    <MainPage />
                    {/* <Text>qwerty</Text> */}
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        );
}
