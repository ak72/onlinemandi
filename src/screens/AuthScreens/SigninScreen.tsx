import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import EmailLogin from '../../components/EmailLogin';
import GmailLogin from '../../components/GmailLogin';
import FacebookLogin from '../../components/FacebookLogin';
import PhoneLogin from '../../components/PhoneLogin';
import {ITheme} from '../../assets/globals/theme';
import {useTheme} from '@react-navigation/native';
import ActivityIndicatorWheel from '../../components/ActivityIndicatorWheel';

export default (props: any) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;
  const [inProgress, setInProgress] = useState(false);
  const logininprogress = (value: boolean) => {
    setInProgress(value);
  };

  /*  const onBackButtonPressAndroid = () => {
    console.log('Going to myaccount');
    props.navigation.getParent()?.navigate('MyAccountScreen');

    return true;
  };
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // props.navigation.dispatch({type: 'Navigation/BACK'});
      // props.navigation.goBack(null);

      //props.navigation.reset({
       // index: 0,
       // route: [{name: 'AuthStackNavigator'}],
     // });
      // props.navigation.getParent()?.navigate('MyAccountScreen');

      BackHandler.addEventListener(
        'hardwareBackPress',
        onBackButtonPressAndroid,
      );
      console.log('props.route is ', props.route);
      console.log(
        'gdfghflkdjasdkjal;dkoiytruyrtygfhkvnmbncvmzx,cvnsdjfkherioeoruiewwerjio',
        //props.navigation.getParent(),
      );
    });

    return unsubscribe;
  }, [props.navigation]); */

  return (
    <>
      <View
        style={{...styles.signinFormBase, backgroundColor: colors.background}}>
        <Text
          style={{
            ...styles.headerText,
            fontSize: fontsize.h5,
            color: colors.text,
          }}>
          Sign-In
        </Text>
        <View style={styles.loginOptions}>
          <View
            style={{
              flex: 9,
              // backgroundColor: '#f00',
            }}>
            <ScrollView
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}>
              <View style={{flex: 4}}>
                <EmailLogin {...props} LoginProgress={logininprogress} />
              </View>
              <View
                style={{
                  flex: 3,
                  //backgroundColor: '#fe4f09',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...styles.orText,
                    fontSize: fontsize.body2,
                    color: colors.text,
                  }}>
                  OR
                </Text>
                <View style={styles.provider}>
                  <GmailLogin {...props} LoginProgress={logininprogress} />
                  <FacebookLogin />
                </View>
                <Text
                  style={{
                    ...styles.orText,
                    fontSize: fontsize.body2,
                    color: colors.text,
                  }}>
                  OR
                </Text>
              </View>
              <View style={{flex: 3}}>
                <PhoneLogin {...props} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.policyBase}>
            <Text
              style={{
                fontStyle: 'italic',
                color: colors.text,
                fontSize: fontsize.body2,
                textAlign: 'center',
              }}>
              By creating your App4rge account you agree to our
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('TermsScreen')}>
                <Text
                  style={{
                    ...styles.legalTextWithLink,
                    fontSize: fontsize.body2,
                    color: colors.accenttext,
                  }}>
                  Terms of use
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: colors.text,
                  fontSize: fontsize.body2,
                }}>
                {' '}
                and{' '}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('PrivacyPolicyScreen')
                }>
                <Text
                  style={{
                    ...styles.legalTextWithLink,
                    fontSize: fontsize.body2,
                    color: colors.accenttext,
                  }}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {inProgress && (
        <View
          style={{...styles.logininprogress, backgroundColor: colors.primary}}>
          <ActivityIndicatorWheel />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  signinFormBase: {
    flex: 1,
  },
  loginOptions: {
    flex: 1,
  },
  policyBase: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerText: {
    alignSelf: 'flex-start',
    marginLeft: 30,
    fontWeight: 'bold',
    marginVertical: 5,
  },

  orText: {
    fontWeight: 'bold',

    marginVertical: 5,
    alignSelf: 'center',
  },

  provider: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 5,
  },

  legalTextWithLink: {
    textDecorationLine: 'underline',
  },
  logininprogress: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,

    opacity: 0.5,
  },
});
