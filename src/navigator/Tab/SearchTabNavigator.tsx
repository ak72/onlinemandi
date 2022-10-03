import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SearchScreen from '../../screens/SearchScreen';
import {StyleSheet, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {ITheme} from '../../assets/globals/theme';

export type SearchTabParamList = {
  Vegetables: {category: string};
  Fruits: {category: string};
  ExoticItems: {category: string};
};
const SearchTabNavigator = createMaterialTopTabNavigator<SearchTabParamList>();
export default () => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;

  return (
    <>
      <Text style={{...styles.title, fontSize: fontsize.h6}}>Category</Text>
      <SearchTabNavigator.Navigator
        initialRouteName="Vegetables"
        backBehavior="history"
        orientation="horizontal"
        showPageIndicator={true}
        tabBarPosition="top"
        screenOptions={{
          tabBarLabelStyle: {fontSize: fontsize.small},
          tabBarStyle: {
            backgroundColor: colors.backgroundL,
          },
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.accenttext,
        }}>
        <SearchTabNavigator.Screen
          name="Vegetables"
          component={SearchScreen}
          initialParams={{category: 'vegetable'}}
        />
        <SearchTabNavigator.Screen
          name="Fruits"
          component={SearchScreen}
          initialParams={{category: 'fruit'}}
        />
        <SearchTabNavigator.Screen
          name="ExoticItems"
          component={SearchScreen}
          initialParams={{category: 'exotic'}}
        />
      </SearchTabNavigator.Navigator>
    </>
  );
};
const styles = StyleSheet.create({
  title: {
    marginVertical: 10,
    fontWeight: 'bold',
  },
});
