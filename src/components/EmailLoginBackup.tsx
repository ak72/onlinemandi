import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ISignupORLoginPOSTData} from '../assets/interface';
import {fbUserLogin} from '../assets/redux/slices/rest/auth/fbUserLoginSlice';
import {RootState, store} from '../assets/redux/store/store';
import ActivityIndicatorWheel from './ActivityIndicatorWheel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {
  fetchFBUserByID,
  FirebaseUserState,
} from '../assets/redux/slices/rest/auth/fbUserByIDSlice';

import {colors} from '../assets/globals/style';
import auth from '@react-native-firebase/auth';
import {saveUserLoginToStorage} from '../assets/redux/slices/asyncLocalStorage';
import {fbUserPutRTDb} from '../assets/redux/slices/rest/crud/fbUserPutRTDb';
import {ICfbUserMap} from '../assets/globals';

/* type NavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<AuthStackParamList, 'SigninScreen'>,
  DrawerNavigationProp<DrawerNavigatorParamList>
>;NavigationProps; */

interface IProp {
  navigation: any;
}
export default ({navigation}: IProp) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('king@jungle.com');
  //const [userEmail, setUserEmail] = useState('anuragkanchan@indore.com');
  // 'anuragkanchan@indore.com''452225'
  const [userEmailError, setUserEmailError] = useState(false);
  const [userPasswordError, setUserPasswordError] = useState(false);

  const [userPassword, setUserPassword] = useState('123456');
  // const [userPassword, setUserPassword] = useState('452225');
  const [allDone, setAllDone] = useState(false);

  const loggedUserData: FirebaseUserState = useSelector(
    (state: RootState) => state.fbUserByIDReducerOfStore,
  );

  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Error!!', errorMessage, [{text: 'Okay'}]);
    }
    if (allDone) {
      if (loggedUserData.loading) {
        console.log(
          'From inside !loggedUserData after dispatch of fbUserById loading returned false',
        );
        Alert.alert(
          'Error!!',
          'No data linked with the user found..Try again later',
          [
            {
              text: 'Okay',
              onPress: () => {
                setIsLoading(false);
                navigation.goBack();
              },
            },
          ],
        );
        //
      } else {
        navigation.navigate('AppBottomTabNavigator');
      }
    } /*     if (!userLoginManager.loading && userLoginManager.isLoggedIn) {
      try {
        console.log(
          'From inside !userLoginManager saveUserLoginToStorage cos user is logged in',
        );
        saveUserLoginToStorage(
          userLoginManager.user.idToken,
          userLoginManager.user.localId,
          userLoginManager.user.expiresIn,
        );
        console.log('Data saved to storage');
      } catch (error: any) {
        setLoginError(error);
      }
      store.dispatch(fetchFBUserByID(userLoginManager.user.localId));
    } */
  }, [errorMessage, allDone]);

  /*  const GetLocalCart = async () => {
    try {
      const _localCart = await AsyncStorage.getItem('cart_items');
      return _localCart;
    } catch (error: any) {
      return;
    }
  };

  const GetUserCart = (_parsedData: any) => {
    const filteredProducts = Array().filter(
      (element: IProduct) => element.id == _parsedData.product_id,
    );
  }; */
  const checkForInputErrors = () => {
    if (userEmail == '') {
      setUserEmailError(true);
      return false;
    } else {
      userEmailError == true && setUserEmailError(false);
    }
    if (userPassword == '') {
      setUserPasswordError(true);
      return false;
    } else {
      userPasswordError == true && setUserPasswordError(false);
    }

    return true;
  };
  const LoginUser = async () => {
    if (checkForInputErrors()) {
      setErrorMessage('');
      setIsLoading(true);

      const logindata: ISignupORLoginPOSTData = {
        email: userEmail,
        password: userPassword,
      };
      try {
        store
          .dispatch(fbUserLogin(logindata))
          // .unwrap()
          .then(async loggedUserResponse => {
            store
              .dispatch(fetchFBUserByID(loggedUserResponse.payload.localId))
              .then(async loggedUserData => {
                console.log(loggedUserData);
                console.log('Fetch user by id done');
                console.log('email login made user ', auth().currentUser);

                saveUserLoginToStorage(
                  loggedUserResponse.payload.idToken,
                  loggedUserResponse.payload.localId,
                  loggedUserResponse.payload.expiresIn,
                  loggedUserResponse.payload.refreshToken,
                )
                  .then(() => {
                    setAllDone(true);
                  })
                  .catch((error: any) => {
                    setErrorMessage(error.message);
                    setIsLoading(false);
                  });
              })
              .catch((_error: any) => {
                //here RTDb can be created for the logged user if required or delete the orphaned user
                (async () => {
                  try {
                    await fbUserPutRTDb({
                      ...ICfbUserMap,
                      localId: loggedUserResponse.payload.localId,
                    });
                    setAllDone(true);
                  } catch (error: any) {
                    setErrorMessage(error.message);
                    console.log(error.message);
                  }
                })();

                setIsLoading(false);
              });
          })
          .catch((error: any) => {
            //invalid login error
            setErrorMessage(error.message);
            setIsLoading(false);
          });
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    }
  };
  /*   return isLoading ? (
    <ActivityIndicatorWheel />
  ) : ( */
  return (
    <View style={{position: 'relative'}}>
      <View style={styles.emailLoginBase}>
        <Text style={styles.headerText}>
          Please enter the email and password registered with your account
        </Text>
        <View>
          <View style={styles.formRow}>
            <Icon name="phone" size={25} color={colors.lightDark} />
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor={colors.lightDark}
              onChangeText={(email: string) => setUserEmail(email)}
              keyboardType="default"
              style={{color: colors.midDark}}
            />
          </View>
          <View>{userEmailError && <Text>Enter your email</Text>}</View>
          {/* </View>
      <View> */}
          <View
            style={{...styles.formRow, ...{justifyContent: 'space-between'}}}>
            <Icon name="lock" size={25} color={colors.lightDark} />
            <TextInput
              placeholder="Enter password"
              placeholderTextColor={colors.lightDark}
              onChangeText={(passwd: string) => {
                setUserPassword(passwd);
              }}
              autoCapitalize="none"
              keyboardType="default"
              secureTextEntry={true}
              style={{width: '80%', color: colors.midDark}}
            />
            <Icon name="eye-off" size={25} color={colors.lightDark} />
          </View>
          <View>{userPasswordError && <Text>Enter your password</Text>}</View>
        </View>
        <View style={styles.forgotTextCont}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ForgotPasswordScreen');
            }}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginButtonBase}>
          <Button
            title="Login"
            color={colors.buttons}
            onPress={() => {
              // console.log('Pressed');
              LoginUser();
            }}
          />
        </View>
        <View style={styles.noAccountCont}>
          <Text style={styles.noAccountText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignupScreen');
            }}>
            <Text style={styles.signupText}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading && (
        <View style={styles.indicatorWheel}>
          <ActivityIndicatorWheel />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  emailLoginBase: {
    //  flex: 2,
    position: 'relative',

    // marginHorizontal: 10,
    // flexDirection: 'column',
    //backgroundColor: '#33333D',

    //paddingHorizontal: 20,
    marginVertical: 10,
  },
  headerText: {
    fontSize: 16,
    color: colors.grey2,
    textAlign: 'center',
    marginVertical: 10,
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderColor: colors.fullDark,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  forgotTextCont: {
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  forgotText: {
    color: '#fff',
  },
  loginButtonBase: {
    marginTop: 20,
    marginBottom: 10,
  },
  noAccountCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
    paddingVertical: 15,
  },
  noAccountText: {
    color: '#ccc',
  },
  signupText: {
    color: '#fff',
    // alignSelf: 'center',
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
