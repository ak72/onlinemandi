import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Weight} from '../assets/globals';
import {ITheme} from '../assets/globals/theme';

interface IProp {
  changeModalVisiblity(param: boolean): void;
  setProductWeight(param: string): void;
  setWeightStock(param: boolean): void;
  units: {weight: string; price: number; inStock: boolean}[];
}

/* const WEIGHT = Weight;
const WEIGHTS = ['1kg', '500gms', '250gms', '100gms'];
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const optHeight = HEIGHT / 2; */
const ModalWeightPicker = (props: IProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;
  const onPressOptions = (data: string, stock_status: boolean) => {
    // console.log('Onpress option from modal picker working');
    props.changeModalVisiblity(false);
    props.setProductWeight(data);
    props.setWeightStock(stock_status);
  };
  //const weightOptions = WEIGHTS.map((wt, index) => {

  const weightOptions = props.units.map((unit, index) => {
    // console.log('Weights are ' + unit.weight + ' in stock ' + unit.inStock);
    return (
      <TouchableOpacity
        key={index}
        onPress={() => onPressOptions(unit.weight, unit.inStock)}
        style={{
          ...styles.optionsAreaInmodalPopUp,
          backgroundColor: colors.primary,
        }}>
        <Text style={{...styles.optionsText, color: colors.text}}>
          {Weight[unit.weight as keyof typeof Weight]}
        </Text>
      </TouchableOpacity>
    );
  });
  return (
    <TouchableOpacity
      onPress={() => props.changeModalVisiblity(false)}
      style={{...styles.modalPopUpbase, backgroundColor: colors.backgroundLL}}>
      {/* <View style={[styles.modal, {width: WIDTH - 20, height: HEIGHT / 2}]}>
          <ScrollView>{weightOptions}</ScrollView> */}
      <View style={styles.modalPopUp}>{weightOptions}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalPopUpbase: {
    //alignItems: 'center',
    justifyContent: 'center',
    // zIndex: 99,
    borderWidth: 2,
    height: 85,
    width: 100,
    borderRadius: 6,
    padding: 5,

    alignSelf: 'center',
  },
  modalPopUp: {
    //  borderRadius: 10,
    paddingVertical: 10,
    // width: 100,
    // height: 70,
    //color: '#fff',
  },
  optionsAreaInmodalPopUp: {
    //  alignItems: 'flex-start'
    // backgroundColor: '#f00',
    padding: 3,
    marginVertical: 1,
    borderRadius: 3,
  },
  optionsText: {
    // margin: 20,
    //  flexDirection: 'column',
    // fontSize: 22,
    fontWeight: '800',
    // borderWidth: 1,
    padding: 3,
  },
});

export {ModalWeightPicker};
