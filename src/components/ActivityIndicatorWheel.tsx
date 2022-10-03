import {useTheme} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {ITheme} from '../assets/globals/theme';

/*interface IProp {
  wheelcolor?: string;
}*/
//export default ({wheelcolor = '#007C7C'}: IProp) => {
export default () => {
  const {colors} = useTheme() as unknown as ITheme;

  return (
    <View style={styles.base}>
      <ActivityIndicator
        size={'large'}
        accessibilityLabel="Loading indicator"
        color={colors.loader}
        style={styles.indicator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    // alignSelf: 'center',
    // backgroundColor: '#f00',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  indicator: {
    flex: 1,
  },
});
