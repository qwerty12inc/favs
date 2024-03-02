import { Link, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, View, Text, Image } from 'react-native-ui-lib';
import { globalStyles } from '../../src/styles';
import { Button } from './../../src/components/Button/Button';
import { ConfirmCodeInput } from '../../src/components/ConfirmCodeInput/ConfirmCodeInput';

type TSettingsProps = {
    name: string;
    icon: any;
    link: string;
    last?: boolean;
};

export default function Profile() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Stack.Screen
                    options={{
                        headerTransparent: true,
                        //   headerLeft: () => <Text>Back</Text>,
                        headerBackButtonMenuEnabled: true,
                    }}
                />
                <View style={{ display: 'flex', alignItems: 'center', height: '60%' }}>
                    {/* <Image style={styles.kv} source={require('../../assets/favicon.png')} />
          <Text style={[globalStyles.title]}>Welcome to FAVS!</Text>
          <Text style={[globalStyles.subtitle, styles.subtitle]}>
            Create an account and get access to cool places around the Europe
          </Text>
          <View style={[styles.cta]}>
            <Button onClick={() => console.log('click')}>Get started!</Button>
          </View> */}
                    <ConfirmCodeInput size={4} />
                </View>
            </ScrollView>
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
