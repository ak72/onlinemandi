import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';
import ProductDetailScreen from '../../screens/ProductDetailScreen';
import {IProduct} from '../../assets/interface';
import SearchTabNavigator from '../Tab/SearchTabNavigator';
import CitySelectionScreen from '../../screens/CitySelectionScreen';
import {Image, StyleSheet, Text, View} from 'react-native';
import AccountStackNavigator from './AccountStackNavigator';
import {useTheme} from '@react-navigation/native';
import {ITheme} from '../../assets/globals/theme';
//import PaymentOnlineScreen from '../../screens/PaymentOnlineScreen';

export type HomeStackNavigatorParamList = {
  // PaymentOnlineScreen: undefined;
  HomeScreen: undefined;
  SearchTabNavigator: {citySelected: string; headingCategory: string};
  ProductDetailScreen: {product: IProduct};
  CitySelectionScreen: {updateSelectedCity(city_name: string): void};
  AccountStackNavigator: any;
};
const RootStack = createNativeStackNavigator<HomeStackNavigatorParamList>();

export default () => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;
  const ScreenHeader = (city: string, title: string) => {
    return (
      <View style={{...styles.headerBase, backgroundColor: colors.primary}}>
        <View style={styles.leftCol}>
          <Text
            style={{
              ...styles.headerCity,
              fontSize: fontsize.subtitle2,
              color: colors.text,
            }}>
            {city}
          </Text>
          <Text
            style={{
              ...styles.headerTitle,
              fontSize: fontsize.subtitle2,
              color: colors.text,
            }}>
            {title}
          </Text>
        </View>
        <View style={styles.rightCol}>
          <Image
            source={{
              uri: 'http://etcetera.ai/assets/native/images/searchPageLogo.png',
            }}
            resizeMode="contain"
            style={styles.headerImage}
          />
        </View>
      </View>
    );
  };

  return (
    <RootStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
      }}>
      <RootStack.Group>
        <RootStack.Screen
          name="AccountStackNavigator"
          component={AccountStackNavigator}
        />
      </RootStack.Group>

      <RootStack.Group>
        <RootStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />

        <RootStack.Screen
          name="SearchTabNavigator"
          options={({route}) => ({
            headerTitle: () =>
              ScreenHeader(
                route.params.citySelected,
                route.params.headingCategory,
              ),
          })}
          component={SearchTabNavigator}
        />
        <RootStack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
          options={{title: 'Product Details'}}
        />
        <RootStack.Screen
          name="CitySelectionScreen"
          component={CitySelectionScreen}
          options={{title: 'Select city'}}
        />
        {/* <RootStack.Screen
          name="PaymentOnlineScreen"
          component={PaymentOnlineScreen}
        /> */}
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerCity: {
    fontWeight: 'bold',
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  headerImage: {
    width: 50,
    height: 50,
  },
  leftCol: {
    flex: 2,
  },
  rightCol: {
    flex: 1,
  },
});
