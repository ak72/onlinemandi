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
  ToastAndroid,
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
import {
  useForm,
  Controller,
  //SubmitErrorHandler,
  SubmitHandler,
} from 'react-hook-form';

type NavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<AuthStackParamList, 'SignupScreen'>,
  DrawerNavigationProp<DrawerNavigatorParamList>
>;
interface IProp {
  navigation: NavigationProps;
}
interface IFormInputs {
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  city: string;
  image_url: string;
  mobile: string;
  cPassword: string;
}
export default ({navigation}: IProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;

  const _user = useSelector(
    (state: RootState) => state.fbUserByIDReducerOfStore,
  );

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [eyeToggle, setEyeToggle] = useState(false);

  const {
    control,
    handleSubmit,
    reset,

    getValues,
    formState: {errors},
  } = useForm<IFormInputs>({
    defaultValues: {
      first_name: '',
      last_name: '',
      password: '',
      email: '',
      city: '',
      image_url: '',
      mobile: '',
      cPassword: '',
    },
  });

  /*const formErrors = {
    email: {
      required: 'Please enter your email',
      invalid: 'Does not appear to be valid email',
    },
    password: {
      required: 'Confirm your password',
    },
    cPassword: {
      invalid: 'Password does not match',
    },
  };*/
  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Error', errorMessage, [{text: 'Ok'}]);
      return;
    }
    if (_user.isLoggedIn) {
      navigation.navigate('AppBottomTabNavigator');
    }
  }, [errorMessage, allDone]);

  /* const onError: SubmitErrorHandler<typeof formErrors> = (errors, e) => {
    return console.log(errors);
  };*/
  const toggleEyeIcon = () => {
    setEyeToggle(!eyeToggle);
  };

  const onSubmit: SubmitHandler<IFormInputs> = async formdata => {
    //if (errorCheck()) {
    Keyboard.dismiss();
    setIsLoading(true);
    const signupUserCredentials: ISignupORLoginPOSTData = {
      email: formdata.email,
      password: formdata.password,
    };
    console.log(formdata);
    try {
      fbSignupUser(signupUserCredentials)
        .then(async (data: ISignupUserCallbackData) => {
          console.log('inside dispatch(fbSignupUser(signupUserCredentials))');
          console.log(data);
          const user: IUserProfile = {
            first_name: formdata.first_name,
            last_name: formdata.last_name,
            email: data.email,
            city: formdata.city,
            image_url: 'http://www.etcetera.ai/assets/native/images/splash.png',
            mobile: parseInt(formdata.mobile, 10),
          };
          fbUserPutRTDb({
            data: {...user, localId: data.localId},
            url: data.localId,
          })
            .then(async (_rtdb: any) => {
              store
                .dispatch(fetchFBUserByID(data.localId))
                .then(async (_loggedUserData: any) => {
                  reset();
                  setAllDone(true);
                  ToastAndroid.show(
                    `Welcome ${formdata.first_name} ${formdata.last_name} !`,
                    5,
                  );
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
    //  }
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
            <Text style={{color: colors.background}}>n</Text>
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

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    maxLength={15}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="default"
                    autoCapitalize="words"
                    placeholder="First Name"
                    placeholderTextColor={colors.placeholder}
                    style={{fontSize: fontsize.input}}
                  />
                )}
                name="first_name"
              />
            </View>
            {errors.first_name ? (
              <Text
                style={{
                  ...styles.errorText,
                  color: colors.error,
                  fontSize: fontsize.small,
                }}>
                Please enter your first name
              </Text>
            ) : (
              <Text
                style={{color: colors.background, fontSize: fontsize.small}}>
                n
              </Text>
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
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    maxLength={15}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="default"
                    autoCapitalize="words"
                    placeholder="Last Name"
                    placeholderTextColor={colors.placeholder}
                    style={{fontSize: fontsize.input}}
                  />
                )}
                name="last_name"
              />
            </View>
            {errors.last_name ? (
              <Text
                style={{
                  ...styles.errorText,
                  color: colors.error,
                  fontSize: fontsize.small,
                }}>
                Please enter your last name
              </Text>
            ) : (
              <Text
                style={{color: colors.background, fontSize: fontsize.small}}>
                n
              </Text>
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
              <Controller
                control={control}
                rules={{
                  required: true,
                  minLength: {
                    value: 10,
                    message: 'Invalid mobile number',
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    maxLength={10}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    placeholder="Mobile Number"
                    placeholderTextColor={colors.placeholder}
                    style={{fontSize: fontsize.input}}
                  />
                )}
                name="mobile"
              />
            </View>
            {errors.mobile ? (
              errors.mobile.type == 'minLength' ? (
                <Text
                  style={{
                    ...styles.errorText,
                    color: colors.error,
                    fontSize: fontsize.small,
                  }}>
                  {errors.mobile.message}
                </Text>
              ) : (
                <Text
                  style={{
                    ...styles.errorText,
                    color: colors.error,
                    fontSize: fontsize.small,
                  }}>
                  Please enter your mobile number
                </Text>
              )
            ) : (
              <Text
                style={{color: colors.background, fontSize: fontsize.small}}>
                n
              </Text>
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
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Does not appear to be valid email',
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    maxLength={30}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="Email"
                    placeholderTextColor={colors.placeholder}
                    style={{fontSize: fontsize.input}}
                  />
                )}
                name="email"
              />
            </View>
            {errors.email ? (
              errors.email.type == 'pattern' ? (
                <Text
                  style={{
                    ...styles.errorText,
                    color: colors.error,
                    fontSize: fontsize.small,
                  }}>
                  {errors.email.message}
                </Text>
              ) : (
                <Text
                  style={{
                    ...styles.errorText,
                    color: colors.error,
                    fontSize: fontsize.small,
                  }}>
                  Please enter your email
                </Text>
              )
            ) : (
              <Text
                style={{color: colors.background, fontSize: fontsize.small}}>
                n
              </Text>
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
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern: {
                    value: /^([^0-9]*)$/,
                    message: 'Invalid city name',
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    maxLength={20}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="default"
                    autoCapitalize="words"
                    placeholder="City"
                    placeholderTextColor={colors.placeholder}
                    style={{fontSize: fontsize.input}}
                  />
                )}
                name="city"
              />
            </View>
            {errors.city ? (
              errors.city.type == 'pattern' ? (
                <Text
                  style={{
                    ...styles.errorText,
                    color: colors.error,
                    fontSize: fontsize.small,
                  }}>
                  {errors.city.message}
                </Text>
              ) : (
                <Text
                  style={{
                    ...styles.errorText,
                    color: colors.error,
                    fontSize: fontsize.small,
                  }}>
                  Please enter your city
                </Text>
              )
            ) : (
              <Text
                style={{color: colors.background, fontSize: fontsize.small}}>
                n
              </Text>
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
                    placeholder="Password"
                    keyboardType="default"
                    autoCapitalize="none"
                    secureTextEntry={eyeToggle ? false : true}
                    placeholderTextColor={colors.placeholder}
                    style={{fontSize: fontsize.input, flex: 1}}
                  />
                )}
                name="password"
              />
              <Icon
                type="material-community"
                color={colors.icon}
                name={eyeToggle ? 'eye' : 'eye-off'}
                iconStyle={{marginRight: 10}}
                onPress={() => toggleEyeIcon()}
              />
            </View>
            {errors.password ? (
              <Text
                style={{
                  ...styles.errorText,
                  color: colors.error,
                  fontSize: fontsize.small,
                }}>
                Please enter password
              </Text>
            ) : (
              <Text
                style={{color: colors.background, fontSize: fontsize.small}}>
                n
              </Text>
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
              <Controller
                control={control}
                rules={{
                  required: true,
                  validate: {
                    matchesPreviousPassword: value => {
                      const {password} = getValues();
                      return password === value;
                      //return password === value || "Passwords should match!";
                    },
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="default"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    placeholder="Confirm Password"
                    placeholderTextColor={colors.placeholder}
                    style={{fontSize: fontsize.input}}
                  />
                )}
                name="cPassword"
              />
            </View>
            {errors.cPassword ? (
              errors.cPassword.type == 'matchesPreviousPassword' ? (
                <Text
                  style={{
                    ...styles.errorText,
                    color: colors.error,
                    fontSize: fontsize.small,
                  }}>
                  Password does not match
                </Text>
              ) : (
                <Text
                  style={{
                    ...styles.errorText,
                    color: colors.error,
                    fontSize: fontsize.small,
                  }}>
                  Confirm your password
                </Text>
              )
            ) : (
              <Text
                style={{color: colors.background, fontSize: fontsize.small}}>
                n
              </Text>
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
              onPress={handleSubmit(onSubmit)}
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
  errorText: {
    fontStyle: 'italic',
  },
  indicatorWheel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    //backgroundColor: '#fff',
    //opacity: 0.2,
  },
});
/**
 * updateUseInitialState from AppDrawerContent logout not reflecting here
 */
