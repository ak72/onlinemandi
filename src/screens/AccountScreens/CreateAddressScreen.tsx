import {RouteProp, useTheme} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  //KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
//import {SafeAreaView} from 'react-native-safe-area-context';
//import {screen_height} from '../../assets/globals/style';
import {ITheme} from '../../assets/globals/theme';
import {createUpdateAddress} from '../../assets/redux/slices/rest/auth/fbUserByIDSlice';
import {fbUserPutRTDb} from '../../assets/redux/slices/rest/crud/fbUserPutRTDb';
import {store} from '../../assets/redux/store/store';
import ActivityIndicatorWheel from '../../components/ActivityIndicatorWheel';
import {AccountStackParamList} from '../../navigator/Stack/AccountStackNavigator';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {ICUserAddress} from '../../assets/globals';

interface IProp {
  navigation: NativeStackNavigationProp<
    AccountStackParamList,
    'CreateAddressScreen'
  >;
  // route: RouteProp<{params: {localId: ''}}>;
  route: RouteProp<AccountStackParamList, 'CreateAddressScreen'>;
}

export default ({route, navigation}: IProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;
  const [inProgress, setInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Error', errorMessage, [{text: 'Ok'}]);
    }
  }, [errorMessage]);
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<typeof ICUserAddress>({
    defaultValues: {
      fullname: '',
      flatno: '',
      apartment: '',
      street: '',
      landmark: '',
      area: '',
      city: '',
      state: '',
      pincode: 0,
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
      mobile: 0,
      uid: 0,
    },
  });

  const onSubmit: SubmitHandler<typeof ICUserAddress> = data => {
    Keyboard.dismiss();
    console.log(data);
    let id = parseInt((Math.random() * Math.random() * 1000).toFixed());
    const add = {
      [id]: {...data, uid: id},
    };
    console.log(add);
    try {
      setInProgress(true);
      store.dispatch(createUpdateAddress(add));
      fbUserPutRTDb({
        data: {
          ...data,
          uid: id,
        },
        url: `${route.params.localId}/addresses/${id}`,
      }).then(() => {
        reset();
        ToastAndroid.show('Address created sucessfully', 6);
        setInProgress(false);
        navigation.goBack();
      });
    } catch (error) {
      setInProgress(false);
      setErrorMessage('Error creating address');
      console.log('Error creating address');
    }
  };

  const RenderAddress = () => {
    return (
      <View style={styles.addressBlock}>
        <View>
          <Text style={{fontSize: fontsize.subtitle2}}>
            Fullname
            <Text style={{...styles.asterik, color: colors.error}}> *</Text>
          </Text>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                maxLength={30}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="default"
                autoCapitalize="words"
                style={{
                  ...styles.textInputRow,
                  fontSize: fontsize.input,
                  color: colors.text,
                  borderColor: colors.border,
                }}></TextInput>
            )}
            name="fullname"
          />
          {errors.fullname ? (
            <Text
              style={{
                ...styles.errorText,
                color: colors.error,
                fontSize: fontsize.small,
              }}>
              Name is required.
            </Text>
          ) : (
            <Text style={{color: colors.background, fontSize: fontsize.small}}>
              n
            </Text>
          )}
        </View>
        {/*---------------------------------------------------------------------------*/}
        <View style={styles.inputWithLabelRow}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: fontsize.subtitle2}}>Apartment name</Text>

            <Controller
              control={control}
              rules={{}}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  maxLength={20}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="default"
                  style={{
                    ...styles.textInputRow,
                    color: colors.text,
                    borderColor: colors.border,
                    fontSize: fontsize.input,
                    marginRight: 20,
                  }}></TextInput>
              )}
              name="apartment"
            />
          </View>

          <View style={{flex: 1}}>
            <Text style={{fontSize: fontsize.subtitle2}}>
              House/Flat No
              <Text style={{...styles.asterik, color: colors.error}}> *</Text>
            </Text>
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onBlur, onChange, value}}) => (
                <TextInput
                  maxLength={12}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="default"
                  style={{
                    ...styles.textInputRow,
                    color: colors.text,
                    fontSize: fontsize.input,
                    borderColor: colors.border,
                  }}></TextInput>
              )}
              name="flatno"
            />
            {errors.flatno ? (
              <Text
                style={{
                  ...styles.errorText,
                  color: colors.error,
                  fontSize: fontsize.small,
                }}>
                Flat/House no required
              </Text>
            ) : (
              <Text
                style={{color: colors.background, fontSize: fontsize.small}}>
                n
              </Text>
            )}
          </View>
        </View>
        {/*---------------------------------------------------------------------------*/}

        <View>
          <Text style={{fontSize: fontsize.subtitle2}}>
            Street detail
            <Text style={{...styles.asterik, color: colors.error}}> *</Text>
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: {
                value: 5,
                message: 'Street details too short',
              },
            }}
            render={({field: {onBlur, onChange, value}}) => (
              <TextInput
                maxLength={35}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="default"
                style={{
                  ...styles.textInputRow,
                  color: colors.text,
                  fontSize: fontsize.input,
                  borderColor: colors.border,
                }}></TextInput>
            )}
            name="street"
          />
          {errors.street ? (
            errors.street.type == 'minLength' ? (
              <Text
                style={{
                  ...styles.errorText,
                  color: colors.error,
                  fontSize: fontsize.small,
                }}>
                {errors.street.message}
              </Text>
            ) : (
              <Text
                style={{
                  ...styles.errorText,
                  color: colors.error,
                  fontSize: fontsize.small,
                }}>
                Street details are required
              </Text>
            )
          ) : (
            <Text style={{color: colors.background, fontSize: fontsize.small}}>
              n
            </Text>
          )}
        </View>
        {/*---------------------------------------------------------------------------*/}
        <View>
          <Text style={{fontSize: fontsize.subtitle2}}>Landmark</Text>
          <Controller
            control={control}
            rules={{}}
            render={({field: {onBlur, onChange, value}}) => (
              <TextInput
                maxLength={35}
                onBlur={onBlur}
                keyboardType="default"
                onChangeText={onChange}
                value={value}
                style={{
                  ...styles.textInputRow,
                  color: colors.text,
                  fontSize: fontsize.input,
                  borderColor: colors.border,
                }}></TextInput>
            )}
            name="landmark"
          />
        </View>
        {/*---------------------------------------------------------------------------*/}

        <View style={styles.inputWithLabelRow}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: fontsize.subtitle2}}>Area</Text>
            <Controller
              control={control}
              rules={{}}
              render={({field: {onBlur, onChange, value}}) => (
                <TextInput
                  maxLength={35}
                  onBlur={onBlur}
                  keyboardType="default"
                  onChangeText={onChange}
                  value={value}
                  style={{
                    ...styles.textInputRow,
                    color: colors.text,
                    fontSize: fontsize.input,
                    borderColor: colors.border,
                    marginRight: 20,
                  }}></TextInput>
              )}
              name="area"
            />
          </View>
          {/*---------------------------------------------------------------------------*/}

          <View style={{flex: 1}}>
            <Text style={{fontSize: fontsize.subtitle2}}>
              City
              <Text style={{...styles.asterik, color: colors.error}}> *</Text>
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: /^([^0-9]*)$/,
                  message: 'Invalid city name',
                },
              }}
              render={({field: {onBlur, onChange, value}}) => (
                <TextInput
                  maxLength={20}
                  onBlur={onBlur}
                  keyboardType="default"
                  onChangeText={onChange}
                  value={value}
                  style={{
                    ...styles.textInputRow,
                    color: colors.text,
                    fontSize: fontsize.input,
                    borderColor: colors.border,
                  }}></TextInput>
              )}
              name="city"
            />
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
        </View>

        {/*---------------------------------------------------------------------------*/}

        <View>
          <Text style={{fontSize: fontsize.subtitle2}}>
            State
            <Text style={{...styles.asterik, color: colors.error}}> *</Text>
          </Text>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onBlur, onChange, value}}) => (
              <TextInput
                maxLength={20}
                onBlur={onBlur}
                keyboardType="default"
                onChangeText={onChange}
                value={value}
                style={{
                  ...styles.textInputRow,
                  color: colors.text,
                  fontSize: fontsize.input,
                  borderColor: colors.border,
                }}></TextInput>
            )}
            name="state"
          />
          {errors.state ? (
            <Text
              style={{
                ...styles.errorText,
                color: colors.error,
                fontSize: fontsize.small,
              }}>
              State is required
            </Text>
          ) : (
            <Text style={{color: colors.background, fontSize: fontsize.small}}>
              n
            </Text>
          )}
        </View>
        {/*---------------------------------------------------------------------------*/}
        <View style={styles.inputWithLabelRow}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: fontsize.subtitle2}}>
              Pincode
              <Text style={{...styles.asterik, color: colors.error}}> *</Text>
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: {
                  value: 6,
                  message: 'Invalid pin number',
                },
              }}
              render={({field: {onBlur, onChange, value}}) => (
                <TextInput
                  maxLength={6}
                  onBlur={onBlur}
                  keyboardType="numeric"
                  onChangeText={onChange}
                  value={value.toString()}
                  style={{
                    ...styles.textInputRow,
                    color: colors.text,
                    fontSize: fontsize.input,
                    borderColor: colors.border,
                    marginRight: 20,
                  }}></TextInput>
              )}
              name="pincode"
            />
            {errors.pincode ? (
              errors.pincode.type == 'minLength' ? (
                <Text
                  style={{
                    ...styles.errorText,
                    color: colors.error,
                    fontSize: fontsize.small,
                  }}>
                  {errors.pincode.message}
                </Text>
              ) : (
                <Text
                  style={{
                    ...styles.errorText,
                    color: colors.error,
                    fontSize: fontsize.small,
                  }}>
                  Pin code is required
                </Text>
              )
            ) : (
              <Text
                style={{color: colors.background, fontSize: fontsize.small}}>
                n
              </Text>
            )}
          </View>
          <View style={{flex: 1}}>
            <Text style={{fontSize: fontsize.subtitle2}}>
              Mobile no
              <Text style={{...styles.asterik, color: colors.error}}> *</Text>
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: {
                  value: 10,
                  message: 'Invalid mobile number',
                },
              }}
              render={({field: {onBlur, onChange, value}}) => (
                <TextInput
                  maxLength={10}
                  onBlur={onBlur}
                  keyboardType="number-pad"
                  onChangeText={onChange}
                  value={value.toString()}
                  style={{
                    ...styles.textInputRow,
                    color: colors.text,
                    fontSize: fontsize.input,
                    borderColor: colors.border,
                  }}></TextInput>
              )}
              name="mobile"
            />
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
                  Mobile number is required
                </Text>
              )
            ) : (
              <Text
                style={{color: colors.background, fontSize: fontsize.small}}>
                n
              </Text>
            )}
          </View>
        </View>
        <View style={{...styles.buttonBase, backgroundColor: colors.primary}}>
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Text
              style={{
                ...styles.buttonText,
                color: colors.text,
                fontSize: fontsize.buttonlarge,
              }}>
              Add Address
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  /*   <SafeAreaView style={{flex: 1}}>    </SafeAreaView> */

  return (
    <View style={{flex: 1}}>
      <View
        style={{...styles.addressBase, backgroundColor: colors.backgroundLLL}}>
        <View style={styles.addressHeaderBase}>
          <Text
            style={{
              ...styles.addressTitle,
              color: colors.text,
              fontSize: fontsize.h5,
            }}>
            Enter Address Details
          </Text>
        </View>
        <View style={{flex: 9}}>
          {/*, backgroundColor: '#f00' */}
          <ScrollView
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}>
            <RenderAddress />
          </ScrollView>
        </View>
      </View>
      {inProgress && (
        <View style={styles.indicatorWheel}>
          <ActivityIndicatorWheel />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  addressBase: {
    flex: 1,
    marginHorizontal: 15,
    //   backgroundColor: '#f0f',
  },
  addressHeaderBase: {
    // paddingVertical: 10,
    flex: 1,
    //  backgroundColor: '#f00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressTitle: {
    fontWeight: 'bold',
  },

  addressBlock: {
    flex: 1,
    //  backgroundColor: '#ff0',
    justifyContent: 'space-between',
  },

  inputWithLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textInputRow: {
    // paddingVertical: 5,
    padding: 9,
    borderWidth: 0.4,
    borderRadius: 6,
    // height: screen_height * 0.06,
    // borderBottomWidth: 0.4,
  },
  buttonBase: {
    marginTop: 25,
    // flex: 1,
    alignSelf: 'center',
    width: 300,
    borderRadius: 12,
  },
  buttonText: {
    paddingVertical: 10,

    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    fontStyle: 'italic',
    // marginTop: 4,
  },
  asterik: {
    height: 13,
  },
  indicatorWheel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    // backgroundColor: '#f00',
  },
});
