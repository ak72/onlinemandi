import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Alert, Keyboard} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ISignupORLoginPOSTData} from '../assets/interface';
import {store} from '../assets/redux/store/store';
import ActivityIndicatorWheel from './ActivityIndicatorWheel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  fetchFBUserByID,
  mergeLocalCart,
} from '../assets/redux/slices/rest/auth/fbUserByIDSlice';
import auth from '@react-native-firebase/auth';
import {fbUserPutRTDb} from '../assets/redux/slices/rest/crud/fbUserPutRTDb';
import {ICfbUserMap} from '../assets/globals';
import {Button} from '@rneui/themed';

interface IProp {
  navigation: any;
  LoginProgress: (param: boolean) => void;
}
import AsyncStorage from '@react-native-async-storage/async-storage';
import {removeItemFromLocalCart} from '../assets/redux/slices/asyncLocalStorage';
import {useTheme} from '@react-navigation/native';
import {ITheme, screen_width} from '../assets/globals/theme';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';

export default ({navigation, LoginProgress}: IProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;
  const [errorMessage, setErrorMessage] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  const [eyeToggle, setEyeToggle] = useState(false);
  const {
    control,
    resetField,
    handleSubmit,
    formState: {errors},
  } = useForm<ISignupORLoginPOSTData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Error!', errorMessage, [{text: 'Okay'}]);
      return;
    }
  }, [errorMessage]);

  const LoginUserWithEmail: SubmitHandler<
    ISignupORLoginPOSTData
  > = async formdata => {
    Keyboard.dismiss();
    LoginProgress(true);
    // setIsLoading(true);

    const logindata: ISignupORLoginPOSTData = {
      email: formdata.email,
      password: formdata.password,
    };
    try {
      const signinResponse = await auth().signInWithEmailAndPassword(
        logindata.email,
        logindata.password,
      );
      if (signinResponse) {
        try {
          const user = await store.dispatch(
            fetchFBUserByID(signinResponse.user.uid),
          );
          const _cart = await AsyncStorage.getItem('cart');

          if (_cart) {
            console.log('local cart is present so merging');
            const mergedCart = store.dispatch(
              mergeLocalCart({
                ...user.payload.cart,
                ...JSON.parse(_cart),
              }),
            );
            console.log('mergedCart-> ', mergedCart);
            await fbUserPutRTDb({
              data: {
                ...mergedCart.payload,
              },
              url: `${user.payload.current.localId}/cart`,
            });
            await removeItemFromLocalCart('cart');
          }
          navigation.navigate('AppBottomTabNavigator');
        } catch (error: any) {
          fbUserPutRTDb({
            data: {
              ...ICfbUserMap,
              image_url: signinResponse?.user.photoURL,
              localId: signinResponse?.user.uid,
            },
            url: signinResponse?.user.uid,
          }).then(async () => {
            await store.dispatch(fetchFBUserByID(signinResponse.user.uid));
            navigation.navigate('AppBottomTabNavigator');
          });
        }
      }
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
          resetField('password');
          setErrorMessage('No user with this email address found');
          break;
        case 'auth/wrong-password':
          resetField('password');
          setErrorMessage(
            'Invalid username or password, try again with valid credentials',
          );
          break;
        default:
          resetField('password');
          setErrorMessage('Something went wrong!');
          break;
      }
    }
    LoginProgress(false);

    // setIsLoading(false);
  };
  const toggleEyeIcon = () => {
    setEyeToggle(!eyeToggle);
  };
  return (
    <>
      <View style={styles.emailLoginBase}>
        <Text
          style={{
            ...styles.headerText,
            fontSize: fontsize.subtitle2,
            color: colors.text,
          }}>
          Please enter the email and password registered with your account
        </Text>
        <View>
          <View style={styles.formRow}>
            <Icon name="email" size={fontsize.icon} color={colors.icon} />
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Does not appear to be valid email',
                },
              }}
              render={({field: {value, onChange, onBlur}}) => (
                <TextInput
                  maxLength={30}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="Enter your email"
                  placeholderTextColor={colors.placeholder}
                  style={{
                    color: colors.text,
                    fontSize: fontsize.input,
                  }}></TextInput>
              )}
              name="email"
            />
          </View>
          {errors.email ? (
            errors.email.type == 'pattern' ? (
              <Text
                style={{
                  color: colors.error,
                  fontSize: fontsize.small,
                  fontStyle: 'italic',
                }}>
                {errors.email.message}
              </Text>
            ) : (
              <Text
                style={{
                  color: colors.error,
                  fontSize: fontsize.small,
                  fontStyle: 'italic',
                }}>
                Please enter your email
              </Text>
            )
          ) : (
            <Text style={{color: colors.background, fontSize: fontsize.small}}>
              n
            </Text>
          )}
        </View>

        <View
          style={{
            ...styles.formRow,
            ...{justifyContent: 'space-between'},
            borderColor: colors.border,
          }}>
          <Icon name="lock" size={fontsize.icon} color={colors.icon} />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter password"
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry={eyeToggle ? false : true}
                placeholderTextColor={colors.placeholder}
                style={{
                  fontSize: fontsize.input,
                  flex: 1,
                  color: colors.text,
                }}></TextInput>
            )}
            name="password"
          />
          <Icon
            name={eyeToggle ? 'eye' : 'eye-off'}
            size={fontsize.icon}
            color={colors.icon}
            onPress={() => toggleEyeIcon()}
          />
        </View>

        {errors.password ? (
          <Text
            style={{
              color: colors.error,
              fontSize: fontsize.small,
              fontStyle: 'italic',
            }}>
            Please enter password
          </Text>
        ) : (
          <Text style={{color: colors.background, fontSize: fontsize.small}}>
            n
          </Text>
        )}
      </View>
      <View style={styles.forgotTextCont}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ForgotPasswordScreen');
          }}>
          <Text style={{color: colors.text}}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loginButtonBase}>
        <View style={{width: screen_width * 0.7}}>
          <View style={styles.loginButtonRow}>
            <Button
              title="LOGIN"
              type="solid"
              color={colors.primary}
              onPress={handleSubmit(LoginUserWithEmail)}
              titleStyle={{
                fontSize: fontsize.buttonsmall,
                color: colors.text,
                fontWeight: '800',
              }}
              buttonStyle={{height: 40}}
              containerStyle={{borderRadius: 10}}
            />
          </View>
          <View style={{...styles.noAccountCont, backgroundColor: '#111'}}>
            <Text
              style={{
                ...styles.noAccountText,
                fontSize: fontsize.buttonsmall,
              }}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignupScreen');
              }}>
              <Text style={{color: '#fff'}}> Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/*  {isLoading && (
        <View style={styles.indicatorWheel}>
          <ActivityIndicatorWheel />
        </View>
      )} */}
    </>
  );
};
const styles = StyleSheet.create({
  emailLoginBase: {
    flex: 1,
    marginHorizontal: 25,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    //backgroundColor: '#45fa89',
  },
  headerText: {
    alignSelf: 'center',
    marginVertical: 5,
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  forgotTextCont: {
    alignItems: 'flex-end',
    marginTop: 5,
  },

  loginButtonBase: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    // backgroundColor: '#97f0d3',
  },
  loginButtonRow: {
    marginBottom: 5,
  },
  noAccountCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 12,
    borderRadius: 10,
    //height: 50,
  },
  noAccountText: {
    color: '#ccc',
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
