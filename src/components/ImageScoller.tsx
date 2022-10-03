import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

interface IProp {
  url: string[];
}
type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;
const {width} = Dimensions.get('window');
const height = width * 0.6; //60%
export default (props: IProp) => {
  const [active, setActive] = useState(0);
  const onScollChange: OnScrollEventHandler = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide != active) {
      setActive(slide);
    }
  };

  /*  const setIntervalLimited = (
    callback: Function,
    interval: number,
    x: number,
  ) => {
    for (var i = 0; i < x; i++) {
      setTimeout(callback(), i * interval);
    }
  };

  // Usage
  setIntervalLimited(
    function () {
      console.log('hit'); // => hit...hit...etc (every second, stops after 10)
    },
    5000,
    500,
  ); */

  const ProductsImages = props.url.map((imageURL, index) => {
    return <Image key={index} source={{uri: imageURL}} style={styles.img} />;
  });
  return (
    <View style={styles.base}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={event => {
          onScollChange(event);
        }}
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}>
        {ProductsImages}
      </ScrollView>
      <View style={styles.paginationBase}>
        {props.url.map((_i, k) => (
          <Text
            key={k}
            style={
              k == active ? styles.paginationActiveDot : styles.paginationDot
            }>
            &#11044;
          </Text>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  base: {
    marginTop: 5,
    width,
    height,
  },
  contentContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    //  backgroundColor: 'lightgrey',
    //  paddingBottom: 50,
  },
  scroll: {
    width,
    height,
  },
  img: {
    width,
    height,
    resizeMode: 'cover',
  },
  paginationBase: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  paginationDot: {
    fontSize: width / 30,
    color: '#888',
    margin: 3,
  },
  paginationActiveDot: {
    fontSize: width / 30,
    color: '#fff',
    margin: 3,
  },
});
