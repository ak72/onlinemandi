import {useTheme} from '@react-navigation/native';
import {Button} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Alert,
  ToastAndroid,
} from 'react-native';
import {color} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {ITheme} from '../../assets/globals/theme';
import {IUserProfile} from '../../assets/interface';
import {updateProfile} from '../../assets/redux/slices/rest/auth/fbUserByIDSlice';
import {fbUserPatchRTDb} from '../../assets/redux/slices/rest/crud/fbUserPatchRTDb';

import {RootState, store} from '../../assets/redux/store/store';
import ActivityIndicatorWheel from '../../components/ActivityIndicatorWheel';
import {Controller} from 'react-hook-form';

export default () => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;
  const user = useSelector(
    (state: RootState) => state.fbUserByIDReducerOfStore,
  );
  // const [mNumberError, setMnumberError] = useState(false);
  //const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [updating, setUpdating] = useState(false);
  /*  const [userDetail, setUserDetail] = useState<IUserProfile>({
    first_name: '',
    last_name: '',
    email: '',
    city: '',
    image_url: '',
    mobile: 0,
  }); */

  useEffect(() => {
    if (errorMessage) {
      setUpdating(false);
      Alert.alert('Error', errorMessage, [{text: 'Okay'}]);
      return;
    }
  }, [errorMessage]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      first_name: user.current.first_name,
      last_name: user.current.last_name,
      email: user.current.email,
      city: user.current.city,
      image_url: user.current.image_url,
      mobile: user.current.mobile,
    },
  });

  /* const checkPhoneNumber = (number: string) => {
    var regexp = /^\d+$/;
    const result: boolean = regexp.test(number);
    if (number.length < 1) {
      number = '0';
      setMnumberError(true);
    }
    if (!result || number.length < 10) {
      setMnumberError(true);
    } else {
      setMnumberError(false);
    }
    setUserDetail({...userDetail, mobile: parseInt(number)});
  };*/
  /*
  const checkEmailFormat = (email: string) => {
    if (
      email.toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  //  setUserDetail({...userDetail, email: email});
  };

/*   const checkAllFormErrors = () => {
    if (mNumberError || emailError) {
      setErrorMessage('Invalid data to update');
    }
    return true;
  }; */

  const updateProfile: SubmitHandler<IUserProfile> = formdata => {
    // if (checkAllFormErrors()) {
    setUpdating(true);
    console.log(formdata);
    /* try {
        const data = {
          first_name: userDetail.first_name,
          last_name: userDetail.last_name,
          email: userDetail.email,
          city: userDetail.city,
          //image_url: userDetail.image_url,
          mobile: userDetail.mobile,
        };

        store.dispatch(updateProfile(data));
        fbUserPatchRTDb({
          data: {...data},
          url: user.current.localId,
        })
          .then(() => {
            setUpdating(false);
            ToastAndroid.show('Profile updated', 6);
          })
          .catch((error: any) => {
            setErrorMessage(error.message);
          });
      } catch (error: any) {
        setErrorMessage(error.message);
      }*/
    // }
  };

  return user.loading ? (
    <View style={styles.indicatorWheel}>
      <ActivityIndicatorWheel />
    </View>
  ) : (
    <>
      {updating && (
        <View style={styles.indicatorWheel}>
          <ActivityIndicatorWheel />
        </View>
      )}
      <View style={{...styles.formBase, backgroundColor: colors.background}}>
        <Text
          style={{...styles.header, fontSize: fontsize.h5, color: colors.text}}>
          Update Profile
        </Text>
        {/*---------------------------------------------------------------------------*/}
        <View style={styles.textInputContainer}>
          <View>
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onBlur, value, onChange}}) => (
                <TextInput
                  maxLength={15}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="default"
                  autoCapitalize="words"
                  placeholder="First Name"
                  placeholderTextColor={colors.placeholder}
                  style={{
                    ...styles.textInput,
                    fontSize: fontsize.input,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
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
            <Text style={{color: colors.background, fontSize: fontsize.small}}>
              n
            </Text>
          )}
        </View>
        {/*---------------------------------------------------------------------------*/}

        <View style={styles.textInputContainer}>
          <View>
            <Controller
              control={control}
              rules={{required: true}}
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
                  style={{
                    ...styles.textInput,
                    fontSize: fontsize.input,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
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
            <Text style={{color: colors.background, fontSize: fontsize.small}}>
              n
            </Text>
          )}
        </View>
        {/*---------------------------------------------------------------------------*/}
        <View style={styles.textInputContainer}>
          <View>
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
                  value={value.toString()}
                  keyboardType="number-pad"
                  placeholder="Mobile Number"
                  placeholderTextColor={colors.placeholder}
                  style={{
                    ...styles.textInput,
                    fontSize: fontsize.input,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
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
            <Text style={{color: colors.background, fontSize: fontsize.small}}>
              n
            </Text>
          )}
        </View>

        {/*---------------------------------------------------------------------------*/}

        <View style={styles.textInputContainer}>
          <View>
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
                  style={{
                    ...styles.textInput,
                    fontSize: fontsize.input,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
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
            <Text style={{color: colors.background, fontSize: fontsize.small}}>
              n
            </Text>
          )}
        </View>
        {/*---------------------------------------------------------------------------*/}

        <View style={styles.textInputContainer}>
          <View>
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
                  style={{
                    ...styles.textInput,
                    fontSize: fontsize.input,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
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
            <Text style={{color: colors.background, fontSize: fontsize.small}}>
              n
            </Text>
          )}
        </View>
        {/*---------------------------------------------------------------------------*/}

        <View style={styles.btnContainer}>
          {/* <Button title="Submit" onPress={onSubmitPressed} /> */}
          <Button
            type="solid"
            title="Update"
            //disabled={mNumberError || emailError ? true : false}
            titleStyle={{fontSize: fontsize.buttonmedium, color: colors.text}}
            buttonStyle={{backgroundColor: colors.primary}}
            onPress={handleSubmit(updateProfile)}
            containerStyle={{borderRadius: 12}}
          />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  formBase: {
    flex: 1,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  header: {
    alignSelf: 'center',
    marginVertical: 10,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  textInputContainer: {
    marginVertical: 5,
  },
  textInput: {
    paddingHorizontal: 15,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 12,
  },

  btnContainer: {
    alignSelf: 'center',
    width: 200,
    marginVertical: 10,
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
    //backgroundColor: '#f00',
  },
});
