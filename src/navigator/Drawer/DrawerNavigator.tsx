import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Icon} from '@rneui/themed';
import AppBottomTabNavigator from '../Tab/AppBottomTabNavigator';
import AuthStackNavigator from '../Stack/AuthStackNavigator';
import HelpScreen from '../../screens/IndependantScreens/HelpScreen';
import AppDrawerContent from '../../components/DrawerContent';
import {useTheme} from '@react-navigation/native';
import {ITheme} from '../../assets/globals/theme';

export type DrawerNavigatorParamList = {
  AppBottomTabNavigator: undefined;
  AuthStackNavigator: undefined;
  HelpScreen: undefined;
};

const DrawerNavigator = createDrawerNavigator<DrawerNavigatorParamList>();

export default () => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;
  /*  const drawerStyle = {
    activeTintColor: 'black',
    inactiveTintColor: 'black',
    backgroundColor: '#c6cbef',

    labelStyle: {
      fontFamily: 'montserrat',
      marginVertical: 16,
      marginHorizontal: 0,
    },
    iconContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemStyle: {},
  }; */
  return (
    <DrawerNavigator.Navigator
      initialRouteName="AuthStackNavigator"
      screenOptions={{
        header: () => null,
        drawerStyle: {
          backgroundColor: colors.backgroundLL,
        },
        drawerActiveTintColor: colors.accent,
        drawerActiveBackgroundColor: colors.primary,

        // drawerStyle: drawerStyle,
      }}
      drawerContent={props => <AppDrawerContent {...props} />}>
      <DrawerNavigator.Screen
        name="AppBottomTabNavigator"
        component={AppBottomTabNavigator}
        options={{
          title: 'Home',
          drawerIcon: ({focused, size}) => (
            <Icon
              type="material-community"
              name="home"
              size={size}
              color={focused ? colors.accent : colors.icon}
            />
          ),
        }}
      />
      {/*auth().currentUser == null ? ()*/}
      <DrawerNavigator.Screen
        name="AuthStackNavigator"
        component={AuthStackNavigator}
        options={{
          title: 'Signin',
          drawerIcon: ({focused, size}) => (
            <Icon
              type="material-community"
              name="login"
              size={size}
              color={focused ? colors.accent : colors.icon}
            />
          ),
        }}
      />

      <DrawerNavigator.Screen
        name="HelpScreen"
        component={HelpScreen}
        options={{
          title: 'Help',
          drawerIcon: ({focused, size}) => (
            <Icon
              type="material-community"
              name="lifebuoy"
              size={size}
              color={focused ? colors.accent : colors.icon}
            />
          ),
        }}
      />
    </DrawerNavigator.Navigator>
  );
};
