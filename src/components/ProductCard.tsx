import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from '@rneui/themed';
import {IProduct} from '../assets/interface';
import {toTitleCase} from '../assets/globals';
import {ITheme, screen_width} from '../assets/globals/theme';
import {useTheme} from '@react-navigation/native';

interface IProp {
  item: IProduct;
}
export default ({item}: IProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;

  const _screenWidth = screen_width * 0.8;
  return (
    <TouchableOpacity style={{position: 'relative'}}>
      <View
        style={{
          ...styles.cardView,
          borderColor: colors.border,
          width: _screenWidth,
        }}>
        <Image
          style={{...styles.img, width: _screenWidth}}
          source={{
            uri: item.image_url,
          }}
        />
        <View>
          <View>
            <Text
              style={{
                ...styles.productName,
                fontSize: fontsize.body2,
                color: colors.text,
              }}>
              {toTitleCase(item.name)}
            </Text>
          </View>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{...styles.distance, borderRightColor: colors.border}}>
              <Icon
                type="material-community"
                name="marker"
                size={fontsize.iconsmall}
                color={colors.icon}
                iconStyle={{marginTop: 3}}
              />
              <Text
                style={{
                  ...styles.minute,
                  fontSize: fontsize.small,
                  color: colors.text,
                }}>
                dynamic data
              </Text>
            </View>

            <View style={{flex: 9, flexDirection: 'row'}}>
              <Text
                style={{
                  ...styles.address,
                  fontSize: fontsize.small,
                  color: colors.text,
                }}>
                Some data
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.rating}>
        <Text
          style={{
            ...styles.ratingText,
            color: colors.text,
            fontSize: fontsize.h5,
          }}>
          4.2
        </Text>
        <Text
          style={{
            ...styles.reviewsText,
            color: colors.text,
            fontSize: fontsize.body2,
          }}>
          299 review
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardView: {
    marginHorizontal: 9,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderWidth: 1,

    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingBottom: 6,
  },
  img: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 175,
    resizeMode: 'contain',
  },
  productName: {
    fontWeight: 'bold',

    marginTop: 5,
    marginLeft: 10,
  },
  distance: {
    flex: 4,
    flexDirection: 'row',

    paddingHorizontal: 5,
    borderRightWidth: 1,
  },
  minute: {
    fontWeight: 'bold',
    paddingTop: 5,
  },
  address: {
    paddingTop: 5,

    paddingHorizontal: 10,
  },
  rating: {
    position: 'absolute',
    top: 0,
    right: 10,
    backgroundColor: 'rgba(52,52,52,0.3)',
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 12,
  },
  ratingText: {
    fontWeight: 'bold',
    marginTop: -3,
  },
  reviewsText: {
    marginRight: 0,
    marginLeft: 0,
  },
});
