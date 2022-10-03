import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignupScreen from '../../screens/AuthScreens/SignupScreen';
import ForgotPasswordScreen from '../../screens/AuthScreens/ForgotPasswordScreen';
import {Text, View} from 'react-native';

import SigninScreen from '../../screens/AuthScreens/SigninScreen';
import SigninWelcomeScreen from '../../screens/AuthScreens/SigninWelcomeScreen';
import TermsScreen from '../../screens/IndependantScreens/TermsScreen';
import PrivacyPolicyScreen from '../../screens/IndependantScreens/PrivacyPolicyScreen';
import {useTheme} from '@react-navigation/native';
import {ITheme} from '../../assets/globals/theme';

export type AuthStackParamList = {
  SigninWelcomeScreen: undefined;
  SigninScreen: undefined;
  SignupScreen: undefined;
  TermsScreen: undefined;
  PrivacyPolicyScreen: undefined;
  ForgotPasswordScreen: undefined;
};

const AuthStackNavigator = createNativeStackNavigator<AuthStackParamList>();

export default () => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;

  return (
    <AuthStackNavigator.Navigator
      initialRouteName="SigninWelcomeScreen"
      screenOptions={{
        headerTitle: () => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                marginLeft: 30,
                fontSize: fontsize.h3,
                fontWeight: 'bold',
                color: colors.text,
              }}>
              MY ACCOUNT
            </Text>
          </View>
        ),
        headerStyle: {
          backgroundColor: colors.primary,
        },
      }}>
      <AuthStackNavigator.Screen
        name="SigninWelcomeScreen"
        component={SigninWelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStackNavigator.Screen name="SigninScreen" component={SigninScreen} />
      <AuthStackNavigator.Screen name="SignupScreen" component={SignupScreen} />
      <AuthStackNavigator.Screen
        name="TermsScreen"
        component={TermsScreen}
        options={{
          headerTitle: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  marginLeft: 30,
                  fontSize: fontsize.h3,
                  fontWeight: 'bold',
                  color: colors.text,
                }}>
                Terms and Conditions
              </Text>
            </View>
          ),
        }}
      />
      <AuthStackNavigator.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
        options={{
          headerTitle: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  marginLeft: 30,
                  fontSize: fontsize.h3,
                  fontWeight: 'bold',
                  color: colors.text,
                }}>
                Our Privacy Policy
              </Text>
            </View>
          ),
        }}
      />
      <AuthStackNavigator.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
    </AuthStackNavigator.Navigator>
  );
};
