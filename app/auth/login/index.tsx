import { View, Text, SafeAreaView, Dimensions, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import { globalStyles, globalTokens } from '../../../src/styles';
import { Button } from '../../../src/components/Button/Button';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { MaskedInput } from 'react-native-ui-lib';
import { auth } from '../../../src/utils/firebase';

const { width, height } = Dimensions.get('window');

export default function LoginPage() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');

    const [isFormValid, setIsFormValid] = useState<boolean>(true);

    const handleSubmit = () => {
        if (!isFormValid) {
            return;
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user)
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(error)
                    // ..
                });
        }
    };

    return (
        <SafeAreaView
            style={{
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
                    keyboardType="default"
                    onChange={(e) => setEmail(e.nativeEvent.text)}
                />
                <TextInput
                    style={style.input}
                    aria-label="Password"
                    placeholder="Password"
                    keyboardType="default"
                    onChange={(e) => setPassword(e.nativeEvent.text)}
                />
                <Button onClick={handleSubmit}>Log in</Button>
            </View>
        </SafeAreaView>
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
