import { View, Text, TextProps } from 'react-native'
import {TextProps as TextPropsUI} from "react-native-ui-lib";
import React from 'react'
import { useFonts } from 'expo-font';

type TProps = TextProps & TextPropsUI & {
  children?: any,
}

export const CustomText: React.FC<TProps> = ({children, style, ...other}) => {

  const combinedStyles = [style, { fontFamily: 'Archivo' }];

  return (
      <Text style={combinedStyles} {...other}>{children}</Text>
  )
}

export const CustomTitle: React.FC<TProps> = ({children, style, ...other}) => {

  const combinedStyles = [style, { fontFamily: 'ClashDisplay' }];

  return (
      <Text style={combinedStyles} {...other}>{children}</Text>
  )
}
