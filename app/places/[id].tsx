import React from 'react';
import { View, Text, SafeAreaViewBase, SafeAreaView } from 'react-native';
import {useLocalSearchParams} from 'expo-router'

export default function PlacePage() {
    const { id } = useLocalSearchParams()
  return (
    <SafeAreaView>
      <Text>Place page! {id}</Text>
    </SafeAreaView>
  );
}
