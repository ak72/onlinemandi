import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

export default () => {
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, _setMaxRating] = useState([1, 2, 3, 4, 5]);
  const starImageCorner =
    'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';
  const starImageFilled =
    'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarBase}>
        {maxRating.map((item, _key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => {
                setDefaultRating(item);
              }}>
              <Image
                source={
                  item <= defaultRating
                    ? {uri: starImageFilled}
                    : {uri: starImageCorner}
                }
                style={styles.starImgStyle}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return <CustomRatingBar />;
};

const styles = StyleSheet.create({
  customRatingBarBase: {flexDirection: 'row', justifyContent: 'center'},
  starImgStyle: {width: 20, height: 20, resizeMode: 'cover'},
});
