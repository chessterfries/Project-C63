import React, { Component } from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <View>
      <AppContainer />
    </View>
  );
}

var AppNavigator = createSwitchNavigator({
  HomeScreen: HomeScreen,
});

const AppContainer = createAppContainer(AppNavigator);  