import {RouteProp, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ICUserAddress} from '../../assets/globals';
import {ITheme} from '../../assets/globals/theme';
import {createUpdateAddress} from '../../assets/redux/slices/rest/auth/fbUserByIDSlice';
import {fbUserPatchRTDb} from '../../assets/redux/slices/rest/crud/fbUserPatchRTDb';
import {store} from '../../assets/redux/store/store';
import ActivityIndicatorWheel from '../../components/ActivityIndicatorWheel';
import {AccountStackParamList} from '../../navigator/Stack/AccountStackNavigator';
//import ErrorMessage from '@hookform/error-message';

interface IProp {
  route: RouteProp<AccountStackParamList, 'UpdateAddressScreen'>;
}

export default ({route}: IProp) => {
  const item = route.params.address as typeof ICUserAddress;
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
    formState: {errors},
  } = useForm<typeof ICUserAddress>({
    defaultValues: {
      fullname: item.fullname,
      flatno: item.flatno,
      apartment: item.apartment,
      street: item.street,
      landmark: item.landmark,
      area: item.area,
      city: item.city,
      state: item.state,
      pincode: item.pincode,
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
      mobile: item.mobile,
      uid: item.uid,
    },
  });

  const onSubmit: SubmitHandler<typeof ICUserAddress> = async data => {
    // if (checkErrors()) {
    Keyboard.dismiss();
    setInProgress(true);
    let id = route.params.uid;
    const add = {
      [id]: data,
    };
    try {
      store.dispatch(createUpdateAddress(add));
    } catch (error) {
      setInProgress(false);
      console.log('Error in updatescreen', error);
    }
    try {
      await fbUserPatchRTDb({
        data: data,
        url: `${route.params.localId}/address/${route.params.uid}`,
      }),
        setInProgress(false);
      ToastAndroid.show('Address updated', 10);
    } catch (error) {
      setInProgress(false);
      setErrorMessage('Failed, cannot update');
      console.log('Error in updatescreen', error);
    }
  };
  // };

  const RenderSavedAddress = () => {
    return (
      <View style={{...styles.addressBase, backgroundColor: colors.background}}>
        <View style={styles.addressHeaderBase}>
          <Text
            style={{
              ...styles.addressTitle,
              fontSize: fontsize.h5,
              color: colors.text,
            }}>
            Update Your Address
          </Text>
        </View>
        <View style={styles.addressBlock}>
          <View>
            <Text style={{...styles.label, fontSize: fontsize.subtitle2}}>
              Fullname
              <Text style={{...styles.asterik, color: colors.error}}> *</Text>
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onBlur, onChange, value}}) => (
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
                Name is required
              </Text>
            ) : (
              <Text
                style={{color: colors.background, fontSize: fontsize.small}}>
                n
              </Text>
            )}
          </View>

          {/*---------------------------------------------------------------------------*/}

          <View style={styles.inputWithLabelRow}>
            <View style={{flex: 1}}>
              <Text style={{...styles.label, fontSize: fontsize.subtitle2}}>
                Apartment name
              </Text>
              <Controller
                control={control}
                rules={{}}
                render={({field: {onBlur, onChange, value}}) => (
                  <TextInput
                    maxLength={20}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="default"
                    style={{
                      ...styles.textInputRow,
                      color: colors.text,
                      fontSize: fontsize.input,
                      borderColor: colors.border,
                      marginRight: 20,
                    }}></TextInput>
                )}
                name="apartment"
              />
            </View>

            <View style={{flex: 1}}>
              <Text style={{...styles.label, fontSize: fontsize.subtitle2}}>
                House/Flat No
                <Text style={{...styles.asterik, color: colors.error}}> *</Text>
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
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
            <Text style={{...styles.label, fontSize: fontsize.subtitle2}}>
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
              <Text
                style={{color: colors.background, fontSize: fontsize.small}}>
                n
              </Text>
            )}
          </View>

          {/*---------------------------------------------------------------------------*/}

          <View>
            <Text style={{...styles.label, fontSize: fontsize.subtitle2}}>
              Landmark
            </Text>
            <Controller
              control={control}
              rules={{}}
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
              name="landmark"
            />
          </View>
          {/*---------------------------------------------------------------------------*/}
          <View style={styles.inputWithLabelRow}>
            <View style={{flex: 1}}>
              <Text style={{...styles.label, fontSize: fontsize.subtitle2}}>
                Area
              </Text>
              <Controller
                control={control}
                rules={{}}
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
                      marginRight: 20,
                    }}></TextInput>
                )}
                name="area"
              />
            </View>

            <View style={{flex: 1}}>
              <Text style={{...styles.label, fontSize: fontsize.subtitle2}}>
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
                    City is required
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
            <Text style={{...styles.label, fontSize: fontsize.subtitle2}}>
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
              <Text
                style={{color: colors.background, fontSize: fontsize.small}}>
                n
              </Text>
            )}
          </View>

          {/*---------------------------------------------------------------------------*/}

          <View style={styles.inputWithLabelRow}>
            <View style={{flex: 1}}>
              <Text style={{...styles.label, fontSize: fontsize.subtitle2}}>
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
                    onChangeText={onChange}
                    value={value.toString()}
                    keyboardType="numeric"
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
              <Text style={{...styles.label, fontSize: fontsize.subtitle2}}>
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
                    onChangeText={onChange}
                    value={value.toString()}
                    keyboardType="number-pad"
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
                  style={{
                    color: colors.background,
                    fontSize: fontsize.small,
                  }}>
                  n
                </Text>
              )}
            </View>
          </View>
          {/*---------------------------------------------------------------------------*/}

          <View style={{...styles.buttonBase, backgroundColor: colors.primary}}>
            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
              <Text
                style={{
                  ...styles.buttonText,
                  color: colors.text,
                  fontSize: fontsize.buttonlarge,
                }}>
                Update Address
              </Text>
            </TouchableOpacity>
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
  return (
    <ScrollView style={styles.base}>
      <RenderSavedAddress />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  base: {
    flex: 1,
    marginHorizontal: 10,
    //backgroundColor: '#f00',
  },
  addressBase: {
    flex: 1,
    flexDirection: 'column',
    //paddingVertical: 5,
  },
  addressHeaderBase: {
    paddingVertical: 10,
    //  backgroundColor: '#0f0',
  },
  addressTitle: {
    fontWeight: 'bold',
  },
  addressBlock: {
    //  marginTop: 10,
  },

  label: {
    marginRight: 10,
  },
  inputWithLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textInputRow: {
    padding: 9,
    borderWidth: 0.4,
    borderRadius: 6,
  },
  buttonBase: {
    marginTop: 25,

    alignSelf: 'center',
    width: 300,
    borderRadius: 12,
  },
  buttonText: {
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    fontStyle: 'italic',
    marginTop: 4,
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
    //backgroundColor: '#fff',
  },
});
