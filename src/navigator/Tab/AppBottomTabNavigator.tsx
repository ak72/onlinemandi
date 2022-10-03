import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeStackNavigator from '../Stack/HomeStackNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AccountStackNavigator from '../Stack/AccountStackNavigator';
import CartStackNavigator from '../Stack/CartStackNavigator';
import {useTheme} from '@react-navigation/native';
import {ITheme} from '../../assets/globals/theme';

export type AppBottomTabNavigatorParamList = {
  HomeStackNavigator: undefined;
  TabCartScreen: undefined;
  AccountStackNavigator: undefined;
};

const AppBottomTabNavigator =
  createMaterialBottomTabNavigator<AppBottomTabNavigatorParamList>();
export default () => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;

  return (
    <AppBottomTabNavigator.Navigator
      initialRouteName="HomeStackNavigator"
      activeColor={colors.accent}>
      <AppBottomTabNavigator.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => (
            <Icon name="home" size={fontsize.icon} color={color} />
          ),
        }}
      />
      <AppBottomTabNavigator.Screen
        name="AccountStackNavigator"
        component={AccountStackNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="account" size={fontsize.icon} color={color} />
          ),
          title: 'My Account',
        }}
      />
      <AppBottomTabNavigator.Screen
        name="TabCartScreen"
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="cart" size={fontsize.icon} color={color} />
          ),
          title: 'Cart',
        }}
      />
    </AppBottomTabNavigator.Navigator>
  );
};
