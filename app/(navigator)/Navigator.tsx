import { Stack, useNavigation } from "expo-router";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IStateInterface } from "../../src/store/store";
export default function Navigator() {
  const auth = useSelector(
    (state: IStateInterface) => state.authentication.isLogined
  );

  const navigation = useNavigation();

  useEffect(() => {
    if (auth != null && !auth) {
      navigation.navigate("auth/index", {});
    } else {
      navigation.navigate("index");
    }
  }, [navigation, auth]);

  const PrivateScreens = (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="places/[id]"
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="profile/index"
        options={{
          headerShown: true,
          headerTitle: "Profile",
          headerStyle: {
            backgroundColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="profile/settings/index"
        options={{
          headerShown: true,
          headerTitle: "Settings",
          headerStyle: {
            backgroundColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="test/index"
        options={{
          headerShown: true,
          headerTitle: "test",
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerBackVisible: false,
        }}
      />
    </Stack>
  );

  const LoginScreens = (
    <Stack>
      <Stack.Screen
        name="auth/index"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="auth/login/index"
      />

      <Stack.Screen
        name="auth/register/index"
      />

      <Stack.Screen
        name="auth/register/pending"
      />
    </Stack>
  );

  const screens = auth ? PrivateScreens : LoginScreens;

  return screens ;
}
