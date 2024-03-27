import { Link, useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, View, Text, Image } from 'react-native-ui-lib';
import { globalStyles, globalTokens } from '../../src/styles';
import { Button } from './../../src/components/Button/Button';
import auth from "@react-native-firebase/auth"
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
} from "@react-native-google-signin/google-signin";

export default function WelcomePage() {
    const navigation = useNavigation();
    const [error, setError] = React.useState<string | null>(null);
    const onLoginPress = () => {
        //@ts-ignore
        navigation.navigate('auth/login/index');
    };


    // const configureGoogleSignIn = () => {
    //     GoogleSignin.configure({
    //         webClientId: "1076432211496-f93a4j5ofqda6l3vbcq0eq4rrqo1tb0s.apps.googleusercontent.com",
    //         iosClientId: "1076432211496-a5kbtfng4f3sje3f82chpom0tli632qi.apps.googleusercontent.com",
    //     })
    // };

    // useEffect(() => {
    //     configureGoogleSignIn()
    // });

    // const signin = async () => {
    //     console.log("click")
    //     const { idToken } = await GoogleSignin.signIn();
    //     const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    //     const user_sign_in = auth().signInWithCredential(googleCredential)

    //     user_sign_in.then((user) => {
    //         console.log(user)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }

    // GoogleSignin.configure({
    //     webClientId: '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', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
    //     scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    //     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    //     hostedDomain: '', // specifies a hosted domain restriction
    //     forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.taken from GoogleService-Info.plist)
    //     googleServicePlistPath: './../../ios/FavsbestplacesinEurope/GoogleService-Info.plist', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    //     profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    //   });

    const onRegisterPress = () => {
        //@ts-ignore
        navigation.navigate('auth/register/index');
    };

    // const signIn = async () => {
    //     try {
    //       await GoogleSignin.hasPlayServices();
    //       const userInfo = await GoogleSignin.signIn();
    //       console.log({ userInfo, error: undefined });
    //     } catch (error) {
    //       if (error) {
    //         switch (error.code) {
    //           case statusCodes.SIGN_IN_CANCELLED:
    //             // user cancelled the login flow
    //             break;
    //           case statusCodes.IN_PROGRESS:
    //             // operation (eg. sign in) already in progress
    //             break;
    //           case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
    //             // play services not available or outdated
    //             break;
    //           default:
    //           // some other error happened
    //         }
    //       } else {
    //         // an error that's not related to google sign in occurred
    //       }
    //     }
    //   };

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
                {/* <GoogleSigninButton
                    size={GoogleSigninButton.Size.Standard}
                    color={GoogleSigninButton.Color.Light}
                    onPress={signin}
                /> */}
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
