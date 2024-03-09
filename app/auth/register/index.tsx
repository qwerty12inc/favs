import { View, Text, SafeAreaView, Dimensions, StyleSheet, TextInput, ScrollView, NativeSyntheticEvent, TextInputChangeEventData, Alert } from 'react-native';
import React, { useCallback, useState } from 'react';
import { globalStyles, globalTokens } from '../../../src/styles';
import { Button } from '../../../src/components/Button/Button';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { MaskedInput } from 'react-native-ui-lib';
import { emailValidator } from '../../../src/utils/validators';
import { auth } from '../../../src/utils/firebase';
import { debounce } from 'lodash';
import { useNavigation } from 'expo-router';


const { width, height } = Dimensions.get('window');

export default function RegisterPage() {
    const navigation = useNavigation();

    const [name, setName] = useState<string>('');
    const [isNameError, setIsNameError] = useState<boolean>(null);

    const [email, setEmail] = useState<string>('');
    const [isEmailError, setIsEmailError] = useState<boolean>(null);

    const [password, setPassword] = useState<string>('');
    const [isPasswordError, setIsPasswordError] = useState<boolean>(null);

    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [isPasswordConfirmError, setIsPasswordConfirmError] = useState<boolean>(null);

    const [loading, setLoading] = useState<boolean>(false)

    const isFormValid = (isEmailError !== null && !isEmailError) && (isNameError !== null && !isNameError) && (isPasswordError !== null && !isPasswordError) && (isPasswordConfirmError !== null && !isPasswordConfirmError)

    const handleNameChange = (text) => {
        setName(text)
        setIsNameError(!(text.length > 0))
    }

    const handleEmailChange =
        debounce((text) => {
            setEmail(text)
            setIsEmailError(!emailValidator(text))
        }, 600)

    const handlePasswordChange =
        debounce((text) => {
            setPassword(text)
            setIsPasswordError(!(text.length > 7));
            if (text === passwordConfirm) {
                setIsPasswordConfirmError(false);
            }
        }, 400)

    const handlePasswordConfirmChange =
        debounce((text) => {
            setPasswordConfirm(text)
            setIsPasswordConfirmError(!(text === password));
        }, 500)

    const handleSubmit = () => {
        if (!isFormValid) {
            return;
        } else {
            setLoading(true)
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(userCredential.user)
                    Promise.all([
                        updateProfile(auth.currentUser, { displayName: name })
                            .then((userCredential) => {
                                // console.log(userCredential)
                            })
                            .catch((error) => {
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                console.log(errorCode, errorMessage);
                            }),
                        sendEmailVerification(auth.currentUser)
                            .catch((error) => {
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                console.error(errorCode, errorMessage);
                            })
                    ])
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            console.log(errorCode, errorMessage);
                        });
                })

                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    if (errorCode === 'auth/email-already-in-use') {
                        Alert.alert("Error", `Email ${email} already registered`, [
                            { text: 'Ok' },
                            //@ts-ignore
                            { text: 'Log in', onPress: () => navigation.navigate('auth/login/index') },
                        ])
                    } else {
                        Alert.alert("Error", `${errorCode}: ${errorMessage}`, [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ])
                    }
                })
                .finally(() => {
                    setLoading(false)
                });
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
            <Text style={[globalStyles.title]}>Registration</Text>
            <View style={style.form}>
                <TextInput
                    style={style.input}
                    aria-label="Your name"
                    placeholder="Name"
                    keyboardType="email-address"
                    textContentType='name'
                    onChangeText={handleNameChange}
                />
                {
                    isNameError && <Text style={{ color: globalTokens.colors.red }}>Add Name</Text>
                }
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
                    textContentType="newPassword"
                    onChangeText={handlePasswordChange}
                />
                {
                    isPasswordError && <Text style={{ color: globalTokens.colors.red }}>The password must contain at least 8 symbols</Text>
                }
                <TextInput
                    style={style.input}
                    aria-label="Confirm password"
                    placeholder="Confirm password"
                    secureTextEntry={true}
                    keyboardType="default"
                    textContentType="newPassword"
                    onChangeText={handlePasswordConfirmChange}
                />
                {
                    isPasswordConfirmError && <Text style={{ color: globalTokens.colors.red }}>Passwords mismatch</Text>
                }
                <Button onClick={handleSubmit} loading={loading} disabled={!isFormValid}>Register</Button>
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
