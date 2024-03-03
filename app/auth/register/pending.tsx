import { View, Text, SafeAreaView, Dimensions } from 'react-native';
import React from 'react';
import { ConfirmCodeInput } from '../../../src/components/ConfirmCodeInput/ConfirmCodeInput';
const { width, height } = Dimensions.get('window');

export default function pending() {
    return (
        <SafeAreaView style={{ minHeight: height }}>
            <ConfirmCodeInput size={4} />
        </SafeAreaView>
    );
}
