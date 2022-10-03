import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useTheme} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Keyboard,
  Alert,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  ISignupORLoginPOSTData,
  ISignupUserCallbackData,
  IUserProfile,
} from '../../assets/interface';
import {fbSignupUser} from '../../assets/redux/slices/rest/auth/fbSignupUserPost';
import {fetchFBUserByID} from '../../assets/redux/slices/rest/auth/fbUserByIDSlice';
import {fbUserPutRTDb} from '../../assets/redux/slices/rest/crud/fbUserPutRTDb';
import {RootState, store} from '../../assets/redux/store/store';
import {Icon} from '@rneui/themed';
import ActivityIndicatorWheel from '../../components/ActivityIndicatorWheel';
import {DrawerNavigatorParamList} from '../../navigator/Drawer/DrawerNavigator';
import {AuthStackParamList} from '../../navigator/Stack/AuthStackNavigator';
import {ITheme} from '../../assets/globals/theme';

type NavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<AuthStackParamList, 'SignupScreen'>,
  DrawerNavigationProp<DrawerNavigatorParamList>
>;
interface IProp {
  navigation: NavigationProps;
}
export default ({navigation}: IProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;

  const _user = useSelector(
    (state: RootState) => state.fbUserByIDReducerOfStore,
  );
  const [userDetail, setUserDetail] = useState({
    first_name: '',
    last_name: '',
    email: '',
    city: '',
    image_url: '',
    mobile: 0,
  });
  /*  const [fName, setFname] = useState('');
  const [lName, setLname] = useState('');
  const [mNumber, setMnumber] = useState<number>();
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');*/
  const [password, setPassword] = useState('');
  const [cPassword, setCpassword] = useState('');

  const [fNameError, setFnameError] = useState(false);
  const [lNameError, setLnameError] = useState(false);
  const [mNumberError, setMnumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [cPasswordError, setCpasswordError] = useState(false);

  const [emailErrorText, setEmailErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const emailCheckRegEx = true;
  const [allDone, setAllDone] = useState(false);
  const [eyeToggle, setEyeToggle] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Error', errorMessage, [{text: 'Ok'}]);
      return;
    }
    if (_user.isLoggedIn) {
      navigation.navigate('AppBottomTabNavigator');
    }
  }, [errorMessage, allDone]);
  const resetFields = () => {
    /*   setFname('');
    setLname('');
    setMnumber(0);
    setEmail('');
    setCity('');
    setPassword('');
    setCpassword(''); */
  };
  const errorCheck = () => {
    // if (fName == '') {
    if (userDetail.first_name == '') {
      setFnameError(true);
      return false;
    } else {
      setFnameError(false);
    }
    // if (lName == '') {
    if (userDetail.last_name == '') {
      setLnameError(true);
      return false;
    } else {
      setLnameError(false);
    }
    // if (mNumber?.toString() == '') {
    if (userDetail.mobile?.toString() == '') {
      setMnumberError(true);
      return false;
    } else {
      setMnumberError(false);
    }
    // if (email == '') {
    if (userDetail.email == '') {
      setEmailErrorText('Please enter your email');
      setEmailError(true);
      return false;
    } else if (!emailCheckRegEx) {
      setEmailErrorText('Does not appear to be valid email');
      setEmailError(true);
      return false;
    } else {
      setEmailError(false);
    }

    //  if (city == '') {
    if (userDetail.city == '') {
      setCityError(true);
      return false;
    } else {
      setCityError(false);
    }
    if (password == '') {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
    }
    if (cPassword == '') {
      setPasswordErrorText('Confirm your password');
      setCpasswordError(true);
      return false;
    } else {
      setPasswordErrorText('');
      setCpasswordError(false);
    }
    if (password !== cPassword) {
      setPasswordErrorText('Password does not match');
      setCpasswordError(true);
      return false;
    } else {
      setCpasswordError(false);
    }

    Keyboard.dismiss();
    return true;
  };
  const toggleEyeIcon = () => {
    setEyeToggle(!eyeToggle);
  };
  const onSubmitPressed = async () => {
    if (errorCheck()) {
      setIsLoading(true);
      const signupUserCredentials: ISignupORLoginPOSTData = {
        email: userDetail.email,
        password: password,
      };
      try {
        fbSignupUser(signupUserCredentials)
          .then(async (data: ISignupUserCallbackData) => {
            console.log('inside dispatch(fbSignupUser(signupUserCredentials))');
            console.log(data);
            const user: IUserProfile = {
              first_name: userDetail.first_name,
              last_name: userDetail.last_name,
              email: data.email,
              city: userDetail.city,
              image_url:
                'http://www.etcetera.ai/assets/native/images/splash.png',
              mobile: userDetail.mobile,
            };
            fbUserPutRTDb({
              data: {...user, localId: data.localId},
              url: data.localId,
            })
              .then(async (_rtdb: any) => {
                store
                  .dispatch(fetchFBUserByID(data.localId))
                  .then(async (_loggedUserData: any) => {
                    resetFields();
                    setAllDone(true);
                  })
                  .catch((error: any) => {
                    setIsLoading(false);
                    setErrorMessage(error.message);
                  });
                console.log('Completed dispatch of fbNewSignedUserRTDb');
              })
              .catch((error: any) => {
                setIsLoading(false);
                setErrorMessage(error.message);
              });
          })
          .catch((error: any) => {
            setIsLoading(false);
            setErrorMessage(error.message);
          });
      } catch (error: any) {
        setIsLoading(false);
        setErrorMessage(error.message);
      }
    }
  };
  return (
    <>
      {isLoading && (
        <View style={styles.indicatorWheel}>
          <ActivityIndicatorWheel />
        </View>
      )}
      <View style={styles.formBase}>
        <View style={styles.header}>
          <Text
            style={{
              color: colors.text,
              fontSize: fontsize.h5,
              fontWeight: 'bold',
              marginBottom: 7,
            }}>
            Sign-up
          </Text>
          <Text style={{color: colors.text, fontSize: fontsize.h6}}>
            New on App4rge?
          </Text>
        </View>

        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          <View>
            <Text style={{color: colors.background, fontSize: fontsize.small}}>
              n
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: colors.border,
                borderWidth: 1,
                backgroundColor: colors.backgroundLL,
                borderRadius: 12,
                paddingLeft: 10,
              }}>
              <Icon
                type="material-community"
                color={colors.icon}
                name="account"
                style={{marginRight: 5}}
              />

              <TextInput
                autoFocus={true}
                maxLength={15}
                keyboardType="default"
                autoCapitalize="words"
                placeholder="First Name"
                placeholderTextColor={colors.placeholder}
                value={userDetail.first_name}
                style={{fontSize: fontsize.input}}
                onChangeText={(textEntered: string) => {
                  setUserDetail({...userDetail, first_name: textEntered});
                  // setFname(textEntered);
                }}
              />
            </View>
            {fNameError ? (
              <Text style={{color: colors.error, fontSize: fontsize.small}}>
                Please enter your name
              </Text>
            ) : (
              <Text style={{color: colors.background}}>n</Text>
            )}
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: colors.border,
                borderWidth: 1,
                backgroundColor: colors.backgroundLL,
                borderRadius: 12,
                paddingLeft: 10,
              }}>
              <Icon
                type="material-community"
                color={colors.icon}
                name="account-arrow-right"
                style={{marginRight: 5}}
              />
              <TextInput
                autoFocus={false}
                maxLength={15}
                keyboardType="default"
                autoCapitalize="words"
                placeholder="Last Name"
                placeholderTextColor={colors.placeholder}
                value={userDetail.last_name}
                style={{fontSize: fontsize.input}}
                onChangeText={(textEntered: string) => {
                  setUserDetail({...userDetail, last_name: textEntered});
                  // setLname(textEntered);
                }}
              />
            </View>
            {lNameError ? (
              <Text style={{color: colors.error, fontSize: fontsize.small}}>
                Please enter your last name
              </Text>
            ) : (
              <Text style={{color: colors.background}}>n</Text>
            )}
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: colors.border,
                borderWidth: 1,
                backgroundColor: colors.backgroundLL,
                borderRadius: 12,
                paddingLeft: 10,
              }}>
              <Icon
                type="material-community"
                color={colors.icon}
                name="phone"
                style={{marginRight: 5}}
              />

              <TextInput
                autoFocus={false}
                maxLength={10}
                keyboardType="number-pad"
                autoCapitalize="none"
                placeholder="Mobile Number"
                placeholderTextColor={colors.placeholder}
                value={userDetail.mobile.toString()}
                style={{fontSize: fontsize.input}}
                onChangeText={(textEntered: string) => {
                  setUserDetail({
                    ...userDetail,
                    mobile: textEntered == '' ? 0 : parseInt(textEntered),
                  });
                }}
              />
            </View>
            {mNumberError ? (
              <Text style={{color: colors.error, fontSize: fontsize.small}}>
                Please enter your mobile number
              </Text>
            ) : (
              <Text style={{color: colors.background}}>n</Text>
            )}
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: colors.border,
                borderWidth: 1,
                backgroundColor: colors.backgroundLL,
                borderRadius: 12,
                paddingLeft: 10,
              }}>
              <Icon
                type="material-community"
                color={colors.icon}
                name="email"
                style={{marginRight: 5}}
              />
              <TextInput
                autoFocus={false}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Email"
                placeholderTextColor={colors.placeholder}
                value={userDetail.email}
                style={{fontSize: fontsize.input}}
                onChangeText={(textEntered: string) => {
                  setUserDetail({...userDetail, email: textEntered});
                  // setEmail(textEntered);
                }}
              />
            </View>
            {emailError ? (
              <Text style={{color: colors.error, fontSize: fontsize.small}}>
                {emailErrorText}
              </Text>
            ) : (
              <Text style={{color: colors.background}}>n</Text>
            )}
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: colors.border,
                borderWidth: 1,
                backgroundColor: colors.backgroundLL,
                borderRadius: 12,
                paddingLeft: 10,
              }}>
              <Icon
                type="material-community"
                color={colors.icon}
                name="map"
                style={{marginRight: 5}}
              />
              <TextInput
                autoFocus={false}
                maxLength={25}
                keyboardType="default"
                autoCapitalize="words"
                placeholder="City"
                placeholderTextColor={colors.placeholder}
                value={userDetail.city}
                style={{fontSize: fontsize.input}}
                onChangeText={(textEntered: string) => {
                  setUserDetail({...userDetail, city: textEntered});
                  //  setCity(textEntered);
                }}
              />
            </View>
            {cityError ? (
              <Text style={{color: colors.error, fontSize: fontsize.small}}>
                Please enter your city
              </Text>
            ) : (
              <Text style={{color: colors.background}}>n</Text>
            )}
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderColor: colors.border,
                borderWidth: 1,
                backgroundColor: colors.backgroundLL,
                borderRadius: 12,
                paddingLeft: 10,
              }}>
              <Icon
                type="material-community"
                color={colors.icon}
                name="lock"
                style={{marginRight: 5}}
              />
              <TextInput
                autoFocus={false}
                placeholder="Password"
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry={eyeToggle ? false : true}
                placeholderTextColor={colors.placeholder}
                style={{fontSize: fontsize.input, flex: 1}}
                onChangeText={(textEntered: string) => {
                  setPassword(textEntered);
                }}
              />
              <Icon
                type="material-community"
                color={colors.icon}
                name={eyeToggle ? 'eye' : 'eye-off'}
                iconStyle={{marginRight: 10}}
                onPress={() => toggleEyeIcon()}
              />
            </View>
            {passwordError ? (
              <Text style={{color: colors.error, fontSize: fontsize.small}}>
                Please enter password
              </Text>
            ) : (
              <Text style={{color: colors.background}}>n</Text>
            )}
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: colors.border,
                borderWidth: 1,
                backgroundColor: colors.backgroundLL,
                borderRadius: 12,
                paddingLeft: 10,
              }}>
              <Icon
                type="material-community"
                color={colors.icon}
                name="lock-plus"
                style={{marginRight: 5}}
              />
              <TextInput
                autoFocus={false}
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry={true}
                placeholder="Confirm Password"
                placeholderTextColor={colors.placeholder}
                style={{fontSize: fontsize.input}}
                onChangeText={(textEntered: string) => {
                  setCpassword(textEntered);
                }}
              />
            </View>
            {cPasswordError ? (
              <Text style={{color: colors.error, fontSize: fontsize.small}}>
                {passwordErrorText}
              </Text>
            ) : (
              <Text style={{color: colors.background}}>n</Text>
            )}
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              // marginVertical: 20,
            }}>
            <Text>By creating or logging into an account you are</Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text>agreeing with our </Text>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: colors.primary,
                }}
                onPress={() => navigation.navigate('TermsScreen')}>
                Terms & Conditions
              </Text>
              <Text> and </Text>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: colors.primary,
                }}
                onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
                Privacy Statement
              </Text>
            </View>
          </View>
          <View style={styles.actBtnContainer}>
            <Button
              title="Create my account"
              type="solid"
              onPress={onSubmitPressed}
              color={colors.primary}
              buttonStyle={{paddingVertical: 10, borderRadius: 20}}
              titleStyle={{
                fontSize: fontsize.buttonlarge,
                fontWeight: 'bold',
                color: colors.text,
              }}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: fontsize.subtitle2,
                fontWeight: 'bold',
                color: colors.text,
              }}>
              OR
            </Text>
            <Text>Already have an account with App4rge?</Text>
          </View>
          <View style={styles.signBtnContainer}>
            <Button
              type="outline"
              title="Sign-in"
              onPress={() => navigation.navigate('SigninScreen')}
              buttonStyle={{
                borderColor: colors.border,
                paddingHorizontal: 25,
                backgroundColor: colors.backgroundL,
                borderRadius: 12,
                borderWidth: 1,
              }}
              titleStyle={{
                color: colors.text,
                fontSize: fontsize.buttonsmall,
                fontWeight: 'bold',
              }}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  formBase: {
    flex: 1,
    marginHorizontal: 15,
  },
  header: {
    marginVertical: 5,
    marginLeft: 10,
    paddingLeft: 20,
  },

  actBtnContainer: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  signBtnContainer: {
    marginRight: 15,
    marginTop: 10,
    alignItems: 'flex-end',
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
/**
 * updateUseInitialState from AppDrawerContent logout not reflecting here
 */
