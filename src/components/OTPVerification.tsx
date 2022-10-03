import React, {useEffect, useRef, useState} from 'react';
import {TextInput, StyleSheet, Text, View, Alert, Keyboard} from 'react-native';
import {ITheme} from '../assets/globals/theme';
import {useTheme} from '@react-navigation/native';
import {Button} from '@rneui/themed';
import {fetchFBUserByID} from '../assets/redux/slices/rest/auth/fbUserByIDSlice';
import {fbUserPutRTDb} from '../assets/redux/slices/rest/crud/fbUserPutRTDb';
import {ICfbUserMap} from '../assets/globals';
import ActivityIndicatorWheel from './ActivityIndicatorWheel';
import {store} from '../assets/redux/store/store';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerNavigatorParamList} from '../navigator/Drawer/DrawerNavigator';

interface IProp {
  fbAuthResultprop: any | null;
  setfbAuthResultprop: (param: any | null) => void;
  phoneNumber: string;
  navigation: DrawerNavigationProp<DrawerNavigatorParamList>;
}
export default ({
  fbAuthResultprop,
  phoneNumber,
  navigation,
  setfbAuthResultprop,
}: IProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [codeError, setCodeError] = useState('');
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const input1 = useRef() as React.MutableRefObject<TextInput>;
  const input2 = useRef() as React.MutableRefObject<TextInput>;
  const input3 = useRef() as React.MutableRefObject<TextInput>;
  const input4 = useRef() as React.MutableRefObject<TextInput>;
  const input5 = useRef() as React.MutableRefObject<TextInput>;
  const input6 = useRef() as React.MutableRefObject<TextInput>;

  const [digit1, setDigit1] = useState('');
  const [digit2, setDigit2] = useState('');
  const [digit3, setDigit3] = useState('');

  const [digit4, setDigit4] = useState('');
  const [digit5, setDigit5] = useState('');
  const [digit6, setDigit6] = useState('');

  // If null, no SMS has been sent
  // const [fbAuthResult, setfbAuthResult] = useState<any | null>(null);
  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Error', errorMessage, [{text: 'Okay'}]);
      return;
    }

    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //  return subscriber; // unsubscribe on unmount
  }, [errorMessage]);

  const confirmCode = async () => {
    Keyboard.dismiss();
    codeError && setCodeError('');
    setVerifyingCode(true);
    setCode(digit1 + digit2 + digit3 + digit4 + digit5 + digit6);
    //console.log(code);

    try {
      // const response = await fbAuthResult?.confirm(code);
      const response = await fbAuthResultprop?.confirm(code);
      setCode('');
      setDigit1('');
      setDigit2('');
      setDigit3('');
      setDigit4('');
      setDigit5('');
      setDigit6('');

      //console.log((await a)?.?.claims.exp);
      if (response) {
        // const idTokenResult = await response.user.getIdTokenResult();
        // const idToken = (await response.user.getIdTokenResult()).token;
        // const uid = await response.user.getIdToken();

        if (response.additionalUserInfo?.isNewUser) {
          //createdatabase by fbNewSignupUserRTDbSlice
          try {
            fbUserPutRTDb(
              {
                user: {
                  ...ICfbUserMap,
                  mobile: parseInt(phoneNumber),
                  localId: response.user.uid,
                },
              },
              // localId: `${response.user.uid}.json?auth=${ab}`,
            );
          } catch (error: any) {
            setVerifyingCode(false);
            setErrorMessage(error.message);
          }
        }

        //next load database by fbUserByIDSlice
        try {
          response &&
            (await store.dispatch(
              //fetchFBUserByID(`${response.user.uid.toString()}?auth=${ab}`),
              fetchFBUserByID(response.user.uid.toString()),
            ),
            navigation.navigate('AppBottomTabNavigator'));
        } catch (error: any) {
          //can create new/update corrupt database if required
          setVerifyingCode(false);
          setErrorMessage(error.message);
        }
      }
    } catch (error: any) {
      /**auth/unknown
       * auth/invalid-verification-code
       * auth/missing-verification-code
       */
      let message = 'Invalid or Expired code';
      if (error.code == 'auth/invalid-verification-code') {
        message == 'Invalid Verification Code';
      } else if (error.code == 'auth/missing-verification-code') {
        message == 'Missing Verification Code';
      } else {
      }
      setCodeError(message);
      setVerifyingCode(false);
      console.log(message);
    }
  };

  return (
    <>
      <View style={{...styles.otpBase, borderColor: colors.border}}>
        {/* <View style={{top: 30, left: 30, flex: 0.4, position: 'absolute'}}> */}
        <View
          style={{
            //  justifyContent: 'flex-start',
            // alignItems: 'flex-start',
            paddingLeft: 30,
            // backgroundColor: '#f00',
          }}>
          {codeError ? (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  ...styles.codeErrorText,
                  // color: colors.error,
                  fontSize: fontsize.body2,
                }}>
                {codeError}
              </Text>
              <Text
                style={{
                  ...styles.codeErrorText,
                  color: colors.text,
                  fontSize: fontsize.body2,
                }}>
                Try again
              </Text>
            </View>
          ) : (
            <>
              <Text style={{color: '#88bf40', fontSize: 18, fontWeight: '600'}}>
                OTP Verification
              </Text>
              <Text style={{color: '#000000', fontSize: 14, fontWeight: '600'}}>
                Four digit OTP sent on mobile number {`+91 ${phoneNumber}`}
              </Text>
            </>
          )}
        </View>
        <View
          style={{
            //  backgroundColor: '#0f0',
            justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <View style={{...styles.otpBox, borderColor: colors.border}}>
            <TextInput
              style={{...styles.otpNumbers, color: colors.text}}
              keyboardType={'numeric'}
              maxLength={1}
              blurOnSubmit={false}
              returnKeyType="next"
              value={digit1}
              ref={input1}
              onKeyPress={({nativeEvent: {key: keyValue}}) => {
                if (keyValue === 'Backspace') {
                  input1.current.focus();
                }
              }}
              onChangeText={text => {
                setDigit1(text);
                text.length === 1 && input2.current.focus();
                console.log(digit1);
              }}
              autoFocus={true}></TextInput>
            <TextInput
              keyboardType={'numeric'}
              maxLength={1}
              blurOnSubmit={false}
              returnKeyType="next"
              value={digit2}
              onKeyPress={({nativeEvent: {key: keyValue}}) => {
                if (keyValue === 'Backspace') {
                  input1.current.focus();
                }
              }}
              onChangeText={text => {
                setDigit2(text);
                text.length === 1 && input3.current.focus();
                console.log(digit2);
              }}
              ref={input2}
              style={{...styles.otpNumbers, color: colors.text}}></TextInput>
            <TextInput
              keyboardType={'numeric'}
              maxLength={1}
              blurOnSubmit={false}
              returnKeyType="next"
              onKeyPress={({nativeEvent: {key: keyValue}}) => {
                if (keyValue === 'Backspace') {
                  input2.current.focus();
                }
              }}
              value={digit3}
              onChangeText={text => {
                setDigit3(text);
                text.length === 1 && input4.current.focus();
                console.log(digit3);
              }}
              ref={input3}
              style={{...styles.otpNumbers, color: colors.text}}></TextInput>
            <TextInput
              keyboardType={'numeric'}
              maxLength={1}
              onKeyPress={({nativeEvent: {key: keyValue}}) => {
                if (keyValue === 'Backspace') {
                  input3.current.focus();
                }
              }}
              value={digit4}
              onChangeText={text => {
                setDigit4(text);
                text.length === 1 && input5.current.focus();
                console.log(digit4);
              }}
              ref={input4}
              style={{...styles.otpNumbers, color: colors.text}}></TextInput>
            <TextInput
              keyboardType={'numeric'}
              maxLength={1}
              onKeyPress={({nativeEvent: {key: keyValue}}) => {
                if (keyValue === 'Backspace') {
                  input4.current.focus();
                }
              }}
              value={digit5}
              onChangeText={text => {
                setDigit5(text);
                text.length === 1 && input6.current.focus();
                console.log(digit5);
              }}
              ref={input5}
              style={{...styles.otpNumbers, color: colors.text}}></TextInput>
            <TextInput
              keyboardType={'numeric'}
              maxLength={1}
              onChangeText={text => {
                setDigit6(text);
                console.log(digit6);
              }}
              onKeyPress={({nativeEvent: {key: keyValue}}) => {
                if (keyValue === 'Backspace') {
                  input5.current.focus();
                }
              }}
              value={digit6}
              ref={input6}
              style={{...styles.otpNumbers, color: colors.text}}></TextInput>
          </View>
        </View>
        <View>
          <View style={styles.buttonBase}>
            <Button
              type="solid"
              disabled={
                digit1.length == 1 &&
                digit2.length == 1 &&
                digit3.length == 1 &&
                digit4.length == 1 &&
                digit5.length == 1 &&
                digit6.length == 1
                  ? false
                  : true
              }
              titleStyle={{fontSize: fontsize.buttonsmall}}
              containerStyle={{width: 100, borderRadius: 10}}
              title={codeError ? 'Retry' : 'Submit'}
              onPress={() => confirmCode()}
            />
            <View style={styles.space_horizontal} />
            <Button
              type="outline"
              title="Cancel"
              buttonStyle={{}}
              containerStyle={{width: 100, borderRadius: 10}}
              titleStyle={{fontSize: fontsize.buttonsmall}}
              onPress={() => {
                //props.onContinue(true);
                // setfbAuthResult(false);
                Keyboard.dismiss();
                setfbAuthResultprop(false);
                // setPhoneNumber('');
                setCode('');
                setDigit1('');
                setDigit2('');
                setDigit3('');
                setDigit4('');
                setDigit5('');
                setDigit6('');
                setVerifyingCode(false);
              }}
            />
          </View>
        </View>
      </View>
      {verifyingCode && (
        <View
          style={{
            ...styles.indicatorWheel,
            backgroundColor: colors.background,
          }}>
          <ActivityIndicatorWheel />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  otpBase: {
    //marginHorizontal: 50,
    flex: 1,
    paddingVertical: 10,
    // flexDirection: 'column',
    //    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    // padding: 50,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    // backgroundColor: '#000',
  },
  otpBox: {
    /*  borderWidth: 1,
     marginBottom: 30,
    width: 100,
    alignSelf: 'center',*/
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 50,
    // marginBottom: 30,
    //backgroundColor: '#fff',
    // paddingVertical: 10,
  },
  otpNumbers: {
    // backgroundColor: '#f5f4f2',
    textAlign: 'center',
    borderColor: 'grey',
    color: 'grey',
    fontWeight: '600',
    alignItems: 'center',
    fontSize: 20,
    height: 60,
    width: '15%',
    borderRadius: 10,
    borderWidth: 0.5,
    marginVertical: 15,
  },
  space_horizontal: {
    width: 50,
    height: 20,
  },
  codeErrorText: {
    //fontStyle: 'italic',
    fontWeight: '800',
    //alignSelf: 'center',
    //marginTop: 30,
  },
  buttonBase: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorWheel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    opacity: 0.6,
  },
});
