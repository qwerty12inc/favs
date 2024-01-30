import React, { useState } from 'react';
import {Link} from "expo-router"
import {StyleSheet, Text, SafeAreaView } from 'react-native';
import {Avatar, View, Picker, ModalProps} from "react-native-ui-lib"

export default function Layout() {

  const options = [
    {label: 'Moscow', value: 'Moscow'},
    {label: 'Milan', value: 'Milan'},
    {label: 'Amsterdam', value: 'Amsterdam'},
    {label: 'Berlin', value: 'Berlin'}
  ];

  const [language, setLanguage] = useState<any>(null)

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.userProfile}>
        <SafeAreaView>
          <Picker
              placeholder="Choose city"
              value={language}
              onChange={items => setLanguage(items)}
              mode={Picker.modes.SINGLE}
              // trailingAccessory={dropdownIcon}
              fieldType='filter'
              topBarProps={{containerStyle: {marginTop: 60}}}
              pickerModalProps={{ containerStyle: {margin: 60, padding: 100, height: 200}, animationType: "slide" }}
            >
              {options.map(option => (
                <Picker.Item key={option.value} value={option.value} label={option.label}/>
              ))}
          </Picker>
        </SafeAreaView>
        <Avatar
          containerStyle={styles.userAvatar}
          source={{uri: 'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg'}} 
          label={'it'}
        />
      </SafeAreaView>
      <SafeAreaView >
          <Link
            href={"/places/1"}
          >
            Go to user
          </Link>
        </SafeAreaView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "#f5f5f7",
    display: "flex",
  },
  userProfile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#f0f0f0",
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  userAvatar: {
    marginLeft: "auto"
  },
  padding : {
    marginTop: 100
  }
});
