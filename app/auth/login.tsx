import { View, Text, Dimensions, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { globalStyles, globalTokens } from '../../src/styles';
import { Button } from '../../src/components/Button/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../src/utils/firebase';
import { emailValidator } from '../../src/utils/validators';
import { debounce } from 'lodash';
import { Stack, useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function LoginPage() {

    const [email, setEmail] = useState<string>('');
    const [isEmailError, setIsEmailError] = useState<boolean | null>(null);
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();

    const isFormValid = (isEmailError !== null && !isEmailError)

    const handleEmailChange =
        debounce((text) => {
            setEmail(text)
            setIsEmailError(!emailValidator(text))
        }, 2000)

    const handleSubmit = () => {
        if (!isFormValid) {
            return;
        } else {
            setLoading(true)
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user);
                    router.replace('/(app)');
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(error)
                    if (errorCode === 'auth/invalid-credential') {
                        Alert.alert("Error", `Wrong login or password`, [
                            { text: 'OK', onPress: () => console.info('OK Pressed') },
                        ])
                    } else {
                        Alert.alert("Error", `${errorCode}: ${errorMessage}`, [
                            { text: 'OK', onPress: () => console.info('OK Pressed') },
                        ])
                    }
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    };

    return (
        <ScrollView
            contentContainerStyle={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: height,
            }}
        >
            <Text style={[globalStyles.title]}>Login</Text>
            <View style={style.form}>
                <TextInput
                    style={style.input}
                    aria-label="Email"
                    placeholder="Your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    textContentType="emailAddress"
                    onChangeText={handleEmailChange}
                />
                {
                    isEmailError && <Text style={{ color: globalTokens.colors.red }}>Unvalid email</Text>
                }
                <TextInput
                    style={style.input}
                    aria-label="Password"
                    placeholder="Password"
                    secureTextEntry={true}
                    keyboardType="default"
                    onChange={(e) => setPassword(e.nativeEvent.text)}
                />
                <Button
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={!isFormValid}
                >
                    Log in
                </Button>
            </View>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: 15,
        gap: 8,
    },
    input: {
        minWidth: '100%',
        borderColor: globalTokens.colors.grey,
        borderWidth: 1,
        padding: 15,
    },
});
