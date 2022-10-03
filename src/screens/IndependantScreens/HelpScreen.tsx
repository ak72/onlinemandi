import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
export default () => {
  return (
    <View style={styles.base}>
      <Text>Hello</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
