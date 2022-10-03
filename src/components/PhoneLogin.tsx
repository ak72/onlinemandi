import React, {useEffect, useState} from 'react';
import {TextInput, StyleSheet, Text, View, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerNavigatorParamList} from '../navigator/Drawer/DrawerNavigator';
import {ITheme} from '../assets/globals/theme';
import {useTheme} from '@react-navigation/native';
import {Button} from '@rneui/themed';
import OTPVerification from './OTPVerification';
import ActivityIndicatorWheel from './ActivityIndicatorWheel';

interface IProp {
  navigation: DrawerNavigationProp<DrawerNavigatorParamList>;
}
export default (props: IProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fbAuthResult, setfbAuthResult] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [invalidNumber, setInvalidNumber] = useState(true);
  const [gettingOTP, setGettingOTP] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Error', errorMessage, [{text: 'Okay'}]);
      return;
    }
  }, [errorMessage]);

  // Handle the button press
  const signInWithPhoneNumber = async (_phoneNumber: string) => {
    setGettingOTP(true);
    console.log('Phone number is ' + _phoneNumber);
    try {
      const result = await auth().signInWithPhoneNumber(_phoneNumber);
      setGettingOTP(false);
      setfbAuthResult(result);
      //  props.onContinue(false);
    } catch (error) {
      console.log(error);
      setGettingOTP(false);
      setErrorMessage('Something went wrong');
    }
  };

  const validatePhoneNumber = (number: string) => {
    var regexp = /^\d+$/;
    const result: boolean = regexp.test(number);
    console.log('result', result);
    if (!result || number.length < 10) {
      // console.log('This key cannot be in used');
      setInvalidNumber(true);
    } else {
      setInvalidNumber(false);
    }
    setPhoneNumber(number);
  };

  return !fbAuthResult ? (
    <View style={styles.root}>
      <View style={styles.phoneLoginBase}>
        <Text
          style={{
            ...styles.headerText,
            fontSize: fontsize.h6,
            color: colors.text,
          }}>
          Sign in to continue using mobile number
        </Text>
        <View style={styles.inputBase}>
          <TextInput
            maxLength={10}
            keyboardType="phone-pad"
            placeholder={'Enter 10 digit mobile no'}
            placeholderTextColor={colors.placeholder}
            underlineColorAndroid={'transparent'}
            style={{
              ...styles.numberInput,
              borderBottomColor: colors.border,
              color: colors.text,
            }}
            onChangeText={number => {
              validatePhoneNumber(number);
            }}
          />

          {invalidNumber ? (
            <Text
              style={{
                fontSize: fontsize.small,
                fontStyle: 'italic',
                color: colors.text,
              }}>
              Provide valid number
            </Text>
          ) : (
            <Text
              style={{
                fontSize: fontsize.small,
                color: colors.background,
              }}>
              n
            </Text>
          )}
          <Button
            type="solid"
            disabled={invalidNumber}
            title="Get OTP"
            containerStyle={{marginTop: 20, borderRadius: 10}}
            onPress={() =>
              !invalidNumber && signInWithPhoneNumber(`+91${phoneNumber}`)
            }
          />
        </View>
      </View>
      {gettingOTP && (
        <View style={styles.indicatorWheel}>
          <ActivityIndicatorWheel />
        </View>
      )}
    </View>
  ) : (
    <OTPVerification
      {...props}
      fbAuthResultprop={fbAuthResult}
      phoneNumber={phoneNumber}
      setfbAuthResultprop={p => setfbAuthResult(p)}
    />
  );
  // }
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  phoneLoginBase: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  headerText: {
    fontWeight: '500',
  },
  inputBase: {
    width: 300,
  },
  numberInput: {
    borderBottomWidth: 2,
    marginBottom: 10,
    width: '100%',
  },
  indicatorWheel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    //backgroundColor: '#f00',
  },
});
