import { Link, Stack, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, View, Text, Image } from 'react-native-ui-lib';
import { globalStyles } from '../../src/styles';
import { Button } from './../../src/components/Button/Button';
import { ConfirmCodeInput } from '../../src/components/ConfirmCodeInput/ConfirmCodeInput';

const { width, height } = Dimensions.get('window');

export default function LoginPage() {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerTransparent: false,
                    //   headerLeft: () => <Text>Back</Text>,
                    headerBackButtonMenuEnabled: true,
                }}
            />
            <SafeAreaView style={{ display: 'flex', alignItems: 'center' }}>
                <Image style={styles.kv} source={require('../../assets/favicon.png')} />
                <Text style={[globalStyles.title]}>Welcome to FAVS!</Text>
                <Text style={[globalStyles.subtitle, styles.subtitle]}>
                    Create an account and get access to cool places around the Europe
                </Text>
                <View style={[styles.cta]}>
                    <Button
                        onClick={() => router.replace('/auth/register')}
                        children={'Get started!'}
                    />
                </View>
                <Text>
                    Already have an account?{' '}
                    <Link replace href={'/auth/register'}>
                        Log in
                    </Link>
                </Text>
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
    subtitle: {
        paddingHorizontal: 16,
        textAlign: 'center',
    },
    cta: {
        marginTop: 32,
    },
});
