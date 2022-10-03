import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Alert, Keyboard} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ISignupORLoginPOSTData} from '../../assets/interface';
import {store} from '../../assets/redux/store/store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  fetchFBUserByID,
  mergeLocalCart,
} from '../../assets/redux/slices/rest/auth/fbUserByIDSlice';
import auth from '@react-native-firebase/auth';
import {fbUserPutRTDb} from '../../assets/redux/slices/rest/crud/fbUserPutRTDb';
import {ICfbUserMap} from '../../assets/globals';
import {Button} from '@rneui/themed';
import ActivityIndicatorWheel from '../../components/ActivityIndicatorWheel';
interface IProp {
  navigation: any;
  LoginProgress: (param: boolean) => void;
}
import AsyncStorage from '@react-native-async-storage/async-storage';
import {removeItemFromLocalCart} from '../../assets/redux/slices/asyncLocalStorage';
import {useTheme} from '@react-navigation/native';
import {ITheme, screen_width} from '../../assets/globals/theme';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';

export default () => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
    // LoginProgress(true);
    setIsLoading(true);
    try {
      const passwordResetEmailResponse = await auth().sendPasswordResetEmail(
        formdata.email,
      );
      // if (passwordResetEmailResponse.) {}
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-email':
          //resetField('password');
          setErrorMessage('You provided an invalid email');
          break;
        case 'auth/user-not-found':
          //resetField('password');
          setErrorMessage('No registered user found with this email');
          break;
        default:
          resetField('password');
          setErrorMessage('Something went wrong!');
          break;
      }
    }
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
          Please enter the email registered with your account to recover your
          password
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
        <View style={{backgroundColor: '#111'}}>
          <View style={styles.loginButtonRow}>
            <Button
              title="Submit"
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
        </View>
      </View>
      {isLoading && (
        <View style={styles.indicatorWheel}>
          <ActivityIndicatorWheel />
        </View>
      )}
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
  loginButtonRow: {
    marginBottom: 5,
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
