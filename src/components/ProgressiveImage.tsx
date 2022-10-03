import React, {useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';

export default () => {
  const [imgLoading, setImgLoading] = useState(false);
  const onLoading = (value: boolean, _label: string) => {
    console.log(value);
    setImgLoading(value);
  };
  return (
    imgLoading && (
      <View>
        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            //alignContent: 'center',
            //alignItems: 'center',
            zIndex: 0,
            width: 600,
            position: 'absolute',
            //top: 0,
            //left: 0,
            //bottom: 0,
            // right: 0,
            height: 300,
            backgroundColor: '#0ff',
          }}>
          <ActivityIndicator color="red" />
        </View>
        <Image
          //source={{uri: 'http://etcetera.ai/assets/native/images/banner.jpg'}}
          source={{uri: 'http://localhost/assets/native/images/banner.jpg'}}
          resizeMode="cover"
          style={styles.img}
          onLoadStart={() => {
            onLoading(true, 'onLoadStart');
          }}
          onLoadEnd={() => {
            onLoading(false, 'onLoadStart');
          }}
        />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  img: {
    width: 600,
    height: 300,
    //backgroundColor: '#0f0',
  },
});
