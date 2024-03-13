import { Link, useNavigation, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, View, Text, Image } from 'react-native-ui-lib';
import { globalStyles, globalTokens } from '../../src/styles';
import { Button } from './../../src/components/Button/Button';

export default function WelcomePage() {
    const navigation = useNavigation();

    const onLoginPress = () => {
        //@ts-ignore
        navigation.navigate('auth/login/index');
    };

    const onRegisterPress = () => {
        //@ts-ignore
        navigation.navigate('auth/register/index');
    };

    return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView style={{ display: 'flex', alignItems: 'center' }}>
                <Image style={styles.kv} source={require('../../assets/favicon.png')} />
                <Text style={[globalStyles.title]}>Welcome to FAVS!</Text>
                <Text style={[globalStyles.subtitle, styles.subtitle]}>
                    Create an account and get access to cool places around the Europe
                </Text>
                <View style={[styles.cta]}>
                    <Button
                        onClick={onRegisterPress}
                        children={'Sign up'}
                    />
                    <Button
                        onClick={onLoginPress}
                        children={'Sign in'}
                        type="secondary"
                    />
                </View>
            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 45,
        paddingHorizontal: 16,
    },
    kv: {
        marginTop: 96,
        marginBottom: 48,
        width: 200,
        height: 200,
    },
    link: {
        color: globalTokens.colors.darkGrey,
    },
    subtitle: {
        paddingHorizontal: 16,
        textAlign: 'center',
    },
    cta: {
        marginTop: 32,
        display: "flex",
        flexDirection: "row",
        gap: 16
    },
});
