import * as React from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class AppHeader extends React.Component {
  render() {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.text}>Dictionary App</Text>
      </View>
    )
  }
}

export default AppHeader;

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: 'purple',
  },
  text: {
    color: 'white',
    padding: 20,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});