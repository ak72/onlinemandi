import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTheme} from '@react-navigation/native';

import AccountUpdateScreen from '../../screens/AccountScreens/AccountUpdateScreen';
import CreateAddressScreen from '../../screens/AccountScreens/CreateAddressScreen';
import SavedAddressScreen from '../../screens/AccountScreens/SavedAddressScreen';
import UpdateAddressScreen from '../../screens/AccountScreens/UpdateAddressScreen';
import MyAccountScreen from '../../screens/AccountScreens/MyAccountScreen';
import MyOrdersScreen from '../../screens/AccountScreens/MyOrdersScreen';
import NotificationScreen from '../../screens/IndependantScreens/NotificationScreen';
import MyFavoritesScreen from '../../screens/AccountScreens/MyFavoritesScreen';

export type AccountStackParamList = {
  MyAccountScreen: undefined;
  AccountUpdateScreen: undefined;
  CreateAddressScreen: {localId: string};
  SavedAddressScreen: {localId: string; canSelect: boolean};
  UpdateAddressScreen: {
    address: {};
    localId: string;
    uid: number;
  };
  MyOrdersScreen: undefined;
  MyFavoritesScreen: undefined;
  NotificationScreen: undefined;
};
const AccountStackNavigator =
  createNativeStackNavigator<AccountStackParamList>();

export default () => {
  const {colors} = useTheme();
  return (
    <AccountStackNavigator.Navigator
      initialRouteName="MyAccountScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
      }}>
      <AccountStackNavigator.Screen
        name="MyAccountScreen"
        component={MyAccountScreen}
      />
      <AccountStackNavigator.Screen
        name="AccountUpdateScreen"
        component={AccountUpdateScreen}
      />
      <AccountStackNavigator.Screen
        name="CreateAddressScreen"
        component={CreateAddressScreen}
      />
      <AccountStackNavigator.Screen
        name="SavedAddressScreen"
        component={SavedAddressScreen}
      />
      <AccountStackNavigator.Screen
        name="UpdateAddressScreen"
        component={UpdateAddressScreen}
      />
      <AccountStackNavigator.Screen
        name="MyOrdersScreen"
        component={MyOrdersScreen}
      />
      <AccountStackNavigator.Screen
        name="MyFavoritesScreen"
        component={MyFavoritesScreen}
      />
      <AccountStackNavigator.Screen
        name="NotificationScreen"
        component={NotificationScreen}
      />
    </AccountStackNavigator.Navigator>
  );
};
