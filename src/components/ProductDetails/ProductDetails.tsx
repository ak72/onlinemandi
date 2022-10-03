import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {toTitleCase} from '../../assets/globals';
import {ITheme} from '../../assets/globals/theme';
import {IProduct} from '../../assets/interface';
import ProductDetailsAddRemoveToCartButton from './ProductDetailsAddRemoveToCartButton';

interface IProp {
  product: IProduct;
}
export default (props: IProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;

  const [value, setValue] = React.useState('one');
  const [currentSelection, setCurrentSelection] = React.useState(-1);
  // let _weight: string[] = [];

  const WeightPrice = props.product.units.map((unit, index) => {
    // _weight.push(unit.weight);
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => {
          setCurrentSelection(index);
          setValue(unit.weight);
        }}>
        <View
          key={index}
          style={{
            ...styles.weightPriceRow,
            borderColor: colors.border,
            backgroundColor:
              index == currentSelection
                ? colors.backgroundLL
                : colors.background,
          }}>
          <Text style={{fontSize: fontsize.body2, color: colors.text}}>
            {toTitleCase(unit.weight)} Kg
          </Text>
          <Text style={{fontSize: fontsize.body2, color: colors.text}}>
            Rs {unit.price}
          </Text>
          <View
            style={{
              ...styles.radio,
              backgroundColor:
                index == currentSelection ? colors.border : colors.background,
            }}></View>
        </View>
      </TouchableWithoutFeedback>
    );
  });
  return (
    <View style={styles.base}>
      <Text
        style={{
          ...styles.title,
          fontSize: fontsize.h6,
          color: colors.text,
        }}>
        Pack Sizes
      </Text>
      {WeightPrice}
      {/* <Text style={styles.price}>{prop.details.inOffer}</Text> */}
      <Text
        style={{...styles.title, fontSize: fontsize.h6, color: colors.text}}>
        Description
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{...styles.descText, fontSize: fontsize.body2}}>
          {props.product.desc}{' '}
        </Text>
      </ScrollView>
      <ProductDetailsAddRemoveToCartButton
        id={props.product.id}
        weight={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  weightPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,

    marginVertical: 5,
    marginHorizontal: 50,
  },
  title: {
    fontWeight: 'bold',
  },
  descText: {
    textAlign: 'justify',
  },

  price: {},
  radio: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    padding: 5,
  },
});
