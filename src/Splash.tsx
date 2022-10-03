import {ImageBackground, StyleSheet, View} from 'react-native';

export default () => {
  return (
    <View style={styles.base}>
      <ImageBackground
        source={{uri: 'http://etcetera.ai/assets/native/images/splash.png'}}
        style={styles.img}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  img: {
    width: 500,
    height: 800,
    resizeMode: 'cover',
  },
});
