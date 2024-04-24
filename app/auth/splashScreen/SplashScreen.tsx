import { ActivityIndicator, Alert, ImageBackground, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { globalStyles, globalTokens } from '../../../src/styles'
import { Text, Image } from 'react-native-ui-lib';
import { useNavigation, useRouter } from 'expo-router';
import { auth } from '../../../src/utils/firebase';


export default function SplashScreen() {
    const navigation = useNavigation();

    // useEffect(() => {
    //     console.warn(auth)
    //     if (!auth?.currentUser) {

    //         let timeout = setInterval
    //         Alert.alert('Can`t find user')
    //         // console.log(auth)
    //         //@ts-ignore
    //         navigation.replace('index');
    //     } else {
    //         Alert.alert('Found user')
    //         //@ts-ignore
    //         navigation.replace('index');
    //     }
    // },[auth])

    useEffect(() => {
        // Функция для перенаправления на страницу логина
        const redirectToLogin = () => {
            Alert.alert('Can`t find user');
            //@ts-ignore
            navigation.replace('index');
        };
    
        // Функция для перенаправления на другую страницу
        const redirectToMapPage = () => {
            Alert.alert('Found user');
            //@ts-ignore
            navigation.replace('index');
        };
    
        // Проверка наличия auth при загрузке страницы
        const authCheckTimer = setTimeout(() => {
            if (!auth?.currentUser) {
                redirectToLogin();
            } else {
                redirectToMapPage();
            }
        }, 5000); // 5000 миллисекунд = 5 секунд
    
        // Если auth появится до истечения таймера, очищаем таймер
        if (auth?.currentUser) {
            clearTimeout(authCheckTimer);
            redirectToMapPage(); // Напрямую перенаправляем на другую страницу
        }
    
        // Очистка таймера при размонтировании компонента
        return () => clearTimeout(authCheckTimer);
    }, [auth, navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* <Image style={styles.kv} source={require('../../../assets/favicon.png')} /> */}
                {/* <Text style={[globalStyles.title]}>Welcome to FAVS!</Text> */}
                <ImageBackground source={require('../../../assets/splash.png')} resizeMode="cover" style={styles.image}>
                    <ActivityIndicator size="large" color="#000" style={styles.loader} />
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        // marginTop: 45,
        // paddingHorizontal: 16,
        // height: '100%',
        backgroundColor: "#fff",
        width: "100%",
        flex: 1
    },
    image: {
        flex: 1,
        // justifyContent: 'center',
        width: "100%",
        display: "flex",
        justifyContent: "flex-end"
    },
    loader: {
        marginTop: 25
    }
});
