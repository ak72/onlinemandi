import {RouteProp, useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {ITheme} from '../assets/globals/theme';
import ProductImages from '../components/ImageScoller';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import {HomeStackNavigatorParamList} from '../navigator/Stack/HomeStackNavigator';

interface StackRouteProp {
  route: RouteProp<HomeStackNavigatorParamList, 'ProductDetailScreen'>;
}

export default ({route}: StackRouteProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;

  const {product} = route.params;
  return (
    <>
      <Text
        style={{
          ...styles.heading,
          fontSize: fontsize.h5,
          backgroundColor: colors.backgroundL,
          color: colors.text,
        }}>
        {product.name.toUpperCase()}
      </Text>
      <ProductImages url={product.images_url} />
      <ProductDetails product={product} />
      {/* <ProductDetailsAddRemoveToCartButton id={product.id} /> */}
    </>
  );
};
const styles = StyleSheet.create({
  heading: {
    marginVertical: 5,
    padding: 5,

    fontWeight: 'bold',

    letterSpacing: 1.5,
  },
});
