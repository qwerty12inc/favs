import React, { useCallback } from "react";
import { StyleSheet, ScrollView, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, View, Text, Image } from "react-native-ui-lib";
import HistoryList from "../../src/components/HistoryList/HistoryList";
import { globalStyles, globalTokens } from "../../src/styles";
import CurrentSubscription from "../../src/components/CurrentSubscription/CurrentSubscription";
import { CustomText, CustomTitle } from "../../src/components/Text/CustomText";
import useAuth from "../../src/utils/auth";
import { Button } from "../../src/components/Button/Button";
import { signOut } from "firebase/auth";
import { auth } from "../../src/utils/firebase";
import Banner from "../../src/components/Banner/Banner";
import BannerSlider from "../../src/components/Banner/BannerSlider";
import { useDispatch, useSelector } from "react-redux";
import { resetAuthentication } from "../../src/store/features/isAuthSlice";
import { IStateInterface } from "../../src/store/store";
import { useRouter } from "expo-router";

const profileDefaultAvatar = require("./../../assets/icons/user.png");

const { width, height } = Dimensions.get("window");


export default function ProfilePage() {
  // const { user } = useAuth()
  const { isLogined, authData } = useSelector((state: IStateInterface) => state.authentication);

  const dispatch = useDispatch();
  const router = useRouter()

  const profileAvatar = authData?.photoURL ? { uri: authData?.photoURL } : profileDefaultAvatar;

  const didLogoutClicked = useCallback(() => {
    signOut(auth)
      .then(() => {
        console.info('logout')
        router.navigate('/')
        dispatch(resetAuthentication())
      })
      .catch((e) => (console.info('logout error: ', e)))
  },[])

  const didEnterClicked = useCallback(() => {
      router.navigate('auth/welcome')
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ height: height - 100 }}>
        {!authData &&
          <>
            <View style={{ paddingHorizontal: 16, display: "flex", gap: 8, marginTop: 0 }}>
              <Text Text style={globalStyles.subtitle}>
                Keep logged in Favs!
              </Text>
            </View>
            <BannerSlider>
              <Banner
                    title='Enter FAVS'
                    description='Login to Favs to get access to special features'
                    size="large"
                    onClick={didEnterClicked}
              />
            </BannerSlider>
          </>
        }
        {authData &&
          <View style={{ paddingHorizontal: 16, display: "flex", alignItems: "center" }}>
            <Image
              width={125}
              height={125}
              source={profileAvatar}
              style={{ borderRadius: 125 / 2 }}
            />
            <CustomTitle style={[globalStyles.title, { marginTop: 16 }]}>
              {authData?.displayName ? authData?.displayName : "–"}
            </CustomTitle>
            <CustomText>{authData?.email ? authData?.email : "–"}</CustomText>
          </View>
        }
        <View style={{ paddingHorizontal: 16, display: "flex", gap: 8, marginTop: 45 }}>
          <Text Text style={globalStyles.subtitle}>
            Support project
          </Text>
        </View>
        <BannerSlider>
          <Banner
                title='What is Favs?'
                description='Learn more'
                link='https://favs.website'
          />
          <Banner
            title='Amsterdam'
            description='Donate to Author of our Amsterdam`s places list '
            link={`https://favsapp.gumroad.com/l/Lerasguide`}
            backgroundColor='#000'
            darkBackground
            size="large"
          />
          <Banner
            title='Milan'
            description='Donate to Author of our Milan`s places list'
            link={`https://favsapp.gumroad.com/l/hgpkc`}
            backgroundColor='#000'
            darkBackground
            size="large"
          />
        </BannerSlider>
        <View style={{ paddingHorizontal: 16, display: "flex", gap: 8, marginBottom: 45, height: 100, justifyContent: 'flex-end' }}>
          {/* <Text Text style={globalStyles.subtitle}>
            Support project
          </Text> */}
          {/* <Text Text style={globalStyles.subtitle}>
            Your subscription
          </Text>
          <CurrentSubscription /> */}
          {/* <Text style={globalStyles.subtitle}>History</Text>
          <HistoryList /> */}
          {authData &&
            <Button onClick={didLogoutClicked} type="secondary">Logout</Button>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    // backgroundColor: globalTokens.colors.white,
  },
  list: {
    marginTop: 24,
    backgroundColor: globalTokens.colors.lightGrey,
    paddingLeft: 16,
    paddingBottom: 4,
    paddingTop: 7,
    borderRadius: 16,
  },
});
